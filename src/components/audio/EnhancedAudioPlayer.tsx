
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Download,
  Share2,
  Repeat
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

interface EnhancedAudioPlayerProps {
  audioUrl: string;
  title: string;
  duration?: number;
  onDownload?: () => void;
  onShare?: () => void;
  className?: string;
}

export const EnhancedAudioPlayer = ({
  audioUrl,
  title,
  duration,
  onDownload,
  onShare,
  className
}: EnhancedAudioPlayerProps) => {
  const { getTouchTargetClass, announceToScreenReader } = useAccessibilityContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration || 0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => {
      setTotalDuration(audio.duration);
      setIsLoading(false);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    audio.addEventListener('loadstart', () => {
      setIsLoading(true);
    });

    return () => {
      audio.pause();
      audio.remove();
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      announceToScreenReader('Audio paused');
    } else {
      audioRef.current.play().catch(console.error);
      announceToScreenReader('Audio playing');
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    const seekTime = value[0];
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    const newVolume = value[0];
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + 15,
      totalDuration
    );
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - 15,
      0
    );
  };

  const changePlaybackRate = () => {
    if (!audioRef.current) return;
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    
    audioRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
    announceToScreenReader(`Playback speed: ${nextRate}x`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          
          {/* Title and Status */}
          <div className="text-center">
            <h3 className="font-medium text-lg mb-1">{title}</h3>
            {isLoading && (
              <div className="text-sm text-gray-500">Loading audio...</div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <Slider
              value={[currentTime]}
              max={totalDuration}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
              aria-label="Audio progress"
            />
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className={getTouchTargetClass()}
              onClick={skipBackward}
              aria-label="Skip back 15 seconds"
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              size="icon"
              className={cn(
                'h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white',
                getTouchTargetClass()
              )}
              onClick={togglePlayPause}
              disabled={isLoading}
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className={getTouchTargetClass()}
              onClick={skipForward}
              aria-label="Skip forward 15 seconds"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center justify-between">
            
            {/* Volume Control */}
            <div className="flex items-center space-x-2 flex-1 max-w-32">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="flex-1"
                aria-label="Volume"
              />
            </div>

            {/* Playback Speed */}
            <Button
              variant="outline"
              size="sm"
              onClick={changePlaybackRate}
              className="font-mono text-xs"
              aria-label={`Change playback speed, currently ${playbackRate}x`}
            >
              {playbackRate}x
            </Button>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              {onShare && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onShare}
                  aria-label="Share audio"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
              
              {onDownload && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDownload}
                  aria-label="Download audio"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
