
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Heart, HelpCircle, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useActivityTracking } from "@/hooks/useActivityTracking";
import { ActivityTypes } from "@/hooks/useActivityTracking";
import { FadeIn } from '@/components/animation/FadeIn';
import { Memory as MemoryType } from '@/components/memory/types';

interface MemoryProps {
  memory: MemoryType;
  onPrevious?: () => void;
  onNext?: () => void;
  onReaction?: (memoryId: string, reaction: 'like' | 'heart' | 'confused') => void;
  onRecord?: (memoryId: string) => void;
  simpleMode?: boolean;
}

const Memory = ({
  memory,
  onPrevious,
  onNext,
  onReaction,
  onRecord,
  simpleMode = false
}: MemoryProps) => {
  const { toast } = useToast();
  const { trackActivity } = useActivityTracking();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReadingCaption, setIsReadingCaption] = useState(false);
  
  const handleReaction = (reaction: 'like' | 'heart' | 'confused') => {
    if (onReaction) {
      onReaction(memory.id, reaction);
    }
    
    trackActivity(ActivityTypes.MEMORY_REACTION, {
      memoryId: memory.id,
      reaction,
      type: memory.type
    });
    
    toast({
      title: reaction === 'confused' ? "We'll help you with this" : "Response recorded",
      description: reaction === 'confused' 
        ? "Your family has been notified that you need help with this memory." 
        : "Thank you for your response!",
      variant: reaction === 'confused' ? "destructive" : "default"
    });
  };
  
  const handlePlayAudio = () => {
    if (memory.type !== 'story' || !memory.content_url) return;
    
    setIsPlaying(true);
    
    // In a real implementation, we would play the audio from content_url
    // For this example, we'll just simulate playing for 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
    
    trackActivity(ActivityTypes.MEMORY_PLAYBACK, {
      memoryId: memory.id,
      type: memory.type
    });
  };
  
  const handleReadCaption = () => {
    setIsReadingCaption(true);
    
    // In a real implementation, we would use the Web Speech API to read the caption
    // For this example, we'll just simulate reading for 3 seconds
    setTimeout(() => {
      setIsReadingCaption(false);
    }, 3000);
    
    trackActivity(ActivityTypes.MEMORY_CAPTION_READ, {
      memoryId: memory.id,
      type: memory.type
    });
  };
  
  const handleRecordResponse = () => {
    if (onRecord) {
      onRecord(memory.id);
    }
  };
  
  return (
    <FadeIn>
      <Card className={`overflow-hidden ${simpleMode ? 'border-2 border-hanuman-orange' : 'shadow-lg'}`}>
        <CardContent className="p-0">
          <div className="relative">
            {/* Memory Content */}
            <div className="aspect-video bg-gray-900 relative">
              {memory.type === 'photo' && memory.photo_url && (
                <img 
                  src={memory.photo_url} 
                  alt={memory.title || 'Memory photo'} 
                  className="w-full h-full object-cover"
                />
              )}
              
              {memory.type === 'story' && (
                <div className="absolute inset-0 flex items-center justify-center bg-hanuman-primary/20">
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm p-8"
                    onClick={handlePlayAudio}
                    disabled={isPlaying}
                  >
                    {isPlaying ? (
                      <Loader className="h-12 w-12 animate-spin text-white" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 text-white">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                      </svg>
                    )}
                  </Button>
                </div>
              )}
              
              {/* Navigation Arrows */}
              {onPrevious && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
                  onClick={onPrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                  <span className="sr-only">Previous memory</span>
                </Button>
              )}
              
              {onNext && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
                  onClick={onNext}
                >
                  <ChevronRight className="h-8 w-8" />
                  <span className="sr-only">Next memory</span>
                </Button>
              )}
            </div>
            
            {/* Memory Details */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{memory.title || 'Untitled Memory'}</h3>
                  {memory.description && (
                    <div className="flex items-center mt-1">
                      <p className="text-gray-600 dark:text-gray-400">{memory.description}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-2"
                        onClick={handleReadCaption}
                        disabled={isReadingCaption}
                      >
                        <Volume2 className={`h-4 w-4 ${isReadingCaption ? 'animate-pulse text-hanuman-primary' : ''}`} />
                        <span className="sr-only">Read aloud</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Reactions */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <Button 
                  variant="secondary" 
                  className="flex flex-col py-6 hover:bg-hanuman-primary/10"
                  onClick={() => handleReaction('like')}
                >
                  <ThumbsUp className="h-8 w-8 mb-2" />
                  <span className="text-sm">I Like This</span>
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="flex flex-col py-6 hover:bg-hanuman-primary/10"
                  onClick={() => handleReaction('heart')}
                >
                  <Heart className="h-8 w-8 mb-2" />
                  <span className="text-sm">Love This</span>
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="flex flex-col py-6 hover:bg-hanuman-primary/10"
                  onClick={() => handleReaction('confused')}
                >
                  <HelpCircle className="h-8 w-8 mb-2" />
                  <span className="text-sm">Need Help</span>
                </Button>
              </div>
              
              {/* Record Response */}
              <Button
                variant="default"
                className="w-full py-6 text-lg font-medium bg-hanuman-primary hover:bg-hanuman-primary/90"
                onClick={handleRecordResponse}
              >
                <Mic className="h-6 w-6 mr-2" />
                Record My Story About This
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default Memory;
