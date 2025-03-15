
import { useState, useEffect, useRef } from "react";

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
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-lovable-magenta transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{formatTime(duration * (progress / 100))}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioTimeline;
