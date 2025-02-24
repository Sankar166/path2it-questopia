
import { createClient } from '@supabase/supabase-js';

// Direct initialization with project values since we have them
const supabaseUrl = 'https://tmtwuqlfqdmjncwrnlfz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdHd1cWxmcWRtam5jd3JubGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMzE5MDQsImV4cCI6MjA1NTgwNzkwNH0.GINhbLC8LGNpm87uxfPSALn2cdLEPHFcz4iRoahdrTk';

// Create a special admin client for operations that need elevated privileges
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// Regular client for normal operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
