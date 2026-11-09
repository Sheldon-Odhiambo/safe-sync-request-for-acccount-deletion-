import React, { useRef, useState } from 'react';
import type { AuthError } from '@supabase/supabase-js';
import { Header } from './components/Header';
import { SafeSyncLogo } from './components/SafeSyncLogo';
import { StepIdentityInput } from './components/StepIdentityInput';
import { StepEmailVerification } from './components/StepEmailVerification';
import { StepDeletionConfirmed } from './components/StepDeletionConfirmed';
import { DataExportModal } from './components/DataExportModal';
import { SupportModal } from './components/SupportModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { FaqSection } from './components/FaqSection';
import { ShieldCheck, Lock, AlertTriangle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import {
  ApiError,
  isApiConfigured,
  getDeletionStatus,
  requestDeletion,
  cancelDeletion,
} from './lib/api';

const ACCOUNT_NOT_FOUND = 'No SafeSync account was found for this email address.';

interface DeletionInfo {
  requestedAt: string | null;
  scheduledFor: string | null;
  alreadyPending: boolean;
}

function mapSendCodeError(err: AuthError): string {
  const code = (err as { code?: string }).code ?? '';
  const msg = (err.message ?? '').toLowerCase();

  // With shouldCreateUser:false Supabase refuses to send a code to an email that
  // has no auth user ("Signups not allowed for otp").
  if (code === 'otp_disabled' || msg.includes('signups not allowed') || msg.includes('user not found')) {
    return ACCOUNT_NOT_FOUND;
  }
  if (err.status === 429 || code.includes('rate_limit') || msg.includes('rate limit')) {
    return 'Too many attempts. Please wait a minute before requesting another code.';
  }
  return 'We could not send the verification code. Please try again.';
}

function describeBlockers(blockers: unknown[]): string {
  const parts = blockers
    .map((b) => {
      if (typeof b === 'string') return b;
      if (b && typeof b === 'object') {
        const o = b as Record<string, unknown>;
        const text = o.message ?? o.description ?? o.reason ?? o.type ?? o.code;
        return typeof text === 'string' ? text : null;
      }
      return null;
    })
    .filter((s): s is string => Boolean(s));

  return parts.length
    ? `Your account cannot be deleted yet: ${parts.join('; ')}.`
    : 'Your account cannot be deleted yet. Please contact SafeSync support.';
}

export default function App() {
  // Stepper state: 1 = Email & Info, 2 = Email Verification & Confirmation, 3 = Completed/Receipt
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [email, setEmail] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [acknowledged, setAcknowledged] = useState<boolean>(false);

  // Backend state
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [deletion, setDeletion] = useState<DeletionInfo>({
    requestedAt: null,
    scheduledFor: null,
    alreadyPending: false,
  });

  // Access token of the user who just proved they own the email. Kept in memory
  // only; it is what authorises the deletion / cancel calls.
  const accessTokenRef = useRef<string | null>(null);

  // Modal dialog states
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [restoredToast, setRestoredToast] = useState<string | null>(null);

  const normalizedEmail = email.trim().toLowerCase();
  const configMissing = !isSupabaseConfigured || !isApiConfigured;

  const composeReason = (): string | null => {
    const text = `${reason}${notes.trim() ? ` — ${notes.trim()}` : ''}`.trim();
    return text ? text.slice(0, 500) : null;
  };

  // Drop the temporary web session (this device only, other sessions such as the
  // phone app are untouched).
  const endSession = async () => {
    accessTokenRef.current = null;
    try {
      await supabase.auth.signOut({ scope: 'local' });
    } catch {
      /* nothing to clean up */
    }
  };

  const sendCode = async (): Promise<string | null> => {
    if (configMissing) {
      return 'This portal is not configured yet. Please contact SafeSync support.';
    }
    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: { shouldCreateUser: false },
    });
    return error ? mapSendCodeError(error) : null;
  };

  // Step 1 -> 2: email a one-time code (only if an account exists)
  const handleProceedToVerification = async () => {
    setSendError(null);
    setIsSending(true);
    const failure = await sendCode();
    setIsSending(false);

    if (failure) {
      setSendError(failure);
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Resend from step 2. Throws so the step can show the message.
  const handleResendCode = async () => {
    const failure = await sendCode();
    if (failure) throw new Error(failure);
  };

  const handleBackToInput = () => {
    void endSession();
    setCurrentStep(1);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Step 2 -> 3: verify the code, then ask the backend to delete THIS account.
  // Throws an Error with a user-facing message on failure.
  const handleConfirmDeletion = async (code: string) => {
    let token = accessTokenRef.current;

    if (!token) {
      const { data, error } = await supabase.auth.verifyOtp({
        email: normalizedEmail,
        token: code,
        type: 'email',
      });
      if (error || !data.session) {
        throw new Error('That code is incorrect or has expired. Check the code or request a new one.');
      }
      token = data.session.access_token;
      accessTokenRef.current = token;
    }

    try {
      let status = await getDeletionStatus(token);
      const alreadyPending = status.status === 'pending';

      if (!alreadyPending) {
        status = await requestDeletion(token, composeReason());
      }
      if (status.status !== 'pending') {
        throw new Error('We could not confirm your request. Please try again.');
      }

      setDeletion({
        requestedAt: status.requested_at,
        scheduledFor: status.scheduled_for,
        alreadyPending,
      });
      setCurrentStep(3);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === 'reauth_required' || err.status === 401) {
          await endSession();
          throw new Error('Your verification expired. Go back and request a new code.');
        }
        if (err.code === 'not_found' || err.status === 404) {
          await endSession();
          throw new Error(ACCOUNT_NOT_FOUND);
        }
        if (err.code === 'deletion_blocked') {
          throw new Error(describeBlockers(err.blockers));
        }
        throw new Error(err.message);
      }
      throw err;
    }
  };

  // Step 3: abort a pending request during the grace period.
  const handleCancelDeletion = async () => {
    const token = accessTokenRef.current;
    if (!token) {
      throw new Error('Your secure session has ended. Start over and verify your email again to cancel.');
    }

    try {
      await cancelDeletion(token);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        await endSession();
        throw new Error('Your secure session expired. Start over and verify your email again to cancel.');
      }
      throw new Error(err instanceof Error ? err.message : 'Could not cancel the request.');
    }

    await endSession();
    setCurrentStep(1);
    setAcknowledged(false);
    setRestoredToast(`SafeSync coverage successfully restored for ${normalizedEmail}. Deletion request cancelled.`);
    setTimeout(() => {
      setRestoredToast(null);
    }, 6000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartNew = () => {
    void endSession();
    setCurrentStep(1);
    setReason('');
    setNotes('');
    setAcknowledged(false);
    setSendError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-[#002B66]/15 selection:text-[#002B66]">
      {/* Top Navigation */}
      <Header
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Restoration Notification Toast */}
      {restoredToast && (
        <div className="bg-emerald-600 text-white text-xs py-2.5 px-4 text-center font-medium shadow-md transition-all animate-in slide-in-from-top duration-200">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-200" />
            <span>{restoredToast}</span>
          </div>
        </div>
      )}

      {/* Missing configuration warning (developer-facing) */}
      {configMissing && (
        <div className="bg-amber-100 text-amber-900 text-xs py-2.5 px-4 text-center font-medium border-b border-amber-300">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>
              Set VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY and VITE_API_BASE_URL to enable account deletion.
            </span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Brand Showcase Hero (Centers the exact SafeSync logo) */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-2xl bg-white shadow-xs border border-slate-200/80 mb-4 hover:shadow-sm transition-shadow">
            <SafeSyncLogo size="lg" showTagline={true} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2 border border-slate-200">
            <Lock className="w-3.5 h-3.5 text-[#002B66]" />
            <span>Authorized Account & Telemetry Removal Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Account Deletion & Data Erasure Request
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2 leading-relaxed">
            Manage your SafeSync profile and connected emergency response telemetry. Follow the verification steps below to authenticate your identity via email.
          </p>
        </div>

        {/* Multi-step Visual Indicator */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-8 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold max-w-xl mx-auto">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep === 1
                    ? 'bg-[#002B66] text-white'
                    : currentStep > 1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                1
              </div>
              <span className={currentStep === 1 ? 'text-[#002B66] font-bold' : 'text-slate-600'}>
                Account Email
              </span>
            </div>

            <div className={`h-0.5 flex-1 mx-3 ${currentStep >= 2 ? 'bg-[#002B66]' : 'bg-slate-200'}`} />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep === 2
                    ? 'bg-[#DE1123] text-white ring-2 ring-red-200'
                    : currentStep > 2
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                2
              </div>
              <span className={currentStep === 2 ? 'text-[#DE1123] font-bold' : 'text-slate-600'}>
                Email Verification
              </span>
            </div>

            <div className={`h-0.5 flex-1 mx-3 ${currentStep === 3 ? 'bg-emerald-600' : 'bg-slate-200'}`} />

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep === 3
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-200'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                3
              </div>
              <span className={currentStep === 3 ? 'text-emerald-700 font-bold' : 'text-slate-600'}>
                Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* Primary Step Content Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          {currentStep === 1 && (
            <StepIdentityInput
              email={email}
              setEmail={(v) => {
                setEmail(v);
                setSendError(null);
              }}
              reason={reason}
              setReason={setReason}
              notes={notes}
              setNotes={setNotes}
              acknowledged={acknowledged}
              setAcknowledged={setAcknowledged}
              isSending={isSending}
              sendError={sendError}
              onProceed={handleProceedToVerification}
              onOpenExport={() => setIsExportOpen(true)}
            />
          )}

          {currentStep === 2 && (
            <StepEmailVerification
              email={normalizedEmail}
              onBack={handleBackToInput}
              onResend={handleResendCode}
              onConfirmDeletion={handleConfirmDeletion}
            />
          )}

          {currentStep === 3 && (
            <StepDeletionConfirmed
              email={normalizedEmail}
              requestedAt={deletion.requestedAt}
              scheduledFor={deletion.scheduledFor}
              alreadyPending={deletion.alreadyPending}
              reason={reason}
              onCancelDeletion={handleCancelDeletion}
              onStartNew={handleStartNew}
            />
          )}
        </div>

        {/* Safety & Compliance FAQ Section */}
        <FaqSection />

        {/* Trust Badges & Data Portability Strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-900 block mb-1">GDPR & CCPA Compliant</span>
            <span className="text-xs text-slate-500">Full statutory right to erasure under Article 17 and California Consumer Privacy Act.</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-900 block mb-1">14-Day Safety Grace Window</span>
            <span className="text-xs text-slate-500">Prevent accidental disconnections with immediate one-click account recovery.</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-900 block mb-1">Encrypted Identity Auth</span>
            <span className="text-xs text-slate-500">Mandatory email tokenization guards life-critical emergency sensor links.</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SafeSyncLogo size="sm" variant="horizontal" showTagline={false} />
            <span className="text-slate-300">·</span>
            <span>Emergency Telemetry & Sync Network</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-slate-900 hover:underline transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setIsSupportOpen(true)}
              className="hover:text-slate-900 hover:underline transition-colors"
            >
              Support Hotline
            </button>
            <span>·</span>
            <button
              onClick={() => setIsExportOpen(true)}
              className="hover:text-slate-900 hover:underline transition-colors"
            >
              Data Portability
            </button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-4 pt-4 border-t border-slate-100 text-center text-slate-400 text-[11px]">
          © {new Date().getFullYear()} SafeSync Inc. All rights reserved. Every Second Matters. Every Life Counts.
        </div>
      </footer>

      {/* Interactive Modals */}
      <DataExportModal
        email={email}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}