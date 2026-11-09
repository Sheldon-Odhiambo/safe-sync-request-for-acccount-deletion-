import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowLeft, RefreshCw, AlertTriangle, Lock, Loader2 } from 'lucide-react';

interface StepEmailVerificationProps {
  email: string;
  onBack: () => void;
  /** Re-send the code. Throws an Error with a user-facing message on failure. */
  onResend: () => Promise<void>;
  /** Verify the code and submit the deletion. Throws an Error with a user-facing message on failure. */
  onConfirmDeletion: (code: string) => Promise<void>;
}

export const StepEmailVerification: React.FC<StepEmailVerificationProps> = ({
  email,
  onBack,
  onResend,
  onConfirmDeletion,
}) => {
  // 6-digit verification code inputs
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [resendCountdown, setResendCountdown] = useState<number>(60);
  const [isResending, setIsResending] = useState(false);
  const [confirmPhrase, setConfirmPhrase] = useState('');
  const [acknowledgedFinal, setAcknowledgedFinal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleDigitChange = (index: number, val: string) => {
    setErrorMsg(null);
    const cleaned = val.replace(/[^0-9]/g, '');
    if (!cleaned) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    // If pasted full string
    if (cleaned.length > 1) {
      const chars = cleaned.slice(0, 6).split('');
      const newDigits = [...digits];
      chars.forEach((c, i) => {
        if (i < 6) newDigits[i] = c;
      });
      setDigits(newDigits);
      const nextFocus = Math.min(chars.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = cleaned[0];
    setDigits(newDigits);

    // Auto-focus next input
    if (index < 5 && cleaned[0]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Pasting the whole code into any box fills all six (maxLength=1 would otherwise cut it).
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!text) return;
    e.preventDefault();
    setErrorMsg(null);
    const newDigits = ['', '', '', '', '', ''];
    text.split('').forEach((c, i) => {
      newDigits[i] = c;
    });
    setDigits(newDigits);
    inputRefs.current[Math.min(text.length, 5)]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setErrorMsg(null);
    setInfoMsg(null);
    setIsResending(true);
    try {
      await onResend();
      setDigits(['', '', '', '', '', '']);
      setResendCountdown(60);
      setInfoMsg('A new code has been sent. Older codes no longer work.');
      inputRefs.current[0]?.focus();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not resend the code.');
    } finally {
      setIsResending(false);
    }
  };

  const currentEnteredCode = digits.join('');
  const isCodeComplete = currentEnteredCode.length === 6;
  const isPhraseCorrect = confirmPhrase.trim().toUpperCase() === 'DELETE';

  // Requirements for secondary confirmation button
  const canConfirmDeletion = isCodeComplete && isPhraseCorrect && acknowledgedFinal && !isVerifying;

  const handleExecuteDeletion = async () => {
    if (!canConfirmDeletion) return;
    setErrorMsg(null);
    setInfoMsg(null);
    setIsVerifying(true);
    try {
      // The code is checked by the server; on success the parent moves to step 3.
      await onConfirmDeletion(currentEnteredCode);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#DE1123] uppercase tracking-wider mb-1">
          <span>Step 2 of 3</span>
          <span>·</span>
          <span>Email Verification & Identity Confirmation</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Verify Your SafeSync Identity
        </h2>
        <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
          For your security and to prevent unauthorized deactivation of emergency services, a single-use verification code was sent to:
        </p>
        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200 text-slate-900 font-mono text-sm font-semibold">
          <Mail className="w-4 h-4 text-[#002B66]" />
          <span>{email}</span>
        </div>
      </div>

      {/* Code Input Fields */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-900 text-center mb-1">
            Enter 6-Digit Email Verification Code
          </label>
          <p className="text-xs text-slate-500 text-center mb-4">
            Check your inbox (and spam folder) for the code from SafeSync
          </p>

          <div className="flex justify-center items-center gap-2 sm:gap-3">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={idx === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-mono font-bold text-slate-900 bg-slate-50 border rounded-lg transition-all focus:outline-none focus:ring-2 ${
                  digit
                    ? 'border-[#002B66] bg-white ring-1 ring-[#002B66]/20'
                    : 'border-slate-300 focus:border-[#002B66] focus:ring-[#002B66]/10'
                }`}
              />
            ))}
          </div>

          {errorMsg && (
            <p role="alert" className="text-xs text-red-600 text-center mt-3 font-medium">
              {errorMsg}
            </p>
          )}
          {infoMsg && !errorMsg && (
            <p className="text-xs text-emerald-700 text-center mt-3 font-medium">{infoMsg}</p>
          )}

          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-600">
            <span>Didn't receive code?</span>
            {resendCountdown > 0 ? (
              <span className="font-mono text-slate-400">
                Resend available in {resendCountdown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-[#002B66] hover:underline font-semibold flex items-center gap-1 disabled:opacity-60"
              >
                <RefreshCw className={`w-3 h-3 ${isResending ? 'animate-spin' : ''}`} />
                {isResending ? 'Sending...' : 'Resend Verification Code'}
              </button>
            )}
          </div>
        </div>

        {/* Secondary Friction & Security Guard */}
        <div className="border-t border-slate-200 pt-5 space-y-4">
          <div className="bg-red-50/60 border border-red-200/80 rounded-lg p-3.5">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#DE1123] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">
                  Secondary Confirmation Requirement
                </span>
                To prevent accidental deletion of life-safety services, please confirm by typing <span className="font-mono font-bold text-[#DE1123]">DELETE</span> in the box below.
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="confirm-phrase-input" className="block text-xs font-semibold text-slate-800 mb-1">
                Type DELETE to enable final confirmation:
              </label>
              <input
                id="confirm-phrase-input"
                type="text"
                value={confirmPhrase}
                onChange={(e) => setConfirmPhrase(e.target.value)}
                placeholder="DELETE"
                className="w-full sm:w-64 px-3 py-2 text-sm font-mono uppercase bg-white border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500"
              />
            </div>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={acknowledgedFinal}
              onChange={(e) => setAcknowledgedFinal(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#DE1123] focus:ring-[#DE1123] accent-[#DE1123]"
            />
            <span className="text-xs text-slate-700 select-none">
              I verify that I am the authorized owner of <span className="font-semibold text-slate-900">{email}</span> and I authoritatively request the complete cessation and erasure of SafeSync services.
            </span>
          </label>
        </div>

        {/* Action Controls & Secondary Confirmation Button */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isVerifying}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Email Step</span>
          </button>

          <button
            type="button"
            onClick={handleExecuteDeletion}
            disabled={!canConfirmDeletion}
            className={`w-full sm:w-auto px-6 py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm ${
              canConfirmDeletion
                ? 'bg-[#DE1123] hover:bg-[#c20d1c] text-white cursor-pointer active:scale-98 ring-2 ring-red-200'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            <span>{isVerifying ? 'Verifying Identity...' : 'Confirm & Request Account Deletion'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};