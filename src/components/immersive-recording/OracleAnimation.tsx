
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "@/components/animation/AnimationProvider";

interface OracleAnimationProps {
  isRecording: boolean;
  volume?: number;
  duration?: number;
}

const OracleAnimation = ({ 
  isRecording, 
  volume = 0, 
  duration = 0 
}: OracleAnimationProps) => {
  const { isReduced } = useAnimation();
  const animationRef = useRef<HTMLDivElement>(null);
  
  // Adjust animation complexity based on recording state and volume
  useEffect(() => {
    if (!animationRef.current || isReduced) return;
    
    // The animation intensity could be adjusted here based on volume
    const intensity = isRecording ? Math.min(0.5 + volume * 1.5, 1) : 0.5;
    
    // Apply intensity to animation elements
    const elements = animationRef.current.querySelectorAll('.particle');
    elements.forEach((el) => {
      (el as HTMLElement).style.setProperty('--intensity', intensity.toString());
    });
  }, [isRecording, volume, isReduced]);

  // Reduced motion version is a simple pulsing circle
  if (isReduced) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <motion.div
          animate={{
            scale: isRecording ? [1, 1.1, 1] : 1,
            opacity: isRecording ? [0.8, 1, 0.8] : 0.8,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-purple-600 to-blue-500"
        />
      </div>
    );
  }

  // Full animation with particles
  return (
    <div 
      ref={animationRef} 
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
    >
      {/* Central orb */}
      <motion.div
        animate={{
          scale: isRecording ? [1, 1.05, 1] : 1,
          boxShadow: isRecording 
            ? [
                "0 0 20px 10px rgba(107, 92, 231, 0.4)", 
                "0 0 35px 15px rgba(107, 92, 231, 0.6)", 
                "0 0 20px 10px rgba(107, 92, 231, 0.4)"
              ] 
            : "0 0 20px 10px rgba(107, 92, 231, 0.4)"
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute z-10 w-24 h-24 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-indigo-600 via-purple-500 to-violet-600 opacity-90"
      />
      
      {/* Inner ring */}
      <motion.div
        animate={{
          rotate: 360,
          scale: isRecording ? [1, 1.03, 1] : 1,
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="absolute z-0 w-32 h-32 md:w-56 md:h-56 rounded-full border-4 border-indigo-500/30 flex items-center justify-center"
      >
        {/* Particles along inner ring */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`inner-${i}`}
            className="particle absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-indigo-400"
            style={{
              left: "50%",
              top: "50%",
              transform: `rotate(${i * 30}deg) translateX(calc(16px + 50% - 4px)) translateY(-50%)`,
            }}
            animate={{
              scale: isRecording ? [1, 1.5, 1] : [1, 1.2, 1],
              opacity: isRecording ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 1.5 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      
      {/* Outer ring */}
      <motion.div
        animate={{
          rotate: -360,
          scale: isRecording ? [1, 1.02, 1] : 1,
        }}
        transition={{
          rotate: {
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="absolute z-0 w-48 h-48 md:w-80 md:h-80 rounded-full border-2 border-blue-500/20"
      >
        {/* Particles along outer ring */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={`outer-${i}`}
            className="particle absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-blue-400"
            style={{
              left: "50%",
              top: "50%",
              transform: `rotate(${i * 22.5}deg) translateX(calc(24px + 50% - 2px)) translateY(-50%)`,
            }}
            animate={{
              scale: isRecording ? [1, 2, 1] : [1, 1.5, 1],
              opacity: isRecording ? [0.5, 0.9, 0.5] : [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + (i % 4),
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      
      {/* Energy streams */}
      {isRecording && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`stream-${i}`}
              className="particle absolute w-1 h-12 md:h-24 origin-bottom"
              style={{
                left: "50%",
                bottom: "50%",
                transform: `translateX(-50%) rotate(${i * 72}deg)`,
                background: `linear-gradient(to top, ${i % 2 === 0 ? 'rgba(102, 126, 234, 0.8)' : 'rgba(159, 122, 234, 0.8)'}, transparent)`,
                borderRadius: "4px",
              }}
              animate={{
                height: [(i % 2 === 0 ? 60 : 80), (i % 2 === 0 ? 100 : 120), (i % 2 === 0 ? 60 : 80)],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2 + (i * 0.5),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
      
      {/* Duration indicator */}
      {duration > 0 && (
        <motion.div
          className="absolute bottom-[-40px] left-0 right-0 text-center text-white text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          {Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, '0')}
        </motion.div>
      )}
    </div>
  );
};

export default OracleAnimation;
