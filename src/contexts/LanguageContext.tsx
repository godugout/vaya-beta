import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

type LanguageContextType = {
  isSpanish: boolean;
  setLanguagePreference: (language: string) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [isSpanish, setIsSpanish] = useState(true);

  useEffect(() => {
    const fetchUserLanguage = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setIsSpanish(true);
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('preferred_language')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error) throw error;
        if (profile) {
          setIsSpanish(profile.preferred_language === 'es');
        }
      } catch (error) {
        console.error('Error fetching language preference:', error);
        toast({
          title: "Error fetching language preference",
          description: "Using default language settings",
          variant: "destructive",
        });
      }
    };

    fetchUserLanguage();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        const { data: profile } = await supabase
          .from('profiles')
          .select('preferred_language')
          .eq('id', session?.user.id)
          .maybeSingle();
        
        if (profile) {
          setIsSpanish(profile.preferred_language === 'es');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const setLanguagePreference = async (language: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to change language preferences",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ preferred_language: language })
        .eq('id', session.user.id);

      if (error) throw error;

      setIsSpanish(language === 'es');
      toast({
        title: "Language Updated",
        description: "Your language preference has been saved.",
      });
    } catch (error) {
      console.error('Error updating language:', error);
      toast({
        title: "Error",
        description: "Failed to update language preference",
        variant: "destructive",
      });
    }
  };

  return (
    <LanguageContext.Provider value={{ isSpanish, setLanguagePreference }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}