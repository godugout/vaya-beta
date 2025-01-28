import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { heroConfigs } from "@/config/heroConfigs";
import { HeroPattern } from "./hero/HeroPattern";
import { HeroContent } from "./hero/HeroContent";
import HomeHero from "./hero/HomeHero";
import { CulturalContent } from "@/types/cultural";
import { toast } from "@/components/ui/use-toast";

interface HeroProps {
  culturalContent?: CulturalContent | null;
}

const Hero = ({ culturalContent }: HeroProps) => {
  const location = useLocation();
  const [isSpanish, setIsSpanish] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserLanguage = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setIsSpanish(true); // Default to Spanish if not authenticated
          setIsLoading(false);
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('preferred_language')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching language preference:', error);
          toast({
            title: "Error fetching language preference",
            description: "Using default language settings",
            variant: "destructive",
          });
          setIsSpanish(true); // Default to Spanish on error
        } else if (profile) {
          setIsSpanish(profile.preferred_language === 'es');
        }
      } catch (error) {
        console.error('Error in fetchUserLanguage:', error);
        setIsSpanish(true); // Default to Spanish on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserLanguage();
  }, []);

  // Subscribe to auth state changes
  useEffect(() => {
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

  // Show a loading state instead of nothing
  if (isLoading) {
    return (
      <div className="relative overflow-hidden py-24 bg-white/90">
        <HeroPattern />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // If we're on the home page, render the HomeHero component
  if (location.pathname === '/') {
    return <HomeHero isSpanish={isSpanish} />;
  }

  const config = heroConfigs[location.pathname as keyof typeof heroConfigs] || heroConfigs["/"];

  return (
    <div 
      className={`relative overflow-hidden py-24 ${
        location.pathname.includes('family-capsules') 
          ? 'bg-vaya-capsules/10 text-vaya-gray-900' 
          : 'bg-white/90'
      }`} 
      data-component="Hero"
    >
      <HeroPattern />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <HeroContent config={config} isSpanish={isSpanish} />
      </div>
    </div>
  );
};

export default Hero;