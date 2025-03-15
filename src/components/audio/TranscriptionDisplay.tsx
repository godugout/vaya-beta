
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
      {/* Organic background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-vaya-gray-50 to-vaya-gray-100 backdrop-blur-sm border border-vaya-gray-200/30 rounded-xl" />
      
      {/* Subtle animated stars/dots - organic decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-vaya-brand-primary/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
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
          className="h-full bg-gradient-to-r from-vaya-brand-primary/0 via-vaya-accent-turquoise/30 to-vaya-brand-primary/0" 
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
      
      <p className="font-story italic relative z-10 text-vaya-text-primary dark:text-vaya-text-secondary text-lg leading-relaxed">{transcription}</p>
    </motion.div>
  );
};

export default TranscriptionDisplay;
