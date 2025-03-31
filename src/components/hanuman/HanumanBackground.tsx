
import React from 'react';
import { motion } from 'framer-motion';

const HanumanBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Dark cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-hanuman-dark to-hanuman-bg-dark"></div>
      
      {/* Subtle sacred pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none backdrop-pattern"></div>
      
      {/* Animated stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              height: Math.random() * 2 + 1,
              width: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 5,
              ease: "easeInOut", // Changed from "ease-in-out" to "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Cosmic light effects */}
      <div className="absolute top-0 left-[20%] w-[30%] h-[20%] bg-hanuman-gold/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 right-[10%] w-[40%] h-[30%] bg-hanuman-orange/5 blur-[100px] rounded-full"></div>
      <div className="absolute top-[30%] right-[5%] w-[15%] h-[20%] bg-hanuman-green/5 blur-[80px] rounded-full"></div>
    </div>
  );
};

export default HanumanBackground;
