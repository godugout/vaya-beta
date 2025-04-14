
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AudioPreviewProps {
  audioBlob: Blob;
  className?: string;
  disabled?: boolean;
}

const AudioPreview = ({ audioBlob, className, disabled = false }: AudioPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = useRef<string | null>(null);
  
  // Create audio element and URL when blob changes
  useEffect(() => {
    if (!audioBlob) return;
    
    setLoading(true);
    
    // Create object URL for the audio blob
    audioUrl.current = URL.createObjectURL(audioBlob);
    
    // Create audio element
    const audio = new Audio(audioUrl.current);
    audioRef.current = audio;
    
    // Set up event handlers
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
      setLoading(false);
    });
    
    audio.addEventListener('timeupdate', () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
      audio.currentTime = 0;
    });
    
    audio.addEventListener('error', (e) => {
      console.error('Audio playback error:', e);
      setLoading(false);
    });
    
    return () => {
      // Clean up
      audio.pause();
      audio.src = '';
      if (audioUrl.current) {
        URL.revokeObjectURL(audioUrl.current);
        audioUrl.current = null;
      }
    };
  }, [audioBlob]);
  
  // Toggle play/pause
  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('Error playing audio:', err));
    }
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full flex-shrink-0"
        onClick={togglePlayback}
        disabled={loading || disabled}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 ml-0.5" />
        )}
      </Button>
      
      <div className="flex-1 space-y-1">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gray-500 dark:bg-gray-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        {!loading && (
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{formatTime((progress / 100) * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPreview;
