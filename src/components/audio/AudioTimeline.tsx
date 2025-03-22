
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AudioTimelineProps {
  audioBlob: Blob | null;
  isPlaying: boolean;
}

const AudioTimeline = ({ audioBlob, isPlaying }: AudioTimelineProps) => {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (!audioBlob) return;
    
    const url = URL.createObjectURL(audioBlob);
    const audio = new Audio(url);
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    });
    
    audio.addEventListener('ended', () => {
      setCurrentTime(0);
      setProgress(0);
    });
    
    setAudioElement(audio);
    
    return () => {
      URL.revokeObjectURL(url);
      audio.pause();
      audio.src = '';
    };
  }, [audioBlob]);
  
  // Control playback based on isPlaying prop
  useEffect(() => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.play().catch(console.error);
    } else {
      audioElement.pause();
    }
  }, [isPlaying, audioElement]);
  
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <div className="w-full space-y-2">
      <div className="relative h-2 bg-gray-200 rounded overflow-hidden">
        <motion.div 
          className="absolute h-full bg-vaya-secondary"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioTimeline;
