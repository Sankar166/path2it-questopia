// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tmtwuqlfqdmjncwrnlfz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdHd1cWxmcWRtam5jd3JubGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMzE5MDQsImV4cCI6MjA1NTgwNzkwNH0.GINhbLC8LGNpm87uxfPSALn2cdLEPHFcz4iRoahdrTk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);