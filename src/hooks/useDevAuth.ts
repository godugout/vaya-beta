
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function useDevAuth() {
  const { toast } = useToast();

  useEffect(() => {
    const autoLogin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Only auto-login if there's no existing session
      if (!session) {
        const { error } = await supabase.auth.signInWithPassword({
          email: 'admin@vaya.family',
          password: 'admin123'
        });

        if (error) {
          console.error('Dev auto-login failed:', error.message);
          toast({
            title: "Auto-login failed",
            description: "Please sign in manually",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Dev mode",
            description: "Auto-logged in as admin",
          });
        }
      }
    };

    if (import.meta.env.DEV) {
      autoLogin();
    }
  }, []);
}
