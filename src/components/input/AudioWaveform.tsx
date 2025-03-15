
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AudioWaveformProps {
  isRecording?: boolean;
  isPlaying?: boolean;
  amplitude?: number;
  color?: string;
  barCount?: number;
  className?: string;
}

export const AudioWaveform = ({
  isRecording = false,
  isPlaying = false,
  amplitude = 0.5,
  color = "currentColor",
  barCount = 40,
  className,
}: AudioWaveformProps) => {
  const [bars, setBars] = useState<number[]>([]);
  
  useEffect(() => {
    // Generate initial bars
    const initialBars = Array.from({ length: barCount }, () => 
      Math.random() * 0.6 * amplitude + 0.2 * amplitude
    );
    setBars(initialBars);
    
    // Animate bars when recording or playing
    let interval: NodeJS.Timeout;
    if (isRecording || isPlaying) {
      interval = setInterval(() => {
        setBars(prev => 
          prev.map(bar => {
            const change = (Math.random() - 0.5) * 0.3 * amplitude;
            const newValue = bar + change;
            return Math.max(0.1, Math.min(1, newValue));
          })
        );
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isPlaying, amplitude, barCount]);

  return (
    <div className={cn("w-full h-16 flex items-center justify-between", className)}>
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="w-1.5 mx-px rounded-full"
          style={{ 
            backgroundColor: color,
            opacity: isRecording || isPlaying ? 1 : 0.5,
          }}
          animate={{
            height: `${height * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.1,
          }}
        />
      ))}
    </div>
  );
};
