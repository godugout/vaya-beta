
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HomeHeroProps {
  isSpanish: boolean;
}

const HomeHero = ({ isSpanish }: HomeHeroProps) => {
  return (
    <div className="relative min-h-[90vh] bg-white flex flex-col justify-center items-center">
      <div className="container relative z-10 flex flex-col items-center justify-center">
        <div className="text-center max-w-4xl mx-auto agencs-hero staggered-fade-in">
          <motion.h1 
            className="text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isSpanish ? "Preserva," : "Preserve,"}
          </motion.h1>
          
          <motion.h1 
            className="text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isSpanish ? "Conecta," : "Connect,"}
          </motion.h1>
          
          <motion.h1 
            className="text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {isSpanish ? "Recuerda." : "Remember."}
          </motion.h1>
          
          <motion.div 
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Link to="/share-stories" className="agencs-btn">
              {isSpanish ? "Empieza a Grabar" : "Start Recording"}
            </Link>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <a 
            href="#features" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
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
