
import { useState, useEffect } from 'react';

interface UseAudioPlaybackReturn {
  isPlaying: boolean;
  togglePlayback: () => void;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useAudioPlayback(audioBlob: Blob | null): UseAudioPlaybackReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  // Create or update audio element when blob changes
  useEffect(() => {
    if (!audioBlob) {
      setAudioElement(null);
      return;
    }
    
    const url = URL.createObjectURL(audioBlob);
    const audio = new Audio(url);
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    
    setAudioElement(audio);
    
    return () => {
      URL.revokeObjectURL(url);
      audio.pause();
      audio.src = '';
    };
  }, [audioBlob]);
  
  // Control audio playback
  const togglePlayback = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
    }
  };
  
  // Update playback state when audio changes
  useEffect(() => {
    if (!audioElement) return;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    
    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);
    audioElement.addEventListener('ended', handleEnded);
    
    return () => {
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [audioElement]);
  
  return {
    isPlaying,
    togglePlayback,
    setIsPlaying
  };
}
