import React, { useState } from 'react';
import { Mail, ArrowRight, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { SafetyImpactCard } from './SafetyImpactCard';

interface StepIdentityInputProps {
  email: string;
  setEmail: (email: string) => void;
  reason: string;
  setReason: (reason: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  acknowledged: boolean;
  setAcknowledged: (acknowledged: boolean) => void;
  onProceed: () => void;
  onOpenExport: () => void;
}

const DELETION_REASONS = [
  'Select a reason for account closure...',
  'No longer need automated emergency dispatch',
  'Hardware device (SafeSync Hub/Wearable) sold or decommissioned',
  'Transitioned to alternative municipal or personal safety system',
  'Privacy concerns / General Data Protection (GDPR/CCPA) erasure request',
  'Duplicate or test SafeSync account',
  'Temporary deactivation needed (prefer pause over permanent deletion)',
  'Other reason',
];

export const StepIdentityInput: React.FC<StepIdentityInputProps> = ({
  email,
  setEmail,
  reason,
  setReason,
  notes,
  setNotes,
  acknowledged,
  setAcknowledged,
  onProceed,
  onOpenExport,
}) => {
  const [touched, setTouched] = useState(false);

  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const emailValid = isValidEmail(email);
  const canProceed = emailValid && reason !== '' && reason !== DELETION_REASONS[0] && acknowledged;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (canProceed) {
      onProceed();
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#002B66] uppercase tracking-wider mb-1">
          <span>Step 1 of 3</span>
          <span>·</span>
          <span>Initiate Deletion Request</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          SafeSync Account & Telemetry Deletion
        </h2>
        <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
          Please provide the registered email address associated with your SafeSync account. A secure one-time verification link and 6-digit confirmation code will be dispatched to verify your identity.
        </p>
      </div>

      {/* Critical Safety Notice */}
      <SafetyImpactCard />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Input Field - Clear and prominent */}
        <div className="space-y-1.5">
          <label htmlFor="safesync-email" className="block text-sm font-semibold text-slate-900">
            SafeSync Account Email Address <span className="text-[#DE1123]">*</span>
          </label>
          <div className="relative rounded-lg shadow-2xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="safesync-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="e.g. user@safesync-alert.org or oumashelly004@gmail.com"
              required
              className={`block w-full pl-10 pr-10 py-3 text-sm text-slate-900 placeholder:text-slate-400 bg-white border rounded-lg transition-colors focus:outline-none focus:ring-2 ${
                touched && !emailValid
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                  : emailValid
                  ? 'border-emerald-300 focus:border-[#002B66] focus:ring-[#002B66]/10'
                  : 'border-slate-300 focus:border-[#002B66] focus:ring-[#002B66]/10'
              }`}
            />
            {emailValid && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            )}
          </div>
          {touched && !emailValid && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Please enter a valid email address where you receive SafeSync alerts.
            </p>
          )}
          <p className="text-xs text-slate-500">
            Identity verification code will be sent immediately to this mailbox.
          </p>
        </div>

        {/* Reason for Deletion */}
        <div className="space-y-1.5">
          <label htmlFor="deletion-reason" className="block text-sm font-semibold text-slate-900">
            Primary Reason for Deletion <span className="text-[#DE1123]">*</span>
          </label>
          <select
            id="deletion-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="block w-full py-2.5 px-3.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#002B66]/10 focus:border-[#002B66]"
          >
            {DELETION_REASONS.map((r) => (
              <option key={r} value={r === DELETION_REASONS[0] ? '' : r} disabled={r === DELETION_REASONS[0]}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Optional notes */}
        <div className="space-y-1.5">
          <label htmlFor="deletion-notes" className="block text-sm font-semibold text-slate-900">
            Additional Details or Hardware Serial Numbers <span className="text-xs font-normal text-slate-500">(Optional)</span>
          </label>
          <textarea
            id="deletion-notes"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Let our safety team know if you are unlinking specific wearable bands, vehicle sensors, or medical monitors..."
            className="block w-full p-3 text-sm text-slate-900 placeholder:text-slate-400 bg-white border border-slate-300 rounded-lg shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#002B66]/10 focus:border-[#002B66]"
          />
        </div>

        {/* Data Backup Option */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            <span className="font-semibold text-slate-900 block">Download your incident log archive first</span>
            Export your historical SOS logs, biometric telemetry summaries, and contact registry.
          </div>
          <button
            type="button"
            onClick={onOpenExport}
            className="px-3 py-1.5 text-xs font-semibold text-[#002B66] bg-white border border-slate-300 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            Export SafeSync Data
          </button>
        </div>

        {/* Acknowledgment Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-[#002B66] focus:ring-[#002B66] accent-[#002B66]"
            />
            <span className="text-xs text-slate-700 leading-normal select-none">
              <span className="font-semibold text-slate-900">I understand the permanent impact:</span> By continuing, I acknowledge that upon deletion completion, all active crash detection, emergency beacon sync, medical telemetry forwarding, and designated contact notifications linked to this account will permanently stop functioning.
            </span>
          </label>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex items-center justify-between gap-4 border-t border-slate-200">
          <div className="text-xs text-slate-500">
            Step 1 of 3: Identity Verification Next
          </div>
          <button
            type="submit"
            disabled={!canProceed}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg flex items-center gap-2 transition-all whitespace-nowrap shadow-xs ${
              canProceed
                ? 'bg-[#002B66] hover:bg-[#001f4d] text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Proceed to Email Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
