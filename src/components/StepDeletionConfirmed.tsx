import React, { useState } from 'react';
import { CheckCircle2, Shield, Clock, Download, RotateCcw, FileText, AlertCircle } from 'lucide-react';
import { SafeSyncLogo } from './SafeSyncLogo';

interface StepDeletionConfirmedProps {
  email: string;
  ticketId: string;
  reason: string;
  onCancelDeletion: () => void;
  onStartNew: () => void;
}

export const StepDeletionConfirmed: React.FC<StepDeletionConfirmedProps> = ({
  email,
  ticketId,
  reason,
  onCancelDeletion,
  onStartNew,
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const requestDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const purgeDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const graceEndDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleDownloadReceipt = () => {
    const content = `SAFESYNC OFFICIAL ACCOUNT DELETION RECEIPT
=====================================================
Reference Ticket: ${ticketId}
Registered Email: ${email}
Submission Date: ${requestDate}
Reason Stated: ${reason || 'User requested account closure'}
Status: SCHEDULED FOR CRYPTOGRAPHIC PURGE

TIMELINE & RECOVERY
-----------------------------------------------------
1. Immediate (T+0): Emergency Dispatch & Beacon Sync severed.
2. Grace Period: Valid until ${graceEndDate} (14 days).
   You may cancel this request anytime before this date.
3. Permanent Purge: ${purgeDate}.
   All telemetry, medical profiles, and crash recordings permanently wiped.

SafeSync Emergency Response Systems
"Every Second Matters. Every Life Counts."
Security Dispatch: +25720 889 352 | privacy@safesync.internal
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SafeSync_Deletion_Receipt_${ticketId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  const handleTriggerCancel = () => {
    setIsCancelling(true);
    setTimeout(() => {
      setIsCancelling(false);
      onCancelDeletion();
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Success Badge & Header */}
      <div className="text-center py-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-3 shadow-xs">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200">
          <span>Deletion Request Acknowledged</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          SafeSync Account Scheduled for Erasure
        </h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto mt-1.5 leading-relaxed">
          Your identity verification has passed. We have detached your emergency profile for <span className="font-semibold text-slate-900">{email}</span> and queued permanent deletion.
        </p>
      </div>

      {/* Official Receipt Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Reference Ticket ID
            </span>
            <span className="font-mono text-lg font-bold text-[#002B66] tracking-wide">
              {ticketId}
            </span>
          </div>
          <button
            type="button"
            onClick={handleDownloadReceipt}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-[#002B66]" />
            <span>{downloaded ? 'Receipt Downloaded' : 'Download Deletion Receipt'}</span>
          </button>
        </div>

        {/* Schedule Stages */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Mandatory Deletion Schedule & Milestones
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Phase 1: Immediate</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Emergency dispatch severed. Wearables and vehicle beacon sync disconnected.
              </p>
            </div>

            <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-[#002B66] font-semibold text-xs mb-1">
                <Shield className="w-3.5 h-3.5 text-[#002B66]" />
                <span>Phase 2: 14-Day Grace</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Until {graceEndDate}. You can restore your account if this request was accidental.
              </p>
            </div>

            <div className="bg-red-50/60 border border-red-200 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-[#DE1123] font-semibold text-xs mb-1">
                <FileText className="w-3.5 h-3.5 text-[#DE1123]" />
                <span>Phase 3: Cryptographic Purge</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                By {purgeDate}. Irreversible erasure of biometric telemetry, incident logs & contact links.
              </p>
            </div>
          </div>
        </div>

        {/* Cancel Deletion / Recovery Option */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700">
              <span className="font-bold text-slate-900 block">Changed your mind or submitted by mistake?</span>
              During the 14-day grace period, you can abort this request and instantly restore full life-safety coverage.
            </div>
          </div>
          <button
            type="button"
            onClick={handleTriggerCancel}
            disabled={isCancelling}
            className="px-4 py-2 text-xs font-bold text-amber-900 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isCancelling ? 'Restoring Account...' : 'Cancel Deletion & Restore SafeSync'}</span>
          </button>
        </div>

        {/* Action button */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onStartNew}
            className="text-xs font-semibold text-[#002B66] hover:underline"
          >
            Submit Another Request or Test Again
          </button>
        </div>
      </div>
    </div>
  );
};
