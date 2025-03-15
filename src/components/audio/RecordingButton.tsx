
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
      {/* Cosmic glow effect */}
      <motion.div 
        className={cn(
          "absolute inset-0 rounded-full blur-md",
          isRecording ? "bg-blue-400" : "bg-indigo-500"
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
            ? "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500" 
            : "bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600"
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
      
      {/* Cosmic particles */}
      {isRecording && (
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-300"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0 
              }}
              animate={{ 
                x: (Math.random() - 0.5) * 80, 
                y: (Math.random() - 0.5) * 80, 
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0]
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
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordingButton;
