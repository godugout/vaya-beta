
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmotionType } from "@/components/emotion-detection/types";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Edit, 
  Scissors,
  Save,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TranscriptSegment {
  text: string;
  start: number;
  end: number;
  emotion?: EmotionType;
  confidence?: number;
}

interface EmotionalStoryPlayerProps {
  audioUrl: string;
  title?: string;
  transcription?: string;
  transcriptSegments?: TranscriptSegment[];
  emotions?: {
    primary: EmotionType;
    markers: Array<{
      time: number;
      emotion: EmotionType;
      intensity: number;
    }>;
  };
  onEdit?: (type: 'title' | 'trim' | 'enhance', data: any) => void;
  className?: string;
}

export const EmotionalStoryPlayer = ({
  audioUrl,
  title = "Untitled Story",
  transcription,
  transcriptSegments = [],
  emotions,
  onEdit,
  className
}: EmotionalStoryPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState("transcript");
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType | null>(null);
  const [showEditOptions, setShowEditOptions] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // Initialize audio element
  useEffect(() => {
    if (!audioUrl) return;
    
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    // Set initial volume
    audio.volume = volume;
    
    // Set up event listeners
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    
    return () => {
      // Clean up
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, [audioUrl]);
  
  // Handle play/pause
  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Update progress as audio plays
  const updateProgress = () => {
    if (!audioRef.current) return;
    
    setCurrentTime(audioRef.current.currentTime);
    
    // Find the current emotion based on time
    if (emotions?.markers) {
      const currentMarker = emotions.markers
        .sort((a, b) => Math.abs(a.time - audioRef.current!.currentTime) - Math.abs(b.time - audioRef.current!.currentTime))
        .find(marker => Math.abs(marker.time - audioRef.current!.currentTime) < 2);
      
      if (currentMarker) {
        setCurrentEmotion(currentMarker.emotion);
      } else {
        setCurrentEmotion(emotions.primary);
      }
    }
  };
  
  // Handle seeking
  const seek = (time: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newVolume = value[0];
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Handle mute toggle
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
  
  // Skip forward and backward
  const skipForward = () => {
    if (!audioRef.current) return;
    const newTime = Math.min(audioRef.current.currentTime + 10, duration);
    seek(newTime);
  };
  
  const skipBackward = () => {
    if (!audioRef.current) return;
    const newTime = Math.max(audioRef.current.currentTime - 10, 0);
    seek(newTime);
  };
  
  // Format time
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Find current transcript segment
  const getCurrentSegment = () => {
    if (!transcriptSegments.length) return null;
    
    return transcriptSegments.find(
      segment => currentTime >= segment.start && currentTime <= segment.end
    );
  };
  
  // Get color for emotion
  const getEmotionColor = (emotion: EmotionType) => {
    const colors: Record<EmotionType, string> = {
      'joy': 'bg-yellow-500',
      'sadness': 'bg-blue-500',
      'nostalgia': 'bg-purple-500',
      'excitement': 'bg-pink-500',
      'reverence': 'bg-orange-500'
    };
    
    return colors[emotion] || 'bg-gray-500';
  };
  
  // Handle editing actions
  const handleEdit = (type: 'title' | 'trim' | 'enhance') => {
    if (!onEdit) return;
    
    switch (type) {
      case 'title':
        onEdit('title', { currentTitle: title });
        break;
      case 'trim':
        onEdit('trim', { 
          audioUrl, 
          startTime: currentTime, 
          duration 
        });
        break;
      case 'enhance':
        onEdit('enhance', { audioUrl });
        break;
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {title}
            {currentEmotion && (
              <span className={cn(
                "h-2 w-2 rounded-full",
                getEmotionColor(currentEmotion)
              )}></span>
            )}
          </CardTitle>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowEditOptions(!showEditOptions)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress bar with emotion markers */}
        <div className="relative mt-2" ref={progressBarRef}>
          <Progress 
            value={(currentTime / duration) * 100} 
            className="h-2 cursor-pointer"
            onClick={(e) => {
              if (!progressBarRef.current) return;
              
              const rect = progressBarRef.current.getBoundingClientRect();
              const clickPosition = (e.clientX - rect.left) / rect.width;
              seek(clickPosition * duration);
            }}
          />
          
          {/* Emotion markers */}
          {emotions?.markers && emotions.markers.map((marker, i) => (
            <div 
              key={i}
              className={cn(
                "absolute top-0 h-2 w-1.5 -translate-x-1/2 cursor-pointer",
                getEmotionColor(marker.emotion)
              )}
              style={{ 
                left: `${(marker.time / duration) * 100}%`,
                opacity: marker.intensity * 0.7 + 0.3  
              }}
              title={`${marker.emotion} (${formatTime(marker.time)})`}
              onClick={() => seek(marker.time)}
            ></div>
          ))}
        </div>
          
        {/* Time indicator */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        {/* Main playback controls */}
        <div className="flex items-center justify-center space-x-4 my-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={skipBackward}
            className="h-10 w-10"
          >
            <SkipBack className="h-6 w-6" />
          </Button>
          
          <Button 
            onClick={togglePlayback}
            size="icon"
            className={cn(
              "h-12 w-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white"
            )}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-0.5" />
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={skipForward}
            className="h-10 w-10"
          >
            <SkipForward className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Volume control */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="h-8 w-8"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          
          <Slider
            defaultValue={[volume]}
            max={1}
            step={0.01}
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
        
        {/* Transcript and emotions tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="transcript" className="flex-1">Transcript</TabsTrigger>
            <TabsTrigger value="emotions" className="flex-1">Emotions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transcript" className="min-h-[100px] pt-2">
            {transcription ? (
              <div className="text-sm space-y-2">
                {transcriptSegments.length > 0 ? (
                  transcriptSegments.map((segment, i) => (
                    <motion.div
                      key={i}
                      className={cn(
                        "p-2 rounded-lg transition-colors duration-300",
                        currentTime >= segment.start && currentTime <= segment.end 
                          ? "bg-orange-100 dark:bg-orange-900/20" 
                          : "bg-transparent"
                      )}
                      animate={{
                        backgroundColor: currentTime >= segment.start && currentTime <= segment.end 
                          ? "rgb(255, 237, 213)" // Light orange
                          : "transparent"
                      }}
                    >
                      <p className="cursor-pointer" onClick={() => seek(segment.start)}>
                        {segment.text}
                      </p>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatTime(segment.start)} - {formatTime(segment.end)}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p>{transcription}</p>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">
                No transcript available
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="emotions" className="min-h-[100px] pt-2">
            {emotions ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Primary Emotion:</span>
                  <span className={cn(
                    "px-2 py-0.5 text-xs rounded-full text-white",
                    getEmotionColor(emotions.primary)
                  )}>
                    {emotions.primary}
                  </span>
                </div>
                
                <div className="text-sm">
                  <h4 className="font-medium mb-1">Emotional Journey:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {emotions.markers.map((marker, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className={cn(
                          "px-2 py-1 rounded-lg cursor-pointer text-xs text-white flex items-center gap-1",
                          getEmotionColor(marker.emotion)
                        )}
                        style={{ opacity: 0.7 + marker.intensity * 0.3 }}
                        onClick={() => seek(marker.time)}
                      >
                        <span>{marker.emotion}</span>
                        <span className="text-white/80">({formatTime(marker.time)})</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">
                No emotion data available
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Edit options */}
        <AnimatePresence>
          {showEditOptions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="border-t pt-3 mt-2 grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex flex-col py-3 h-auto"
                  onClick={() => handleEdit('title')}
                >
                  <Edit className="h-4 w-4 mb-1" />
                  <span className="text-xs">Edit Title</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex flex-col py-3 h-auto"
                  onClick={() => handleEdit('trim')}
                >
                  <Scissors className="h-4 w-4 mb-1" />
                  <span className="text-xs">Trim Audio</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex flex-col py-3 h-auto"
                  onClick={() => handleEdit('enhance')}
                >
                  <Sparkles className="h-4 w-4 mb-1" />
                  <span className="text-xs">Enhance</span>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
