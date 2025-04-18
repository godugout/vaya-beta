
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useDevAuth() {
  useEffect(() => {
    const autoLogin = async () => {
      try {
        // Check if we already have a session
        const { data: { session } } = await supabase.auth.getSession();
        
        // Only auto-login if there's no existing session
        if (!session) {
          console.log("No session found, attempting dev auto-login...");
          
          // Use a more reliable test account (this one has been confirmed to work)
          const { error } = await supabase.auth.signInWithPassword({
            email: 'test@vaya.family',
            password: 'testpassword123'
          });

          if (error) {
            console.error('Primary login attempt failed:', error.message);
            
            // Try another set of credentials
            const { error: secondError } = await supabase.auth.signInWithPassword({
              email: 'admin@vaya.family',
              password: 'admin123'
            });
            
            if (secondError) {
              console.error('Secondary login attempt failed:', secondError.message);
              
              // Final attempt with dev credentials
              const { error: finalError } = await supabase.auth.signInWithPassword({
                email: 'dev@vaya.family',
                password: 'devpassword123'
              });
              
              if (finalError) {
                console.error('All login attempts failed');
                
                // As a last resort, try to create the test user if it doesn't exist
                const { error: signUpError } = await supabase.auth.signUp({
                  email: 'test@vaya.family',
                  password: 'testpassword123',
                  options: {
                    data: {
                      full_name: 'Test User',
                    },
                  },
                });
                
                if (signUpError) {
                  console.error('Signup attempt also failed:', signUpError.message);
                  toast({
                    title: "Auto-login failed",
                    description: "Please sign in manually with test@vaya.family / testpassword123",
                    variant: "destructive"
                  });
                } else {
                  // Try logging in one more time
                  const { error: retryError } = await supabase.auth.signInWithPassword({
                    email: 'test@vaya.family',
                    password: 'testpassword123'
                  });
                  
                  if (retryError) {
                    toast({
                      title: "Auto-login failed",
                      description: "Please sign in manually with test@vaya.family / testpassword123",
                      variant: "destructive"
                    });
                  } else {
                    toast({
                      title: "Dev mode",
                      description: "Auto-logged in with new test account",
                    });
                  }
                }
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
        } else {
          console.log("User already logged in:", session.user.email);
        }
      } catch (error) {
        console.error('Dev auth error:', error);
      }
    };

    if (import.meta.env.DEV) {
      // Wait a short moment before attempting login
      // This prevents race conditions with other initialization logic
      setTimeout(autoLogin, 500);
    }
  }, []);
}
