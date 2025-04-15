
import { useState } from "react";

export const useAudioPlayback = (audioBlob: Blob | null) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const startPlayback = () => {
    if (!audioBlob) return;
    
    const url = URL.createObjectURL(audioBlob);
    const audio = new Audio(url);
    
    audio.onended = () => {
      setIsPlaying(false);
      URL.revokeObjectURL(url);
    };
    
    audio.play();
    setIsPlaying(true);
    
    // Haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const stopPlayback = () => {
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (!audioBlob) return;
    
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  return {
    isPlaying,
    togglePlayback,
    startPlayback,
    stopPlayback,
    setIsPlaying
  };
};
