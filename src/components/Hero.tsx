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
    title: "Share Your Story",
    subtitle: "Record and preserve your precious memories with Narra, your friendly AI storytelling assistant",
    primaryCta: {
      text: "Start Recording",
      icon: <ArrowRight className="ml-2 h-4 w-4" />,
    },
    secondaryCta: {
      text: "Learn more",
      icon: <ArrowRight className="ml-2 h-4 w-4" />,
    }
  },
  "/memory-lane": {
    title: "Let's Create Some Memories",
    subtitle: "Chat with Narra, your AI storytelling companion, and record stories that matter",
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
    <div className="relative overflow-hidden bg-gradient-to-b from-vaya-green/10 to-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
              className="bg-vaya-purple hover:bg-vaya-purple/90 text-white transition-all duration-300 font-outfit text-base"
            >
              {config.primaryCta.text}
              {config.primaryCta.icon}
            </Button>
            {config.secondaryCta && (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-vaya-purple text-vaya-purple hover:bg-vaya-purple/10 font-outfit text-base"
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