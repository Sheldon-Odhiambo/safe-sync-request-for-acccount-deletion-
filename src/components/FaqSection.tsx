import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, AlertTriangle, KeyRound, HardDrive } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'Why does SafeSync require email verification before account deletion?',
      answer:
        'SafeSync is an automated life-safety, emergency telemetry, and SOS dispatch system. Because account deletion permanently disconnects automatic crash detection and ceases 911/responder notifications, strict verification via email authentication is mandatory to prevent unauthorized tampering, accidental termination, or malicious deactivation of life-saving alerts.',
      icon: <KeyRound className="w-4 h-4 text-[#002B66]" />,
    },
    {
      id: 'faq-2',
      question: 'What happens to my physical SafeSync hardware (Hubs, Wearables, Vehicle Sensors)?',
      answer:
        'Upon deletion confirmation, all paired sensors are unlinked from your SafeSync cloud account. Your Base Station and wearable pagers will enter factory-unpaired mode and will no longer transmit telemetry or trigger cloud SOS dispatches until re-registered to a new authorized profile.',
      icon: <HardDrive className="w-4 h-4 text-[#DE1123]" />,
    },
    {
      id: 'faq-3',
      question: 'What is the 14-day Grace Period, and can I cancel a deletion request?',
      answer:
        'Yes. To protect accounts from compromised credentials or accidental clicks, SafeSync holds accounts in a 14-day deactivated grace period. During these 14 days, your profile is inactive, but you can immediately restore full protection with one click using your Reference Ticket ID or email recovery link. After day 30, all data is irreversibly purged.',
      icon: <Shield className="w-4 h-4 text-emerald-600" />,
    },
    {
      id: 'faq-4',
      question: 'Are historical emergency dispatch call recordings also deleted?',
      answer:
        'Your personal profile, contact directory, and telemetry history are completely deleted. However, under state and federal public safety statutory regulations (911/PSAP dispatch records), anonymized emergency dispatch transcripts must be retained for the legally mandated compliance period.',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
    },
  ];

  return (
    <section id="faq-section" className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-4 h-4 text-[#002B66]" />
        <span className="text-xs font-bold text-[#002B66] uppercase tracking-wider">
          Safety & Compliance FAQ
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-4">
        Frequently Asked Questions for SafeSync Account Deletion
      </h3>

      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="border border-slate-200 bg-white rounded-xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-slate-100 shrink-0">
                    {faq.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-slate-700' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
