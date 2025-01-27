import { ArrowRight, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface CtaConfig {
  text: string;
  icon: JSX.Element;
}

interface HeroConfig {
  title: string;
  subtitle: string;
  primaryCta: CtaConfig;
  secondaryCta?: CtaConfig;
}

const heroConfigs: Record<string, HeroConfig> = {
  "/": {
    title: "Comparte Tus Historias",
    subtitle: "Create digital time capsules to share your family's stories, traditions, and precious moments with loved ones. Keep your cultura alive for generations to come.",
    primaryCta: {
      text: "Start Your Family Collection",
      icon: <ArrowRight className="ml-2 h-4 w-4" />,
    },
    secondaryCta: {
      text: "Learn more",
      icon: <ArrowRight className="ml-2 h-4 w-4" />,
    }
  },
  "/memory-lane": {
    title: "Capture Momentos Especiales",
    subtitle: "Record stories, share photos, or create video memories of your family's journey. Every story strengthens our cultural bonds.",
    primaryCta: {
      text: "Start Recording",
      icon: <Mic className="ml-2 h-4 w-4" />,
    }
  }
};

const Hero = () => {
  const location = useLocation();
  const config = heroConfigs[location.pathname as keyof typeof heroConfigs] || heroConfigs["/"];

  return (
    <div className="relative overflow-hidden bg-white py-24">
      {/* Nature-inspired Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, var(--vaya-accent-yellow) 1%, transparent 1.5%),
            radial-gradient(circle at 50% 50%, var(--vaya-accent-green) 1%, transparent 1.5%)
          `,
          backgroundSize: '3rem 3rem',
          backgroundPosition: '0 0, 1.5rem 1.5rem',
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, var(--vaya-accent-orange) 1%, transparent 1.5%),
            radial-gradient(circle at 50% 50%, var(--vaya-secondary) 1%, transparent 1.5%)
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
          <h1 className="font-outfit font-bold text-4xl tracking-tight text-gray-900 sm:text-6xl mb-6">
            {config.title}
          </h1>
          <p className="font-inter text-lg leading-8 text-gray-600 mb-10">
            {config.subtitle}
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