
import React from "react";
import { motion } from "framer-motion";

const HanumanBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-hanuman-dark">
        <div className="absolute inset-0 opacity-15">
          <img 
            src="/lovable-uploads/5b62d353-1780-4d72-8790-0ba3b7d85e21.png" 
            alt="Hanuman background" 
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-hanuman-dark/90 to-hanuman-dark/70"></div>
      
      {/* Cosmic dust */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Subtle glow spots */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-hanuman-orange/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-hanuman-gold/5 blur-3xl rounded-full"></div>
      
      {/* Sacred geometry patterns (subtle) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2720%27%20height%3D%2720%27%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M0%200h20v20H0V0zm10%2010L0%2020h20L10%2010zm0%200L20%200H0l10%2010z%27%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.02%27%20fill-rule%3D%27evenodd%27%2F%3E%3C%2Fsvg%3E')] opacity-30"></div>
    </div>
  );
};

export default HanumanBackground;
