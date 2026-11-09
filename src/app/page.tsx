import React from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserX,
  PhoneCall,
  Server,
  Share2,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { SafeSyncLogo } from '../components/SafeSyncLogo';

interface PageProps {
  onNavigateToAccountDeletion?: () => void;
  onNavigateToTerms?: () => void;
  onOpenSupport?: () => void;
}

export default function PrivacyPolicyPage({
  onNavigateToAccountDeletion,
  onNavigateToTerms,
  onOpenSupport,
}: PageProps) {
  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="text-center">
        <div className="inline-block p-3 rounded-2xl bg-white shadow-xs border border-slate-200/80 mb-4 hover:shadow-sm transition-shadow">
          <SafeSyncLogo size="lg" showTagline={true} />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2 border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-[#002B66]" />
          <span>Official SafeSync Regulatory Disclosure</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy & Data Protection
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-2 leading-relaxed">
          Learn how SafeSync collects, encrypts, and processes emergency response telemetry, biometric alerts, and personal data to protect lives during critical incidents.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 mt-4">
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-[#002B66]" />
            Effective Date: November 9, 2026
          </span>
          <span>·</span>
          <span className="font-mono">Version 3.4.1 (LTS)</span>
          <span>·</span>
          <span className="text-emerald-700 font-semibold">GDPR & CCPA Certified</span>
        </div>
      </div>

      {/* Quick Action Alert Banner: Right to Erasure */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#002B66] text-white shrink-0 mt-0.5">
            <UserX className="w-5 h-5 text-amber-300" />
          </div>
          <div className="text-xs text-slate-700">
            <span className="font-bold text-slate-900 block text-sm">
              Exercising Your Right to Erasure (Account Deletion)
            </span>
            Under GDPR Article 17 and CCPA, you have the statutory right to request permanent deletion of your SafeSync account, biometric logs, and telemetry history at any time.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/delete"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToAccountDeletion?.();
            }}
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#002B66] hover:bg-[#001f4d] rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs whitespace-nowrap cursor-pointer"
          >
            <span>Go to Account Deletion</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Legal Document Content */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Eye className="w-5 h-5 text-[#002B66]" />
            <h2>1. Information SafeSync Collects</h2>
          </div>
          <p>
            SafeSync develops life-critical automated emergency synchronization hardware and cloud telemetry software. To detect falls, vehicular collisions, and medical distress in real time, SafeSync collects and processes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1.5">
                A. Account & Profile Data
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                <li>Primary contact information (Full name, verified email, telephone number).</li>
                <li>Designated emergency responder circle (family, caregivers, physician contact numbers).</li>
                <li>Optional medical notes (blood group, critical allergies, pre-existing directives).</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1.5">
                B. Sensor & Telemetry Data
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                <li>Real-time GPS / GLONASS coordinates during active distress broadcasts.</li>
                <li>Accelerometer and gyroscope metrics (rapid deceleration, impact G-force vectors).</li>
                <li>Hardware device diagnostics (SafeSync Hub battery level, firmware version, link signal).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Share2 className="w-5 h-5 text-[#DE1123]" />
            <h2>2. How We Use and Share Emergency Information</h2>
          </div>
          <p>
            SafeSync adheres to a strict principle of data minimization. Emergency data is used exclusively for life-safety dispatch and response coordination:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong className="text-slate-900">Emergency Dispatch (PSAPs & 911 Services):</strong> In confirmed distress events, live coordinates, impact velocity, and registered medical flags are transmitted directly to certified Public Safety Answering Points (PSAPs) and first responders.
            </li>
            <li>
              <strong className="text-slate-900">Personal Emergency Circles:</strong> Automated SMS, phone ringers, and push notifications are immediately dispatched to your designated tier-1 family and caregiver contacts.
            </li>
            <li>
              <strong className="text-slate-900">Never Sold or Monetized:</strong> SafeSync never sells, leases, or trades user biometric telemetry, location histories, or personal identities to third-party advertisers or data brokers.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Lock className="w-5 h-5 text-[#002B66]" />
            <h2>3. Cryptographic Security Standards</h2>
          </div>
          <p>
            Because life-safety networks require infallible confidentiality, SafeSync employs end-to-end cryptographic safeguards:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-1">AES-256 Encryption</span>
              <span className="text-slate-600">All stored database records, medical summaries, and contact graphs are encrypted at rest using AES-256 keys.</span>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-1">TLS 1.3 Transport</span>
              <span className="text-slate-600">Telemetry packets from wearable sensors and vehicle OBD-II units route through mTLS and TLS 1.3 tunnels.</span>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-1">Email Tokenization</span>
              <span className="text-slate-600">Sensitive profile updates and deletion requests require single-use 6-digit email authorization.</span>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Clock className="w-5 h-5 text-amber-700" />
            <h2>4. Data Retention, Quarantines & Permanent Erasure</h2>
          </div>
          <p>
            When an account deletion request is authenticated via verified email and secondary confirmation:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600">
            <li>
              <strong className="text-slate-900">Immediate Suspension (Day 0):</strong> SOS routing, hub sync, and contact alert broadcasts cease immediately.
            </li>
            <li>
              <strong className="text-slate-900">14-Day Safety Grace Window:</strong> Accounts are placed into a quarantine status for 14 days to protect against unauthorized account termination or accidental disconnection of vulnerable family members. During this window, full service can be restored with a single click.
            </li>
            <li>
              <strong className="text-slate-900">Day 30 Cryptographic Purge:</strong> All sensor telemetry, location markers, and medical profiles are permanently purged across all active clusters and backup systems.
            </li>
            <li>
              <strong className="text-slate-900">Statutory Exception:</strong> Official 911 dispatch communication logs forwarded to municipal public-safety emergency dispatchers must be retained in an anonymized format pursuant to statutory public safety regulations.
            </li>
          </ol>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <FileText className="w-5 h-5 text-[#002B66]" />
            <h2>5. Your Privacy Rights (GDPR & CCPA)</h2>
          </div>
          <p>
            Regardless of your geographic jurisdiction, SafeSync extends universal rights to all registered users:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li><strong>Right to Access & Portability:</strong> You may request and download a complete JSON archive of your personal telemetry and registered device history.</li>
            <li><strong>Right to Rectification:</strong> You can update medical directives, allergies, and contact phone numbers directly in your account.</li>
            <li><strong>Right to Erasure:</strong> You can initiate full account deletion via our dedicated verification workflow.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <PhoneCall className="w-5 h-5 text-[#002B66]" />
            <h2>6. Contacting the Data Protection Officer (DPO)</h2>
          </div>
          <p>
            For privacy inquiries, regulatory notices, or emergency account locks, contact our dedicated compliance office:
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-semibold text-slate-800">
                SafeSync Data Protection Office:
              </span>
              <span className="font-mono text-slate-700">dpo@safesync-emergency.org</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-semibold text-slate-800">
                24/7 Security & Dispatch Hotline:
              </span>
              <a
                href="tel:+25720889352"
                className="font-mono font-bold text-[#002B66] hover:underline"
              >
                +25720 889 352
              </a>
            </div>
            <div className="pt-2 text-[11px] text-slate-500">
              SafeSync Inc. · Global Security & Emergency Communications Center · Available 24/7/365.
            </div>
          </div>
        </section>
      </div>

      {/* Cross-Link Navigation CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/terms"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToTerms?.();
          }}
          className="p-5 text-left bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-all shadow-2xs group cursor-pointer block"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Related Agreement
            </span>
            <span className="font-mono text-[10px] text-slate-400">/terms</span>
          </div>
          <span className="text-base font-bold text-slate-900 group-hover:text-[#002B66] transition-colors flex items-center justify-between">
            <span>Read Terms & Conditions</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#002B66] group-hover:translate-x-1 transition-all" />
          </span>
          <span className="text-xs text-slate-600 mt-1 block">
            Review life-safety operation rules, hardware warranties, and dispatch protocols.
          </span>
        </a>

        <a
          href="/delete"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToAccountDeletion?.();
          }}
          className="p-5 text-left bg-white border border-slate-200 hover:border-red-300 rounded-xl transition-all shadow-2xs group cursor-pointer block"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#DE1123] uppercase tracking-wider block">
              Data Erasure Request
            </span>
            <span className="font-mono text-[10px] text-red-400">/delete</span>
          </div>
          <span className="text-base font-bold text-slate-900 group-hover:text-[#DE1123] transition-colors flex items-center justify-between">
            <span>Request Account Deletion</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#DE1123] group-hover:translate-x-1 transition-all" />
          </span>
          <span className="text-xs text-slate-600 mt-1 block">
            Verify identity via email and initiate SafeSync telemetry deactivation.
          </span>
        </a>
      </div>
    </div>
  );
}
