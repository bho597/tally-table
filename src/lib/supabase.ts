import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // We'll wire up MMKV storage here in Phase 1 Step 2
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
