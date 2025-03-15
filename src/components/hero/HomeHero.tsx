
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mic, Archive } from "lucide-react";

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
    <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* Nature stream background - blurred */}
      <div className="absolute inset-0 nature-bg-blur nature-stream-bg z-patterns">
        <div className="absolute inset-0 bg-white/60 dark:bg-dark-background/60"></div>
      </div>
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-50 z-patterns"></div>
      
      {/* Content container */}
      <div className="relative z-content w-full max-w-6xl mx-auto px-4 lg:px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center backdrop-card p-8 md:p-12 dark:bg-dark-background/30"
        >
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-greystone-green dark:text-white mb-6 leading-tight z-text">
            {content.title}
          </h1>
          <p className="font-handwritten text-xl md:text-2xl leading-relaxed text-greystone-green-60 dark:text-dark-text-secondary mb-10 max-w-xl mx-auto z-text">
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 z-content">
            <Button 
              id="hero-home-primary-cta"
              size="lg" 
              variant="stories"
              className="w-full sm:w-auto font-heading text-base px-8 py-5 h-auto transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <span>{content.primaryCta}</span>
              <Mic className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              id="hero-home-secondary-cta"
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto font-heading text-base px-8 py-5 h-auto border-2 transition-colors duration-200"
            >
              <span>{content.secondaryCta}</span>
              <Archive className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="hidden lg:block absolute bottom-[10%] left-[10%] w-32 h-32 rounded-full bg-greystone-sandstone opacity-20 blur-2xl z-patterns"></div>
        <div className="hidden lg:block absolute top-[20%] right-[10%] w-24 h-24 rounded-full bg-greystone-sandstone-dark opacity-15 blur-xl z-patterns"></div>
      </div>
    </div>
  );
};

export default HomeHero;
