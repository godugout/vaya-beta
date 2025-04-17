
export type EmotionType = 'joy' | 'sadness' | 'nostalgia' | 'excitement' | 'reverence';

export interface EmotionDetectionResult {
  primaryEmotion: EmotionType;
  confidenceScores: Record<EmotionType, number>;
  keywords: Record<EmotionType, string[]>;
  audioFeatures?: {
    pitch: number;
    tone: number;
    pace: number;
  };
}

export interface EmotionTagProps {
  emotion: EmotionType;
  confidence: number;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  selected?: boolean;
}
