import React from 'react';
import { AlertTriangle, ShieldAlert, Radio, HeartPulse, Smartphone } from 'lucide-react';

export const SafetyImpactCard: React.FC = () => {
  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5 mb-6 text-slate-800">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Critical Life-Safety Notice
          </h3>
          <p className="text-sm text-slate-700 mt-1 leading-relaxed">
            SafeSync powers automated emergency detection and responder coordination. Submitting an account deletion request initiates the permanent deactivation of your life-safety services:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="flex items-start gap-2.5 bg-white/80 border border-amber-200/60 rounded-lg p-3">
              <Radio className="w-4 h-4 text-[#DE1123] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-slate-900 block">SOS Dispatch Deactivated</span>
                <span className="text-xs text-slate-600">Immediate cessation of automatic 911 / emergency dispatcher routing.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-white/80 border border-amber-200/60 rounded-lg p-3">
              <HeartPulse className="w-4 h-4 text-[#DE1123] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Medical Telemetry Unlinked</span>
                <span className="text-xs text-slate-600">Blood type, allergy notes, and emergency physician alerts will be purged.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-white/80 border border-amber-200/60 rounded-lg p-3">
              <Smartphone className="w-4 h-4 text-[#002B66] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Hardware Sensor Disconnect</span>
                <span className="text-xs text-slate-600">SafeSync Hubs, crash beacons, and wearables will revert to unlinked offline mode.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-white/80 border border-amber-200/60 rounded-lg p-3">
              <ShieldAlert className="w-4 h-4 text-[#002B66] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Emergency Contacts Removed</span>
                <span className="text-xs text-slate-600">Family members & caretakers will no longer receive distress alerts.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
