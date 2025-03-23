
import React from "react";
import { motion } from "framer-motion";

const HanumanBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Main background image with overlay */}
      <div className="absolute inset-0 bg-hanuman-dark">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/lovable-uploads/dbfde90d-4253-4295-b1e9-e9bb049cd9cd.png" 
            alt="Hanuman background" 
            className="w-full h-full object-cover scale-105"
          />
        </div>
        
        {/* Gradient overlays for depth and atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-hanuman-primary/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-hanuman-saffron/20 via-transparent to-hanuman-cosmic-purple/10"></div>
        
        {/* Animated particles and lights */}
        <motion.div 
          className="absolute top-[20%] left-[15%] w-64 h-64 rounded-full bg-hanuman-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-[10%] right-[20%] w-80 h-80 rounded-full bg-hanuman-gold/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Sacred geometric pattern overlay */}
        <div className="absolute inset-0 bg-repeat opacity-5" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23FFD700' stroke-width='1'%3E%3Ccircle cx='40' cy='40' r='36'/%3E%3Ccircle cx='40' cy='40' r='28'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Cpath d='M40 4 L40 76 M4 40 L76 40 M11.7 11.7 L68.3 68.3 M11.7 68.3 L68.3 11.7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }} 
        />
        
        {/* Star-like dots */}
        <div className="absolute inset-0" 
          style={{ 
            backgroundImage: `radial-gradient(1px 1px at 10% 10%, rgba(255, 255, 255, 0.15) 0%, transparent 100%),
                              radial-gradient(1px 1px at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 100%),
                              radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 100%),
                              radial-gradient(1px 1px at 70% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 100%),
                              radial-gradient(1px 1px at 90% 90%, rgba(255, 255, 255, 0.15) 0%, transparent 100%)`,
            backgroundSize: '150px 150px'
          }}
        />
        
        {/* Bottom cosmic decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-hanuman-primary/10 to-transparent"></div>
      </div>
    </div>
  );
};

export default HanumanBackground;
