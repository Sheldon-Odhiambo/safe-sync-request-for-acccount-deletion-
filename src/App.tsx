import React, { useState } from 'react';
import { Header } from './components/Header';
import { SafeSyncLogo } from './components/SafeSyncLogo';
import { StepIdentityInput } from './components/StepIdentityInput';
import { StepEmailVerification } from './components/StepEmailVerification';
import { StepDeletionConfirmed } from './components/StepDeletionConfirmed';
import { DataExportModal } from './components/DataExportModal';
import { SupportModal } from './components/SupportModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { FaqSection } from './components/FaqSection';
import { ShieldCheck, Lock, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function App() {
  // Stepper state: 1 = Email & Info, 2 = Email Verification & Confirmation, 3 = Completed/Receipt
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [email, setEmail] = useState<string>('oumashelly004@gmail.com');
  const [reason, setReason] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>('SS-DEL-8942-X');

  // Modal dialog states
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [restoredToast, setRestoredToast] = useState<string | null>(null);

  // Step transitions
  const handleProceedToVerification = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleBackToInput = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleConfirmDeletion = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newTicket = `SS-DEL-${randomSuffix}-X`;
    setTicketId(newTicket);
    setCurrentStep(3);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleCancelDeletion = () => {
    setCurrentStep(1);
    setAcknowledged(false);
    setRestoredToast(`SafeSync coverage successfully restored for ${email}. Deletion request cancelled.`);
    setTimeout(() => {
      setRestoredToast(null);
    }, 6000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartNew = () => {
    setCurrentStep(1);
    setReason('');
    setNotes('');
    setAcknowledged(false);
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
              setEmail={setEmail}
              reason={reason}
              setReason={setReason}
              notes={notes}
              setNotes={setNotes}
              acknowledged={acknowledged}
              setAcknowledged={setAcknowledged}
              onProceed={handleProceedToVerification}
              onOpenExport={() => setIsExportOpen(true)}
            />
          )}

          {currentStep === 2 && (
            <StepEmailVerification
              email={email}
              onBack={handleBackToInput}
              onConfirmDeletion={handleConfirmDeletion}
            />
          )}

          {currentStep === 3 && (
            <StepDeletionConfirmed
              email={email}
              ticketId={ticketId}
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
