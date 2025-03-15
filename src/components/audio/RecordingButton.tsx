
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RecordingButtonProps {
  isRecording: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const RecordingButton = ({ isRecording, onClick, disabled }: RecordingButtonProps) => {
  return (
    <div className="relative">
      {/* Organic glow effect with brand colors */}
      <motion.div 
        className={cn(
          "absolute inset-0 rounded-full blur-lg",
          isRecording ? "bg-[#FF7675]" : "bg-[#6C5CE7]"
        )}
        initial={{ opacity: 0.5, scale: 1.2 }}
        animate={{ 
          opacity: isRecording ? [0.6, 0.8, 0.6] : 0.5,
          scale: isRecording ? [1.2, 1.3, 1.2] : 1.2
        }}
        transition={{ 
          duration: 2, 
          repeat: isRecording ? Infinity : 0,
          repeatType: "reverse"
        }}
      />
      
      <Button
        onClick={onClick}
        disabled={disabled}
        size="icon"
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 z-10 relative",
          isRecording 
            ? "bg-gradient-to-r from-[#FF7675] to-[#FFA05A] hover:from-[#FF7675]/90 hover:to-[#FFA05A]/90" 
            : "bg-gradient-to-r from-[#6C5CE7] to-[#8F84EB] hover:from-[#6C5CE7]/90 hover:to-[#8F84EB]/90"
        )}
        aria-label={isRecording ? "Stop Recording" : "Start Recording"}
      >
        <motion.div
          animate={{
            scale: isRecording ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: isRecording ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          {isRecording ? (
            <Square className="h-6 w-6 text-white" />
          ) : (
            <Mic className="h-6 w-6 text-white" />
          )}
        </motion.div>
      </Button>
      
      {/* Organic particles with brand colors */}
      {isRecording && (
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#FF7675]/80"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0 
              }}
              animate={{ 
                x: (Math.random() - 0.5) * 90, 
                y: (Math.random() - 0.5) * 90, 
                opacity: [0, 0.9, 0],
                scale: [0, 1.2, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
              style={{
                top: '50%',
                left: '50%',
                backgroundColor: i % 2 === 0 ? '#FF7675' : '#6C5CE7',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordingButton;
