
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
      <div className="h-2 bg-indigo-900/10 rounded-full overflow-hidden backdrop-blur-sm relative">
        {/* Cosmic background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/5 to-purple-900/5 backdrop-blur-sm" />
        
        {/* Water-like progress indicator */}
        <motion.div 
          className="h-full relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-400" />
          
          {/* Animated wave effect on top of progress bar */}
          <svg className="absolute inset-0" width="100%" height="100%" preserveAspectRatio="none">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9b87f5" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D6BCFA" stopOpacity="0.8" />
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
            className="absolute top-0 w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50 -ml-1.5"
            style={{ left: `${progress}%` }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
      
      <div className="flex justify-between text-xs text-indigo-800 dark:text-indigo-200">
        <span>{formatTime(duration * (progress / 100))}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioTimeline;
