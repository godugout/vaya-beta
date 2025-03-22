
// Temporary stub for the missing hook
import { supabase } from '@/integrations/supabase/client';

export const useSupabaseAuth = () => {
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user: null,
    session: null,
    loading: false,
    error: null,
    signOut,
  };
};

export default useSupabaseAuth;
