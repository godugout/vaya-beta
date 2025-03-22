
import { useState, useRef, useEffect } from 'react';

interface UseAudioPlaybackProps {
  audioBlob: Blob | null;
  onComplete?: () => void;
}

interface UseAudioPlaybackReturn {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  togglePlayback: () => void;
  seekTo: (time: number) => void;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useAudioPlayback({ 
  audioBlob, 
  onComplete 
}: UseAudioPlaybackProps = { audioBlob: null }): UseAudioPlaybackReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  
  // Set up audio element when blob changes
  useEffect(() => {
    if (!audioBlob) {
      if (audioRef.current) {
        audioRef.current = null;
      }
      return;
    }
    
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
      
      if (onComplete) {
        onComplete();
      }
    });
    
    audioRef.current = audio;
    
    return () => {
      URL.revokeObjectURL(audioUrl);
      audio.pause();
      audio.src = '';
    };
  }, [audioBlob, onComplete]);
  
  // Toggle play/pause
  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      
      // Update time and progress periodically
      intervalRef.current = window.setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          setProgress(audioRef.current.currentTime / audioRef.current.duration * 100);
        }
      }, 100);
    }
  };
  
  // Seek to a specific time
  const seekTo = (time: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = time;
    setCurrentTime(time);
    setProgress(time / duration * 100);
  };
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return {
    isPlaying,
    currentTime,
    duration,
    progress,
    togglePlayback,
    seekTo,
    setIsPlaying
  };
}
