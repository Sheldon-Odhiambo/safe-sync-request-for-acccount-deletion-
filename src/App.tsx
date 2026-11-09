import React, { useState, useEffect } from 'react';
import { Header, AppRoute } from './components/Header';
import { SafeSyncLogo } from './components/SafeSyncLogo';
import { SupportModal } from './components/SupportModal';
import PrivacyPolicyPage from './app/page';
import TermsAndConditionsPage from './app/terms-and-conditions/page';
import AccountDeletionPage from './app/account-deletion/page';
import { PhoneCall } from 'lucide-react';

function getInitialRoute(): AppRoute {
  if (typeof window === 'undefined') return 'privacy-policy';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (hash.includes('terms') || path.includes('terms')) {
    return 'terms-and-conditions';
  }
  if (hash.includes('account-deletion') || hash.includes('deletion') || path.includes('deletion')) {
    return 'account-deletion';
  }
  // Default root page is privacy-policy
  return 'privacy-policy';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getInitialRoute);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Sync route changes with URL hash for persistent sharing/refresh
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleNavigate = (route: AppRoute) => {
    setCurrentRoute(route);
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-[#002B66]/15 selection:text-[#002B66]">
      {/* Top Navigation Bar with ONLY: Privacy Policy, Terms & Conditions, Account Deletion */}
      <Header
        currentRoute={currentRoute}
        onRouteChange={handleNavigate}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentRoute === 'privacy-policy' && (
          <PrivacyPolicyPage
            onNavigateToAccountDeletion={() => handleNavigate('account-deletion')}
            onNavigateToTerms={() => handleNavigate('terms-and-conditions')}
            onOpenSupport={() => setIsSupportOpen(true)}
          />
        )}

        {currentRoute === 'terms-and-conditions' && (
          <TermsAndConditionsPage
            onNavigateToPrivacy={() => handleNavigate('privacy-policy')}
            onNavigateToAccountDeletion={() => handleNavigate('account-deletion')}
            onOpenSupport={() => setIsSupportOpen(true)}
          />
        )}

        {currentRoute === 'account-deletion' && (
          <AccountDeletionPage
            onNavigateToPrivacy={() => handleNavigate('privacy-policy')}
            onNavigateToTerms={() => handleNavigate('terms-and-conditions')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SafeSyncLogo size="sm" variant="horizontal" showTagline={false} />
            <span className="text-slate-300">·</span>
            <span>Emergency Telemetry & Sync Network</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate('privacy-policy')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'privacy-policy' ? 'text-[#002B66] font-bold' : 'hover:text-slate-900'
              }`}
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleNavigate('terms-and-conditions')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'terms-and-conditions' ? 'text-[#002B66] font-bold' : 'hover:text-slate-900'
              }`}
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleNavigate('account-deletion')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'account-deletion' ? 'text-[#DE1123] font-bold' : 'hover:text-slate-900'
              }`}
            >
              Account Deletion
            </button>
            <span>·</span>
            <a
              href="tel:+25720889352"
              className="flex items-center gap-1 font-mono text-[#002B66] hover:underline"
            >
              <PhoneCall className="w-3 h-3 text-red-500" />
              <span>+25720 889 352</span>
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-4 pt-4 border-t border-slate-100 text-center text-slate-400 text-[11px]">
          © {new Date().getFullYear()} SafeSync Inc. All rights reserved. Every Second Matters. Every Life Counts.
        </div>
      </footer>

      {/* Support & Dispatch Hotline Modal */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </div>
  );
}
