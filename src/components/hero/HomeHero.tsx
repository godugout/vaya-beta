import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mic, Hourglass } from "lucide-react";
import { HeroPattern } from "./HeroPattern";

const HomeHero = () => {
  return (
    <div 
      className="relative overflow-hidden min-h-screen flex items-center" 
      data-component="HomeHero"
    >
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1501854140801-50d01698950b")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-white/75" /> {/* Slightly reduced overlay opacity */}
      </div>
      
      <HeroPattern />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center px-4 sm:px-6"
        >
          <h1 className="font-outfit font-bold text-3xl sm:text-4xl md:text-6xl tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight">
            Nuestra Historia, Nuestra Voz
          </h1>
          <p className="font-inter text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 mb-8 sm:mb-10">
            Preserva los momentos más preciosos de tu familia con cápsulas digitales que capturan historias, tradiciones y memorias para las generaciones futuras.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            <Button 
              id="hero-home-primary-cta"
              size="lg" 
              variant="stories"
              className="w-full sm:w-auto font-outfit"
            >
              <span>Comparte Tu Historia</span>
              <Mic className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              id="hero-home-secondary-cta"
              size="lg" 
              variant="capsules"
              className="w-full sm:w-auto transition-all duration-300 font-outfit bg-vaya-capsules text-white hover:bg-vaya-capsules/90"
            >
              <span>Crea Una Cápsula Familiar</span>
              <Hourglass className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeHero;