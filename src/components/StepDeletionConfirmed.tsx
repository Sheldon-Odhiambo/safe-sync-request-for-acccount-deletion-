import React, { useState } from 'react';
import { CheckCircle2, Shield, Clock, Download, RotateCcw, FileText, AlertCircle } from 'lucide-react';

interface StepDeletionConfirmedProps {
  email: string;
  /** When the backend recorded the request (ISO string). */
  requestedAt: string | null;
  /** When the grace period ends and erasure becomes due (ISO string). */
  scheduledFor: string | null;
  /** True if a request already existed when the user verified. */
  alreadyPending: boolean;
  reason: string;
  /** Cancels the pending request. Throws an Error with a user-facing message on failure. */
  onCancelDeletion: () => Promise<void>;
  onStartNew: () => void;
}

const formatDate = (iso: string | null, withTime = false): string => {
  if (!iso) return 'the end of the grace period';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 'the end of the grace period';
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  });
};

export const StepDeletionConfirmed: React.FC<StepDeletionConfirmedProps> = ({
  email,
  requestedAt,
  scheduledFor,
  alreadyPending,
  reason,
  onCancelDeletion,
  onStartNew,
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const requestDate = formatDate(requestedAt, true);
  const eraseDate = formatDate(scheduledFor);

  const handleDownloadReceipt = () => {
    const content = `SAFESYNC ACCOUNT DELETION RECEIPT
=====================================================
Registered Email: ${email}
Request Recorded: ${requestDate}
Reason Stated: ${reason || 'User requested account closure'}
Status: DELETION SCHEDULED

TIMELINE & RECOVERY
-----------------------------------------------------
1. Request recorded against your verified account.
2. Grace Period: until ${eraseDate} (14 days).
   You may cancel this request any time before then.
3. Erasure: runs after ${eraseDate} unless the request is cancelled.
   Your account data is then removed.

SafeSync Emergency Response Systems
"Every Second Matters. Every Life Counts."
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SafeSync_Deletion_Receipt.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  const handleTriggerCancel = async () => {
    setCancelError(null);
    setIsCancelling(true);
    try {
      await onCancelDeletion();
    } catch (err) {
      setCancelError(err instanceof Error ? err.message : 'Could not cancel the request.');
      setIsCancelling(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Badge & Header */}
      <div className="text-center py-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-3 shadow-xs">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200">
          <span>{alreadyPending ? 'Deletion Already Scheduled' : 'Deletion Request Acknowledged'}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          SafeSync Account Scheduled for Erasure
        </h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto mt-1.5 leading-relaxed">
          {alreadyPending
            ? <>A deletion request for <span className="font-semibold text-slate-900">{email}</span> was already on file. </>
            : <>Your identity verification has passed and deletion of <span className="font-semibold text-slate-900">{email}</span> has been scheduled. </>}
          Your account will be erased after <span className="font-semibold text-slate-900">{eraseDate}</span> unless you cancel.
        </p>
      </div>

      {/* Official Receipt Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Request Recorded
            </span>
            <span className="font-mono text-lg font-bold text-[#002B66] tracking-wide">
              {requestDate}
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
            Deletion Schedule & Milestones
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Phase 1: Request Recorded</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your request is saved against your verified account. Nothing has been erased yet.
              </p>
            </div>

            <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-[#002B66] font-semibold text-xs mb-1">
                <Shield className="w-3.5 h-3.5 text-[#002B66]" />
                <span>Phase 2: 14-Day Grace</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Until {eraseDate}. You can cancel if this request was accidental.
              </p>
            </div>

            <div className="bg-red-50/60 border border-red-200 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-[#DE1123] font-semibold text-xs mb-1">
                <FileText className="w-3.5 h-3.5 text-[#DE1123]" />
                <span>Phase 3: Erasure</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                After {eraseDate}. Irreversible removal of your account data.
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
              During the 14-day grace period, you can abort this request and keep your account.
              {cancelError && (
                <span role="alert" className="block text-red-600 font-medium mt-1">
                  {cancelError}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleTriggerCancel}
            disabled={isCancelling}
            className="px-4 py-2 text-xs font-bold text-amber-900 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer shadow-2xs disabled:opacity-60"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isCancelling ? 'animate-spin' : ''}`} />
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
            Finish & Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};