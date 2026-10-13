import React from 'react';
import { X, ShieldCheck, Database, Calendar } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-50 text-[#002B66] border border-blue-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              SafeSync Data Deletion & Privacy Policy
            </h3>
            <p className="text-xs text-slate-500">
              GDPR Article 17 (Right to Erasure) & CCPA Regulatory Disclosure
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <Database className="w-4 h-4 text-[#002B66]" />
              <span>What Data Is Permanently Purged:</span>
            </div>
            <ul className="list-disc pl-4 space-y-1">
              <li>Biometric and vitals telemetry (heart rate logs, fall alerts, sensor pings)</li>
              <li>Location tracking histories and geofence safe zones</li>
              <li>Emergency contact names, phone numbers, and notification preferences</li>
              <li>Medical emergency profile (allergies, medications, hospital choices)</li>
              <li>Authentication credentials, password hashes, and OAuth link tokens</li>
            </ul>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <Calendar className="w-4 h-4 text-[#DE1123]" />
              <span>Retention Schedule:</span>
            </div>
            <p>
              Once identity is confirmed via email and the secondary confirmation button is clicked:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Day 0 (Immediate):</strong> Your active SOS dispatch routing is disabled.</li>
              <li><strong>Days 1–14 (Grace Window):</strong> Data is quarantined. You may cancel this request if initiated in error.</li>
              <li><strong>Day 30:</strong> Irreversible cryptographic purge executed across all active and backup replica clusters.</li>
            </ul>
          </div>

          <p className="text-slate-500 text-[11px]">
            Statutory Exception: Emergency dispatch telecommunications records transmitted to 911 / Public Safety Answering Points (PSAPs) are subject to statutory retention mandates and are kept in anonymized archival storage pursuant to municipal safety law.
          </p>
        </div>

        <div className="flex justify-end pt-4 mt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#002B66] hover:bg-[#001f4d] rounded-lg transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
