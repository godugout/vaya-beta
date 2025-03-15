
import { motion } from "framer-motion";

interface TranscriptionDisplayProps {
  transcription: string | null;
}

const TranscriptionDisplay = ({ transcription }: TranscriptionDisplayProps) => {
  if (!transcription) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-xl overflow-hidden p-6"
    >
      {/* Background effect with brand colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-background-purple/30 to-dark-background-orange/20 backdrop-blur-sm border border-dark-border/30 rounded-xl" />
      
      {/* Subtle animated stars/dots with brand colors */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#FF7675' : i % 3 === 1 ? '#6C5CE7' : '#74B9FF',
              opacity: 0.3,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      {/* Flowing line decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#6C5CE7]/0 via-[#FF7675]/40 to-[#6C5CE7]/0" 
          animate={{
            x: ["-100%", "100%"]
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear"
          }}
        />
      </div>
      
      <p className="font-story italic relative z-10 text-dark-text-primary text-lg leading-relaxed">{transcription}</p>
    </motion.div>
  );
};

export default TranscriptionDisplay;
