
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mic, Hourglass } from "lucide-react";
import { HeroPattern } from "./HeroPattern";

interface HomeHeroProps {
  isSpanish: boolean;
}

const HomeHero = ({ isSpanish }: HomeHeroProps) => {
  const content = {
    title: isSpanish 
      ? "Nuestra Historia, Nuestra Voz" 
      : "Our Story, Our Voice",
    subtitle: isSpanish 
      ? "Preserva los momentos más preciosos de tu familia con cápsulas digitales que capturan historias, tradiciones y memorias para las generaciones futuras."
      : "Preserve your family's most precious moments with digital capsules that capture stories, traditions, and memories for future generations.",
    primaryCta: isSpanish ? "Comparte Tu Historia" : "Share Your Story",
    secondaryCta: isSpanish ? "Crea Una Cápsula Familiar" : "Create a Family Capsule"
  };

  return (
    <div className="relative min-h-[80vh] w-full flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/30" />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        <HeroPattern />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 lg:px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-white mb-4 leading-tight drop-shadow-lg">
            {content.title}
          </h1>
          <p className="font-inter text-base md:text-lg leading-relaxed text-white/95 mb-8 max-w-xl mx-auto drop-shadow-md">
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button 
              id="hero-home-primary-cta"
              size="lg" 
              variant="stories"
              className="w-full sm:w-auto font-outfit text-base px-6 py-5 h-auto bg-vaya-stories hover:bg-vaya-stories/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <span>{content.primaryCta}</span>
              <Mic className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              id="hero-home-secondary-cta"
              size="lg" 
              variant="capsules"
              className="w-full sm:w-auto font-outfit text-base px-6 py-5 h-auto bg-vaya-capsules hover:bg-vaya-capsules/90 text-white transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <span>{content.secondaryCta}</span>
              <Hourglass className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeHero;
