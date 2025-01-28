import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { heroConfigs } from "@/config/heroConfigs";
import { HeroPattern } from "./hero/HeroPattern";
import { HeroContent } from "./hero/HeroContent";

const Hero = () => {
  const location = useLocation();
  const [isSpanish, setIsSpanish] = useState(true);

  useEffect(() => {
    const fetchUserLanguage = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('preferred_language')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setIsSpanish(profile.preferred_language === 'es');
        }
      }
    };

    fetchUserLanguage();
  }, []);

  const config = heroConfigs[location.pathname as keyof typeof heroConfigs] || heroConfigs["/"];

  return (
    <div 
      className={`relative overflow-hidden py-24 ${
        location.pathname.includes('family-capsules') 
          ? 'bg-vaya-capsules text-white' 
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