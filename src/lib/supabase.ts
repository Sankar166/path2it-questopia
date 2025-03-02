
import { createClient } from '@supabase/supabase-js';

// Direct initialization with project values since we have them
const supabaseUrl = 'https://tmtwuqlfqdmjncwrnlfz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdHd1cWxmcWRtam5jd3JubGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMzE5MDQsImV4cCI6MjA1NTgwNzkwNH0.GINhbLC8LGNpm87uxfPSALn2cdLEPHFcz4iRoahdrTk';

// Create a special admin client for operations that need elevated privileges
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// Get the current site URL dynamically for auth redirects
const getSiteUrl = () => {
  let url = window.location.origin;
  // Handle development environment
  if (url.includes('localhost')) {
    return url;
  }
  // Handle Lovable preview environment
  if (url.includes('lovable.dev')) {
    return url;
  }
  return url;
};

// Regular client for normal operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirectTo: `${getSiteUrl()}/auth`,
    cookieOptions: {
      path: '/',
    },
  },
});

// Configure auth state change handler
supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    console.log(`Auth state changed: ${event}`);
  }
});
