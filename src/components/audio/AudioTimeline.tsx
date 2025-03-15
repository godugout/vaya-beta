
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AudioTimelineProps {
  audioBlob: Blob | null;
  isPlaying: boolean;
}

const AudioTimeline = ({ audioBlob, isPlaying }: AudioTimelineProps) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
      
      return () => {
        URL.revokeObjectURL(audioUrl);
        audio.remove();
      };
    }
  }, [audioBlob]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      intervalRef.current = window.setInterval(() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime / audioRef.current.duration * 100);
        }
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full space-y-1">
      <div className="h-3 bg-vaya-gray-100 rounded-full overflow-hidden backdrop-blur-sm relative">
        {/* Organic background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-vaya-gray-100 to-vaya-gray-200 backdrop-blur-sm" />
        
        {/* Organic progress indicator */}
        <motion.div 
          className="h-full relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-vaya-capsules to-vaya-stories" />
          
          {/* Animated wave effect on top of progress bar */}
          <svg className="absolute inset-0" width="100%" height="100%" preserveAspectRatio="none">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6C5CE7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#74B9FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF7675" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            <motion.path
              d="M0,8 Q5,5 10,8 T20,8 T30,8 T40,8 T50,8"
              fill="url(#progressGradient)"
              animate={{
                d: [
                  "M0,8 Q5,5 10,8 T20,8 T30,8 T40,8 T50,8",
                  "M0,8 Q5,11 10,8 T20,8 T30,8 T40,8 T50,8",
                  "M0,8 Q5,5 10,8 T20,8 T30,8 T40,8 T50,8"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />
          </svg>
        </motion.div>
        
        {/* Animated dot at the end of progress */}
        {progress > 0 && (
          <motion.div 
            className="absolute top-0 w-3 h-3 rounded-full bg-vaya-stories shadow-lg shadow-vaya-stories/30 -ml-1.5"
            style={{ left: `${progress}%` }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
      
      <div className="flex justify-between text-xs text-vaya-text-secondary font-medium">
        <span>{formatTime(duration * (progress / 100))}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioTimeline;
