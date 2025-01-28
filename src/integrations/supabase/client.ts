import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nnxfcsvjuhwgoihhkdgk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ueGZjc3ZqdWh3Z29paGhrZGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4Nzk4NjIsImV4cCI6MjA1MzQ1NTg2Mn0.vR_vDbyB82YAaqQC51Oid1X04uby4EnLhYA3_vYjPJ8";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);