
import React, { useState, useEffect } from 'react';
import { EmotionType, EmotionDetectionResult } from './types';
import { detectEmotions, extractAudioFeatures } from './utils/emotionDetection';
import { EmotionSelector } from './EmotionSelector';
import { KeywordHighlight } from './KeywordHighlight';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface EmotionAnalysisSectionProps {
  text: string;
  audioBlob?: Blob | null;
  audioUrl?: string;
  onEmotionChange?: (emotion: EmotionType) => void;
  initialEmotion?: EmotionType;
  className?: string;
}

export const EmotionAnalysisSection: React.FC<EmotionAnalysisSectionProps> = ({
  text,
  audioBlob,
  audioUrl,
  onEmotionChange,
  initialEmotion,
  className = ""
}) => {
  const [emotionResult, setEmotionResult] = useState<EmotionDetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | undefined>(initialEmotion);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Analyze emotions when text or audio changes
  useEffect(() => {
    const analyzeEmotions = async () => {
      if (!text.trim()) return;
      
      setIsAnalyzing(true);
      
      try {
        if (audioBlob) {
          // Extract audio features from the blob
          const features = await extractAudioFeatures(audioBlob);
          
          // Detect emotions using both text and audio
          const result = detectEmotions(text, features);
          setEmotionResult(result);
          
          // Set the primary emotion if no manual selection has been made
          if (!selectedEmotion) {
            setSelectedEmotion(result.primaryEmotion);
            if (onEmotionChange) {
              onEmotionChange(result.primaryEmotion);
            }
          }
        } else {
          // Text-only analysis
          const result = detectEmotions(text);
          setEmotionResult(result);
          
          // Set the primary emotion if no manual selection has been made
          if (!selectedEmotion) {
            setSelectedEmotion(result.primaryEmotion);
            if (onEmotionChange) {
              onEmotionChange(result.primaryEmotion);
            }
          }
        }
      } catch (error) {
        console.error("Error analyzing emotions:", error);
      } finally {
        setIsAnalyzing(false);
      }
    };
    
    analyzeEmotions();
  }, [text, audioBlob]);
  
  // Update selected emotion when initialEmotion prop changes
  useEffect(() => {
    if (initialEmotion) {
      setSelectedEmotion(initialEmotion);
    }
  }, [initialEmotion]);
  
  // Handle manual emotion selection
  const handleEmotionSelect = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
    if (onEmotionChange) {
      onEmotionChange(emotion);
    }
  };
  
  if (!emotionResult) {
    return null;
  }
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Emotion Analysis</CardTitle>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Automated analysis of emotional themes in your story based on language patterns and voice tone.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {isAnalyzing && <div className="text-xs text-muted-foreground">Analyzing...</div>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <EmotionSelector 
          detectedEmotions={emotionResult}
          onEmotionSelect={handleEmotionSelect}
          selectedEmotion={selectedEmotion}
          editable={true}
        />
        
        <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 w-full justify-between">
              <span>Emotion Details</span>
              {isDetailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Highlighted Keywords</h4>
              <div className="p-3 bg-gray-50 rounded-md text-sm">
                <KeywordHighlight 
                  text={text} 
                  keywords={emotionResult.keywords}
                  primaryEmotion={selectedEmotion || emotionResult.primaryEmotion}
                />
              </div>
            </div>
            
            {emotionResult.audioFeatures && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Voice Characteristics</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-gray-50 rounded-md">
                    <div className="font-medium">Pitch</div>
                    <div className="h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-blue-400 rounded-full" 
                        style={{ width: `${emotionResult.audioFeatures.pitch * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-md">
                    <div className="font-medium">Tone</div>
                    <div className="h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-purple-400 rounded-full" 
                        style={{ width: `${emotionResult.audioFeatures.tone * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-md">
                    <div className="font-medium">Pace</div>
                    <div className="h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-green-400 rounded-full" 
                        style={{ width: `${emotionResult.audioFeatures.pace * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
