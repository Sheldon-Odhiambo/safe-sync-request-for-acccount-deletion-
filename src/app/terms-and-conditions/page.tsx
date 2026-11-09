import React from 'react';
import {
  FileText,
  AlertTriangle,
  Radio,
  CheckCircle,
  HelpCircle,
  Shield,
  PhoneCall,
  Clock,
  ArrowRight,
  Cpu,
  UserCheck,
} from 'lucide-react';
import { SafeSyncLogo } from '../../components/SafeSyncLogo';

interface TermsPageProps {
  onNavigateToPrivacy?: () => void;
  onNavigateToAccountDeletion?: () => void;
  onOpenSupport?: () => void;
}

export default function TermsAndConditionsPage({
  onNavigateToPrivacy,
  onNavigateToAccountDeletion,
  onOpenSupport,
}: TermsPageProps) {
  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="text-center">
        <div className="inline-block p-3 rounded-2xl bg-white shadow-xs border border-slate-200/80 mb-4 hover:shadow-sm transition-shadow">
          <SafeSyncLogo size="lg" showTagline={true} />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2 border border-slate-200">
          <FileText className="w-3.5 h-3.5 text-[#002B66]" />
          <span>SafeSync Emergency Operations Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms & Conditions of Service
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-2 leading-relaxed">
          These terms govern your use of SafeSync life-safety emergency networks, hub hardware, biometric telemetry sensors, and automated responder dispatch algorithms.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 mt-4">
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-[#002B66]" />
            Last Updated: November 9, 2026
          </span>
          <span>·</span>
          <span className="font-mono">Agreement Ref: TOS-2026-REV4</span>
          <span>·</span>
          <span className="text-[#002B66] font-semibold">24/7 Monitoring Standard</span>
        </div>
      </div>

      {/* Prominent Safety Notice Box */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-5 text-slate-800">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
          </div>
          <div className="text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 block text-sm">
              Critical Life-Safety Operation Disclaimer
            </span>
            <p className="leading-relaxed">
              SafeSync provides cutting-edge automated impact detection, fall telemetry, and emergency notification routing. SafeSync is intended to supplement, but never replace, traditional 911 / municipal emergency dialing. If you or a loved one is experiencing an active life-threatening medical emergency or danger, contact emergency services directly via telephone whenever possible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Document Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <UserCheck className="w-5 h-5 text-[#002B66]" />
            <h2>1. Acceptance of Terms & Eligibility</h2>
          </div>
          <p>
            By initializing a SafeSync Base Station, pairing a wearable vitals monitor, installing an in-vehicle telematics sensor, or creating a user account, you confirm that you are at least 18 years of age (or authorized legal guardian) and agree to be bound by these Terms and Conditions.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Radio className="w-5 h-5 text-[#DE1123]" />
            <h2>2. Automated SOS Dispatch Protocol & False Alarm Clearing</h2>
          </div>
          <p>
            SafeSync operates automated algorithmic detection protocols:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong className="text-slate-900">20-Second Pre-Alarm Window:</strong> When extreme impact deceleration or a sudden fall is detected, SafeSync hardware triggers an audible and haptic pre-alarm. You have 20 seconds to cancel the alarm using your master PIN before emergency dispatch escalation.
            </li>
            <li>
              <strong className="text-slate-900">Responder Escalation:</strong> If the pre-alarm is uncancelled, SafeSync initiates prioritized contact calls to your designated tier-1 family circle and transmits encrypted location packets to regional emergency response dispatchers.
            </li>
            <li>
              <strong className="text-slate-900">User Cooperation on False Alarms:</strong> Users agree to maintain accurate PIN credentials to prevent inadvertent municipal dispatch fees or municipal false-alarm penalties.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Cpu className="w-5 h-5 text-[#002B66]" />
            <h2>3. Hardware Maintenance & Cellular Coverage Reliance</h2>
          </div>
          <p>
            The reliable operation of SafeSync depends on hardware and telecommunication dependencies:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-1">Battery & Power Integrity</span>
              <span className="text-slate-600">Users are solely responsible for ensuring wearable bands and base stations remain charged. Low-battery warnings are transmitted to your verified email.</span>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-1">Telecommunications Networks</span>
              <span className="text-slate-600">SafeSync utilizes multi-carrier LTE-M and satellite failover. Operation may be degraded in subterranean structures or remote areas lacking cellular or GPS line-of-sight.</span>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Shield className="w-5 h-5 text-[#002B66]" />
            <h2>4. Account Deletion, Termination & 14-Day Safety Grace Period</h2>
          </div>
          <p>
            Because SafeSync is tied directly to life safety, terminating your account requires multi-step identity verification:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong className="text-slate-900">Mandatory Verification:</strong> Account deletion requests must be verified via a 6-digit email authentication code and secondary confirmation phrase to prevent accidental or malicious service deactivation.
            </li>
            <li>
              <strong className="text-slate-900">14-Day Grace Window:</strong> Upon confirmation, active monitoring is disconnected, and the account enters a 14-day hold. You may reverse the termination during this window with your Reference Ticket ID.
            </li>
            <li>
              <strong className="text-slate-900">Day 30 Purge:</strong> After 30 days, all telemetry, medical histories, and hardware links are permanently wiped from SafeSync systems.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <HelpCircle className="w-5 h-5 text-[#002B66]" />
            <h2>5. Limitation of Liability</h2>
          </div>
          <p>
            To the maximum extent permitted by applicable law, SafeSync and its affiliates shall not be liable for any indirect, incidental, or consequential damages resulting from third-party cellular outages, GPS satellite signal degradation, municipal dispatcher response times, or hardware battery depletion.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <PhoneCall className="w-5 h-5 text-[#002B66]" />
            <h2>6. Governing Law & Emergency Inquiries</h2>
          </div>
          <p>
            These Terms are governed by and construed in accordance with public safety and commercial statutes. For questions or urgent hardware reassignment:
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800">24/7 Operations Line:</span>
              <a
                href="tel:+25720889352"
                className="font-mono font-bold text-[#002B66] hover:underline"
              >
                +25720 889 352
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800">Legal & Regulatory Affairs:</span>
              <span className="font-mono text-slate-700">legal@safesync-emergency.org</span>
            </div>
          </div>
        </section>
      </div>

      {/* Navigation Footlinks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onNavigateToPrivacy}
          className="p-5 text-left bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-all shadow-2xs group cursor-pointer"
        >
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Privacy Standards
          </span>
          <span className="text-base font-bold text-slate-900 group-hover:text-[#002B66] transition-colors flex items-center justify-between">
            <span>Read Privacy Policy</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#002B66] group-hover:translate-x-1 transition-all" />
          </span>
          <span className="text-xs text-slate-600 mt-1 block">
            Discover how SafeSync encrypts medical data and handles telemetry retention.
          </span>
        </button>

        <button
          type="button"
          onClick={onNavigateToAccountDeletion}
          className="p-5 text-left bg-white border border-slate-200 hover:border-red-300 rounded-xl transition-all shadow-2xs group cursor-pointer"
        >
          <span className="text-xs font-bold text-[#DE1123] uppercase tracking-wider block mb-1">
            Account Management
          </span>
          <span className="text-base font-bold text-slate-900 group-hover:text-[#DE1123] transition-colors flex items-center justify-between">
            <span>Request Account Deletion</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#DE1123] group-hover:translate-x-1 transition-all" />
          </span>
          <span className="text-xs text-slate-600 mt-1 block">
            Authenticate email identity and disconnect emergency dispatch services.
          </span>
        </button>
      </div>
    </div>
  );
}
