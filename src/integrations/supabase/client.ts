
import { createClient } from '@supabase/supabase-js';
import { TABLE_NAMES } from './tables';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://awozvespcrnfkfkpoyft.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3b3p2ZXNwY3JuZmtma3BveWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MTE0MzMsImV4cCI6MjA1Njk4NzQzM30.GKwIBSn11_eHA6tQejORganVvGMalZMzUfi9hgh9XdA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get the correct table name
export function getTable<T extends keyof typeof TABLE_NAMES>(name: T) {
  return TABLE_NAMES[name];
}
