export type AppRoute = 'privacy-policy' | 'terms-and-conditions' | 'account-deletion';

export const BASE_URL = 'https://accounts.safesync.co.ke';

export const ROUTES = {
  'privacy-policy': {
    id: 'privacy-policy' as AppRoute,
    path: '/',
    fullUrl: 'https://accounts.safesync.co.ke/',
    label: 'Privacy Policy',
    title: 'SafeSync - Privacy Policy & Data Protection',
    description: 'Official SafeSync Privacy Policy, data encryption, GDPR Article 17 rights, and emergency telemetry governance.',
  },
  'terms-and-conditions': {
    id: 'terms-and-conditions' as AppRoute,
    path: '/terms',
    fullUrl: 'https://accounts.safesync.co.ke/terms',
    label: 'Terms & Conditions',
    title: 'SafeSync - Terms & Conditions of Service',
    description: 'SafeSync emergency network terms of service, hardware sensor maintenance, and automated response dispatch agreements.',
  },
  'account-deletion': {
    id: 'account-deletion' as AppRoute,
    path: '/delete',
    fullUrl: 'https://accounts.safesync.co.ke/delete',
    label: 'Account Deletion',
    title: 'SafeSync - Account Deletion & Identity Verification Portal',
    description: 'Request permanent account deletion and verify identity via email for SafeSync emergency accounts.',
  },
} as const;

export function getRouteFromLocation(): AppRoute {
  if (typeof window === 'undefined') return 'privacy-policy';
  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // Match /delete or #delete or #/delete or /account-deletion
  if (
    pathname === '/delete' ||
    pathname.startsWith('/delete/') ||
    hash.includes('delete') ||
    pathname.includes('account-deletion') ||
    hash.includes('account-deletion')
  ) {
    return 'account-deletion';
  }

  // Match /terms or #terms or #/terms
  if (
    pathname === '/terms' ||
    pathname.startsWith('/terms/') ||
    hash.includes('terms')
  ) {
    return 'terms-and-conditions';
  }

  // Root or any other path defaults to privacy-policy
  return 'privacy-policy';
}
