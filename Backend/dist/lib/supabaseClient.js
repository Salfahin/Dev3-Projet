"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
// this file initializes the Supabase Client
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseService = process.env.SUPABASE_SERVICE_KEY;
if (!supabaseUrl || !supabaseService) {
    console.error('⚠️  Supabase environment variables are missing!');
    console.error({ SUPABASE_URL: supabaseUrl, SUPABASE_SERVICE_ROLE_KEY: !!supabaseService });
    process.exit(1); // stoppe le backend proprement
}
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseService, {
    auth: { persistSession: false, autoRefreshToken: false }
});
