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

  useEffect(() => {
    const fetchUserLanguage = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          return; // Keep default language if not authenticated
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
          return;
        }

        if (profile) {
          setIsSpanish(profile.preferred_language === 'es');
        }
      } catch (error) {
        console.error('Error in fetchUserLanguage:', error);
        // Keep default language on error
      }
    };

    fetchUserLanguage();
  }, []);

  // If we're on the home page, render the HomeHero component
  if (location.pathname === '/') {
    return <HomeHero culturalContent={culturalContent} />;
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
