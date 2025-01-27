import { ArrowRight, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CtaConfig {
  text: string;
  icon: JSX.Element;
}

interface HeroConfig {
  title_en: string;
  title_es: string;
  subtitle_en: string;
  subtitle_es: string;
  primaryCta: CtaConfig;
  secondaryCta?: CtaConfig;
}

const heroConfigs: Record<string, HeroConfig> = {
  "/": {
    title_en: "Share Your Stories",
    title_es: "Descubre, comparte y atesora los momentos más significativos de tu familia",
    subtitle_en: "Create digital time capsules to share your family's stories, traditions, and precious moments with loved ones.",
    subtitle_es: "Vaya transforma tus recuerdos en cápsulas digitales llenas de vida, tradiciones y amor. Crea, guarda y revive historias únicas con herramientas fáciles de usar y asistencia inteligente. Dale voz y color a tus memorias para que vivan por siempre.",
    primaryCta: {
      text: "Start Your Family Collection",
      icon: <ArrowRight className="ml-2 h-4 w-4" />,
    },
    secondaryCta: {
      text: "Learn more",
      icon: <ArrowRight className="ml-2 h-4 w-4" />,
    }
  },
  "/share-stories": {
    title_en: "Capture Special Moments",
    title_es: "Captura Momentos Especiales",
    subtitle_en: "Record stories, share photos, or create video memories of your family's journey. Every story strengthens our cultural bonds.",
    subtitle_es: "Graba historias, comparte fotos o crea recuerdos en video del viaje de tu familia. Cada historia fortalece nuestros lazos culturales.",
    primaryCta: {
      text: "Start Recording",
      icon: <Mic className="ml-2 h-4 w-4" />,
    }
  }
};

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
    <div className="relative overflow-hidden bg-white py-24">
      {/* Nature-inspired Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, #FEF7CD 1%, transparent 1.5%),
            radial-gradient(circle at 50% 50%, #F2FCE2 1%, transparent 1.5%)
          `,
          backgroundSize: '3rem 3rem',
          backgroundPosition: '0 0, 1.5rem 1.5rem',
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, #FEC6A1 1%, transparent 1.5%),
            radial-gradient(circle at 50% 50%, #0EA5E9 1%, transparent 1.5%)
          `,
          backgroundSize: '4rem 4rem',
          backgroundPosition: '2rem 2rem, 0 0',
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="font-outfit font-bold text-4xl tracking-tight text-gray-900 sm:text-6xl mb-6 leading-tight">
            {isSpanish ? config.title_es : config.title_en}
          </h1>
          <p className="font-inter text-lg leading-8 text-gray-600 mb-10">
            {isSpanish ? config.subtitle_es : config.subtitle_en}
          </p>
          <div className="flex items-center justify-center gap-x-6">
            <Button 
              size="lg" 
              className="bg-vaya-primary hover:bg-vaya-primary/90 text-white transition-all duration-300 font-outfit text-base"
            >
              {config.primaryCta.text}
              {config.primaryCta.icon}
            </Button>
            {config.secondaryCta && (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-vaya-primary text-vaya-primary hover:bg-vaya-primary/10 font-outfit text-base"
              >
                {config.secondaryCta.text}
                {config.secondaryCta.icon}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;