// this file initializes the Supabase Client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseService = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseService) {
  console.error('⚠️  Supabase environment variables are missing!');
  console.error({ SUPABASE_URL: supabaseUrl, SUPABASE_SERVICE_ROLE_KEY: !! supabaseService });
  process.exit(1); // stoppe le backend proprement
}

export const supabase = createClient(supabaseUrl, supabaseService, {
  auth: { persistSession: false, autoRefreshToken: false }
});

