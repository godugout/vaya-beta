import { ArrowRight, Mic, Image, Users } from "lucide-react";
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
    title: "Preserve Your Legacy",
    subtitle: "Create digital time capsules to preserve and share your most precious memories with loved ones. Capture moments, stories, and experiences for future generations.",
    primaryCta: {
      text: "Create Your First Capsule",
      icon: <ArrowRight className="ml-2 h-4 w-4" />,
    },
    secondaryCta: {
      text: "Explore Memories",
      icon: <ArrowRight className="ml-2 h-4 w-4" />,
    }
  },
  "/memory-lane": {
    title: "Walk Down Memory Lane",
    subtitle: "Revisit and relive your cherished memories through photos, videos, and stories.",
    primaryCta: {
      text: "Start Recording",
      icon: <Mic className="ml-2 h-4 w-4" />,
    }
  },
  "/family-tree": {
    title: "Connect Your Family Story",
    subtitle: "Build and maintain your family tree, connecting memories to the people who matter most.",
    primaryCta: {
      text: "Build Your Tree",
      icon: <Users className="ml-2 h-4 w-4" />,
    }
  },
  "/capsules": {
    title: "Digital Time Capsules",
    subtitle: "Create and customize digital time capsules with photos, videos, audio recordings, and written memories.",
    primaryCta: {
      text: "Create Capsule",
      icon: <Image className="ml-2 h-4 w-4" />,
    }
  }
};

const Hero = () => {
  const location = useLocation();
  const config = heroConfigs[location.pathname as keyof typeof heroConfigs] || heroConfigs["/"];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-vaya-green py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {config.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {config.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-vaya-orange hover:bg-orange-600 transition-all duration-300">
              {config.primaryCta.text}
              {config.primaryCta.icon}
            </Button>
            {config.secondaryCta && (
              <Button size="lg" variant="outline">
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