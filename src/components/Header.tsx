import React from 'react';
import { PhoneCall } from 'lucide-react';
import { SafeSyncLogo } from './SafeSyncLogo';

export type AppRoute = 'privacy-policy' | 'terms-and-conditions' | 'account-deletion';

interface HeaderProps {
  currentRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
  onOpenSupport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onRouteChange,
}) => {
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

      {/* Main Top Bar: Clean Brand Zone and 3 Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: Brand Wordmark (clicking goes to root page: Privacy Policy) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onRouteChange('privacy-policy')}
            className="flex items-center text-left focus:outline-none cursor-pointer"
            aria-label="SafeSync Home"
          >
            <SafeSyncLogo size="sm" variant="horizontal" showTagline={false} />
          </button>
          <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
            Compliance & Portal
          </span>
        </div>

        {/* Zone 2: Navigation Links — STRICTLY: Privacy Policy, Terms & Conditions, Account Deletion */}
        <nav className="flex items-center gap-1.5 sm:gap-4 text-xs sm:text-sm font-medium">
          <button
            type="button"
            onClick={() => onRouteChange('privacy-policy')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentRoute === 'privacy-policy'
                ? 'text-[#002B66] font-bold bg-slate-100/90 shadow-2xs'
                : 'text-slate-600 hover:text-[#002B66] hover:bg-slate-50'
            }`}
          >
            Privacy Policy
          </button>

          <button
            type="button"
            onClick={() => onRouteChange('terms-and-conditions')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentRoute === 'terms-and-conditions'
                ? 'text-[#002B66] font-bold bg-slate-100/90 shadow-2xs'
                : 'text-slate-600 hover:text-[#002B66] hover:bg-slate-50'
            }`}
          >
            Terms & Conditions
          </button>

          <button
            type="button"
            onClick={() => onRouteChange('account-deletion')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentRoute === 'account-deletion'
                ? 'text-[#DE1123] font-bold bg-red-50 shadow-2xs ring-1 ring-red-200'
                : 'text-slate-600 hover:text-[#DE1123] hover:bg-slate-50'
            }`}
          >
            Account Deletion
          </button>
        </nav>
      </div>
    </header>
  );
};
