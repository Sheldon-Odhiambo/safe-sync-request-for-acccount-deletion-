import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const pubKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && pubKey);

// The session lives in memory only (persistSession: false). This is a one-off
// account-deletion page, so nothing is left in localStorage on a shared computer.
export const supabase = createClient(
  url || 'http://localhost:54321',
  pubKey || 'missing-pub-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);