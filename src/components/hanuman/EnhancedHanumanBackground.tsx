
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StarParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

const EnhancedHanumanBackground: React.FC = () => {
  const [stars, setStars] = useState<StarParticle[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Generate stars for the cosmic background
  useEffect(() => {
    const generateStars = () => {
      const newStars: StarParticle[] = [];
      const colors = [
        "rgba(255, 255, 255, 0.8)",
        "rgba(255, 215, 0, 0.6)",
        "rgba(255, 126, 0, 0.6)",
        "rgba(255, 110, 150, 0.5)"
      ];

      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 0.5 + Math.random() * 2.5,
          opacity: 0.1 + Math.random() * 0.9,
          duration: 3 + Math.random() * 7,
          delay: Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setStars(newStars);
      setLoaded(true);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base background image with subtle glow */}
      <div className="absolute inset-0">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="w-full h-full"
        >
          <img 
            src="/lovable-uploads/dbfde90d-4253-4295-b1e9-e9bb049cd9cd.png" 
            alt="Hanuman background" 
            className="w-full h-full object-cover md:object-cover md:object-top scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </motion.div>
      </div>

      {/* Stars and cosmic particles */}
      <div className="absolute inset-0">
        {loaded && stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 1.5, star.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Animated light rays */}
      <motion.div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-3/4 bg-gradient-to-b from-hanuman-gold/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.3, 0.1, 0.3, 0],
          rotateZ: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: "loop"
        }}
      />

      {/* Cosmic nebula effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-1/2 h-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 126, 0, 0.12) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-2/3 h-2/3 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      {/* Sacred geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='none' stroke='%23FFD700' stroke-width='0.5' d='M50 0 L100 50 L50 100 L0 50 Z M50 10 L90 50 L50 90 L10 50 Z M50 20 L80 50 L50 80 L20 50 Z M50 30 L70 50 L50 70 L30 50 Z'/%3E%3C/svg%3E")`,
            backgroundSize: '400px 400px',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 240,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Static gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-hanuman-primary/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-hanuman-cosmic-blue/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-hanuman-cosmic-purple/10 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-hanuman-saffron/30 to-transparent"></div>
    </div>
  );
};

export default EnhancedHanumanBackground;
