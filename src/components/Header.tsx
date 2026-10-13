import React from 'react';
import { ShieldCheck, PhoneCall } from 'lucide-react';
import { SafeSyncLogo } from './SafeSyncLogo';

interface HeaderProps {
  onOpenSupport: () => void;
  onOpenPrivacy: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSupport, onOpenPrivacy }) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
      {/* Top Banner for critical 24/7 hotline notice */}
      <div className="bg-[#002B66] text-white text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide uppercase text-[11px] text-amber-300">
              Emergency Services Notice
            </span>
            <span className="text-slate-300 hidden sm:inline">·</span>
            <span className="text-slate-200 hidden sm:inline">
              In an active life-threatening situation, dial 911 or your local emergency number immediately.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-slate-300 text-[11px]">
            <a
              href="tel:+25720889352"
              className="flex items-center gap-1 font-mono tabular-nums hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>+25720 889 352 (24/7)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar following Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <SafeSyncLogo size="sm" variant="horizontal" showTagline={false} />
          <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
            Security & Identity Portal
          </span>
        </div>

        {/* Zone 2: Concise Nav Links (single-line, clean text hover) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a
            href="#impact-overview"
            className="hover:text-[#002B66] transition-colors whitespace-nowrap shrink-0"
          >
            Safety Impact
          </a>
          <button
            onClick={onOpenPrivacy}
            className="hover:text-[#002B66] transition-colors whitespace-nowrap shrink-0 text-left"
          >
            Data Retention & GDPR
          </button>
          <a
            href="#faq-section"
            className="hover:text-[#002B66] transition-colors whitespace-nowrap shrink-0"
          >
            FAQs
          </a>
          <button
            onClick={onOpenSupport}
            className="hover:text-[#002B66] transition-colors whitespace-nowrap shrink-0 text-left"
          >
            Dispatch Support
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Encrypted</span>
          </div>
          <button
            onClick={onOpenSupport}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#002B66] rounded-lg hover:bg-[#001f4d] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Contact Security Team
          </button>
        </div>
      </div>
    </header>
  );
};
