
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
    <div className="relative min-h-[90vh] w-full flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-vaya-stories/80 to-vaya-memories/80" />
        <div className="absolute inset-0 bg-black/30" />
        <HeroPattern />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="font-outfit font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-tight">
            {content.title}
          </h1>
          <p className="font-inter text-lg md:text-xl leading-relaxed text-white/90 mb-10 max-w-xl mx-auto">
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button 
              id="hero-home-primary-cta"
              size="lg" 
              variant="stories"
              className="w-full sm:w-auto font-outfit text-lg px-8 py-6 h-auto"
            >
              <span>{content.primaryCta}</span>
              <Mic className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              id="hero-home-secondary-cta"
              size="lg" 
              variant="capsules"
              className="w-full sm:w-auto font-outfit text-lg px-8 py-6 h-auto bg-vaya-capsules text-white hover:bg-vaya-capsules/90"
            >
              <span>{content.secondaryCta}</span>
              <Hourglass className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeHero;
