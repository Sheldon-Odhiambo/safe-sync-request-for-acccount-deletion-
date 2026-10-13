import React, { useState } from 'react';
import { X, PhoneCall, Mail, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketBody, setTicketBody] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTicketSubject('');
      setTicketBody('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-red-50 text-[#DE1123] border border-red-200">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              SafeSync Security & Dispatch Support
            </h3>
            <p className="text-xs text-slate-500">
              Assistance with account deletion, device transfers, or emergency hold
            </p>
          </div>
        </div>

        {/* 24/7 Priority Emergency Numbers */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#002B66]" />
              Account Security Hotline (Toll-Free):
            </span>
            <a
              href="tel:+25720889352"
              className="font-mono font-bold text-[#002B66] hover:underline"
            >
              +25720 889 352
            </a>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#DE1123]" />
              Data Protection Officer (DPO):
            </span>
            <span className="font-mono text-slate-800">dpo@safesync-emergency.org</span>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
            Available 24 hours a day, 7 days a week. For immediate cancellation of unauthorized deletion requests, call our hotline immediately.
          </div>
        </div>

        {/* Direct Ticket Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Send Message to Support Specialist
          </h4>

          <div>
            <input
              type="text"
              required
              placeholder="Subject (e.g., Unlink Hub before deletion, Pausing account)"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B66]/10 focus:border-[#002B66]"
            />
          </div>

          <div>
            <textarea
              required
              rows={3}
              placeholder="Describe your inquiry or hardware setup..."
              value={ticketBody}
              onChange={(e) => setTicketBody(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B66]/10 focus:border-[#002B66]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-[#002B66] hover:bg-[#001f4d] rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ticket Transmitted</span>
                </>
              ) : (
                <span>Submit Priority Inquiry</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
