import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SafeSyncLogo } from './components/SafeSyncLogo';
import { SupportModal } from './components/SupportModal';
import PrivacyPolicyPage from './app/page';
import TermsAndConditionsPage from './app/terms-and-conditions/page';
import AccountDeletionPage from './app/account-deletion/page';
import { PhoneCall, ExternalLink } from 'lucide-react';
import { AppRoute, ROUTES, getRouteFromLocation, BASE_URL } from './routes';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getRouteFromLocation);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Sync document title and history on route change
  const applyRoute = (route: AppRoute, updateHistory = true) => {
    setCurrentRoute(route);
    const target = ROUTES[route];
    document.title = target.title;

    if (updateHistory && typeof window !== 'undefined') {
      try {
        window.history.pushState({ route }, '', target.path);
      } catch {
        // Fallback to hash if pushState is restricted
        window.location.hash = target.path === '/' ? '' : target.path;
      }
    }
  };

  // Sync with browser navigation (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const detected = getRouteFromLocation();
      applyRoute(detected, false);
    };

    // Initialize document title on mount
    document.title = ROUTES[currentRoute].title;

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleNavigate = (route: AppRoute) => {
    applyRoute(route, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, route: AppRoute) => {
    e.preventDefault();
    handleNavigate(route);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-[#002B66]/15 selection:text-[#002B66]">
      {/* Top Navigation Bar */}
      <Header
        currentRoute={currentRoute}
        onRouteChange={handleNavigate}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Canonical URL breadcrumb indicator for verification */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 border-b border-slate-200/70 pb-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-md border border-slate-200">
            <span className="text-[#002B66] font-semibold">URL:</span>
            <span className="font-bold text-slate-800">{ROUTES[currentRoute].fullUrl}</span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Official SafeSync Identity Services
          </span>
        </div>

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

      {/* Footer with Canonical Links */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SafeSyncLogo size="sm" variant="horizontal" showTagline={false} />
            <span className="text-slate-300">·</span>
            <span className="font-mono text-[11px] text-slate-400">accounts.safesync.co.ke</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={ROUTES['privacy-policy'].path}
              onClick={(e) => handleFooterLinkClick(e, 'privacy-policy')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'privacy-policy' ? 'text-[#002B66] font-bold' : 'hover:text-slate-900'
              }`}
            >
              Privacy Policy (/)
            </a>
            <span>·</span>
            <a
              href={ROUTES['terms-and-conditions'].path}
              onClick={(e) => handleFooterLinkClick(e, 'terms-and-conditions')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'terms-and-conditions' ? 'text-[#002B66] font-bold' : 'hover:text-slate-900'
              }`}
            >
              Terms & Conditions (/terms)
            </a>
            <span>·</span>
            <a
              href={ROUTES['account-deletion'].path}
              onClick={(e) => handleFooterLinkClick(e, 'account-deletion')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'account-deletion' ? 'text-[#DE1123] font-bold' : 'hover:text-slate-900'
              }`}
            >
              Account Deletion (/delete)
            </a>
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

        <div className="max-w-4xl mx-auto mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} SafeSync Inc. All rights reserved. Every Second Matters. Every Life Counts.
          </div>
          <div className="font-mono text-[10px] text-slate-400">
            accounts.safesync.co.ke/delete · accounts.safesync.co.ke/terms · accounts.safesync.co.ke/
          </div>
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
