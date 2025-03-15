
import { Button } from "@/components/ui/button";
import { HeroConfig } from "@/types/hero";
import { motion } from "framer-motion";

interface HeroContentProps {
  config: HeroConfig;
  isSpanish: boolean;
}

export const HeroContent = ({ config, isSpanish }: HeroContentProps) => {
  const title = isSpanish ? config.title_es : config.title_en;
  const subtitle = isSpanish ? config.subtitle_es : config.subtitle_en;

  return (
    <motion.div 
      className="mx-auto max-w-2xl lg:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-heading text-3xl font-bold tracking-tight text-text-dark dark:text-white sm:text-4xl">
        {title}
      </h1>
      <p className="font-accent mt-6 text-xl leading-8 text-text-medium dark:text-gray-300">
        {subtitle}
      </p>
      <div className="mt-10 flex items-center gap-x-4">
        {config.primaryCta && (
          <Button 
            variant="default" 
            className="font-heading whitespace-nowrap bg-ui-orange hover:bg-ui-orange/90 text-white"
          >
            <span>{config.primaryCta.text}</span>
            {config.primaryCta.icon}
          </Button>
        )}
        {config.secondaryCta && (
          <Button 
            variant="outline" 
            className="font-heading whitespace-nowrap border-ui-orange text-ui-orange hover:bg-ui-orange/10"
          >
            <span>{config.secondaryCta.text}</span>
            {config.secondaryCta.icon}
          </Button>
        )}
      </div>
    </motion.div>
  );
};
