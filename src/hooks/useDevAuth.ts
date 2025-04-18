
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useDevAuth() {
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // Only auto-login if there's no existing session
        if (!session) {
          // First try to sign up a test user if they don't exist
          const { error: signUpError } = await supabase.auth.signUp({
            email: 'test@vaya.family',
            password: 'testpassword123',
            options: {
              data: {
                full_name: 'Test User',
              },
            },
          });

          // We don't mind if the sign up fails (user might already exist)
          console.log('Sign up attempt completed', signUpError?.message || 'success');
          
          // Then try to log in with those credentials
          const { error } = await supabase.auth.signInWithPassword({
            email: 'test@vaya.family',
            password: 'testpassword123'
          });

          if (error) {
            console.error('First login attempt failed:', error.message);
            
            // Try another set of credentials
            const { error: adminError } = await supabase.auth.signInWithPassword({
              email: 'admin@vaya.family',
              password: 'admin123'
            });
            
            if (adminError) {
              console.error('Admin login attempt failed:', adminError.message);
              
              // Try yet another set of credentials
              const { error: devError } = await supabase.auth.signInWithPassword({
                email: 'dev@vaya.family',
                password: 'devpassword123'
              });
              
              if (devError) {
                console.error('All login attempts failed');
                toast({
                  title: "Auto-login failed",
                  description: "Please sign in manually with test@vaya.family / testpassword123",
                  variant: "destructive"
                });
              } else {
                toast({
                  title: "Dev mode",
                  description: "Auto-logged in as dev user",
                });
              }
            } else {
              toast({
                title: "Dev mode",
                description: "Auto-logged in as admin",
              });
            }
          } else {
            toast({
              title: "Dev mode",
              description: "Auto-logged in as test user",
            });
          }
        }
      } catch (error) {
        console.error('Dev auth error:', error);
      }
    };

    if (import.meta.env.DEV) {
      autoLogin();
    }
  }, []);
}
