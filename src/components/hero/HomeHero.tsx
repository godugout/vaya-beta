
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HomeHeroProps {
  isSpanish: boolean;
}

const HomeHero = ({ isSpanish }: HomeHeroProps) => {
  return (
    <div className="relative min-h-[100vh] w-full bg-white flex flex-col justify-center items-center overflow-hidden">
      {/* Full-bleed background image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjI5MjYyNjI5&dpr=2&h=1080')] bg-cover bg-center"
          style={{ opacity: 0.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/40 dark:from-gray-900/80 dark:to-gray-900/40" />
      </div>
      
      <div className="container relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-4xl mx-auto agencs-hero staggered-fade-in">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isSpanish ? "Preserva," : "Preserve,"}
          </motion.h1>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isSpanish ? "Conecta," : "Connect,"}
          </motion.h1>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {isSpanish ? "Recuerda." : "Remember."}
          </motion.h1>
          
          <motion.div 
            className="flex flex-col items-center justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-autumn hover:bg-autumn/90 text-white font-medium px-8 h-14 text-lg"
            >
              <Link to="/share-stories">
                {isSpanish ? "Empieza a Grabar" : "Start Recording"}
              </Link>
            </Button>
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
