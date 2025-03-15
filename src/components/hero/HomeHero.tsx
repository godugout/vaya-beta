
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, Archive, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HomeHeroProps {
  isSpanish: boolean;
}

const HomeHero = ({ isSpanish }: HomeHeroProps) => {
  return (
    <div className="relative min-h-[90vh] bg-forest-stream">
      <div className="container relative z-10 flex flex-col items-center justify-center h-full pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {isSpanish 
              ? "Preserva la Voz de tu Familia" 
              : "Preserve Your Family's Voice"}
            <br />
            <span className="text-ui-orange">
              {isSpanish ? "Comparte tu Historia" : "Share Your Story"}
            </span>
          </h1>
          
          <p className="text-white text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            {isSpanish
              ? "Vaya te ayuda a capturar, organizar y compartir recuerdos familiares significativos que perduran por generaciones a través de la narración de voz."
              : "Vaya helps you capture, organize, and share meaningful family memories that persist for generations through voice-first storytelling."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/share-stories">
              <Button 
                size="lg" 
                className="bg-ui-orange hover:bg-ui-orange-dark text-white font-medium group w-full sm:w-auto"
              >
                <Mic className="mr-2 h-5 w-5" />
                {isSpanish ? "Empieza a Grabar" : "Start Recording"}
              </Button>
            </Link>
            
            <Link to="/family-capsules">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/20 w-full sm:w-auto"
              >
                <Archive className="mr-2 h-5 w-5" />
                {isSpanish ? "Crea Cápsulas" : "Create Capsules"}
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <a 
            href="#features" 
            className="inline-flex items-center gap-2 text-white hover:text-ui-orange transition-colors"
          >
            <span className="font-medium">
              {isSpanish ? "Descubre Más" : "Discover More"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeHero;
