
import React, { useState, useEffect } from 'react';
import { EmotionType, EmotionDetectionResult } from './types';
import { EmotionTag } from './EmotionTag';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Edit2, Check } from 'lucide-react';

interface EmotionSelectorProps {
  detectedEmotions: EmotionDetectionResult;
  onEmotionSelect: (emotion: EmotionType) => void;
  selectedEmotion?: EmotionType;
  editable?: boolean;
}

export const EmotionSelector: React.FC<EmotionSelectorProps> = ({
  detectedEmotions,
  onEmotionSelect,
  selectedEmotion,
  editable = true
}) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedEmotionState, setSelectedEmotionState] = useState<EmotionType | undefined>(selectedEmotion);
  
  // Update local state when prop changes
  useEffect(() => {
    setSelectedEmotionState(selectedEmotion);
  }, [selectedEmotion]);
  
  // Get sorted emotions by confidence
  const sortedEmotions = Object.entries(detectedEmotions.confidenceScores)
    .sort(([, a], [, b]) => b - a)
    .map(([emotion]) => emotion as EmotionType);
  
  // Get the top emotion (should be the primary one)
  const topEmotion = sortedEmotions[0];
  
  // Handle emotion selection
  const handleSelect = (emotion: EmotionType) => {
    setSelectedEmotionState(emotion);
    onEmotionSelect(emotion);
    setShowAll(false);
  };
  
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">Detected Emotions:</span>
        
        {editable && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Edit emotions</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3" align="end">
              <div className="space-y-2">
                <p className="text-sm font-medium">Override Emotion</p>
                <div className="flex flex-wrap gap-2">
                  {sortedEmotions.map((emotion) => (
                    <div key={emotion} className="flex items-center gap-1">
                      <EmotionTag
                        emotion={emotion}
                        confidence={detectedEmotions.confidenceScores[emotion]}
                        size="sm"
                        onClick={() => handleSelect(emotion)}
                        selected={selectedEmotionState === emotion}
                      />
                      {selectedEmotionState === emotion && (
                        <Check className="h-3 w-3 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {/* Always show primary/selected emotion */}
        <EmotionTag 
          emotion={selectedEmotionState || topEmotion}
          confidence={detectedEmotions.confidenceScores[selectedEmotionState || topEmotion]}
          size="md"
          selected={true}
        />
        
        {/* Show others if expanded */}
        {showAll && sortedEmotions
          .filter(emotion => emotion !== (selectedEmotionState || topEmotion))
          .map(emotion => (
            <EmotionTag
              key={emotion}
              emotion={emotion}
              confidence={detectedEmotions.confidenceScores[emotion]}
              size="sm"
              onClick={editable ? () => handleSelect(emotion) : undefined}
            />
          ))
        }
        
        {/* Show/hide toggle button */}
        {sortedEmotions.length > 1 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs" 
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
        )}
      </div>
    </div>
  );
};
