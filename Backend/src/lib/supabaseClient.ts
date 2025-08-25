import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnon = process.env.SUPABASE_ANON_KEY;
const supabaseService = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseAnon || !supabaseService) {
  console.error('⚠️  Supabase environment variables are missing!');
  console.error({ SUPABASE_URL: supabaseUrl, SUPABASE_ANON_KEY: !!supabaseAnon, SUPABASE_SERVICE_ROLE_KEY: !!supabaseService });
  process.exit(1); // stoppe le backend proprement
}

export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: { persistSession: false, autoRefreshToken: false }
});

export const supabaseAdmin = createClient(supabaseUrl, supabaseService, {
  auth: { persistSession: false, autoRefreshToken: false }
});
