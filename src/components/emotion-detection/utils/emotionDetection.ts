
import { EmotionType, EmotionDetectionResult } from "../types";

// Emotion keyword patterns for text analysis
const EMOTION_KEYWORDS: Record<EmotionType, string[]> = {
  'joy': ['happy', 'joy', 'laugh', 'smile', 'delight', 'wonderful', 'blessing', 'celebrate', 'cherish', 'grateful'],
  'sadness': ['sad', 'sorrow', 'cry', 'tear', 'miss', 'loss', 'mourn', 'grief', 'hurt', 'painful'],
  'nostalgia': ['remember', 'childhood', 'past', 'memory', 'old days', 'used to', 'back then', 'reminds me', 'growing up', 'tradition'],
  'excitement': ['excited', 'thrill', 'amazing', 'wow', 'incredible', 'anticipate', 'eager', 'looking forward', 'energetic', 'enthusiastic'],
  'reverence': ['sacred', 'honor', 'respect', 'admire', 'profound', 'deep', 'awe', 'reverent', 'venerate', 'spiritual']
};

// Audio feature patterns typically associated with emotions
const AUDIO_EMOTION_PATTERNS = {
  'joy': { pitch: 0.7, tone: 0.8, pace: 0.7 },
  'sadness': { pitch: 0.3, tone: 0.2, pace: 0.3 },
  'nostalgia': { pitch: 0.5, tone: 0.4, pace: 0.4 },
  'excitement': { pitch: 0.8, tone: 0.9, pace: 0.9 },
  'reverence': { pitch: 0.4, tone: 0.3, pace: 0.4 }
};

/**
 * Analyzes text content to detect emotions based on keywords
 */
export function detectEmotionsFromText(text: string): Partial<EmotionDetectionResult> {
  const normalizedText = text.toLowerCase();
  const results: Record<EmotionType, { count: number; keywords: string[] }> = {
    'joy': { count: 0, keywords: [] },
    'sadness': { count: 0, keywords: [] },
    'nostalgia': { count: 0, keywords: [] },
    'excitement': { count: 0, keywords: [] },
    'reverence': { count: 0, keywords: [] }
  };
  
  // Count keyword matches for each emotion
  Object.entries(EMOTION_KEYWORDS).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b|\\b${keyword}s\\b|\\b${keyword}ing\\b|\\b${keyword}ed\\b`, 'gi');
      const matches = normalizedText.match(regex);
      
      if (matches && matches.length > 0) {
        results[emotion as EmotionType].count += matches.length;
        results[emotion as EmotionType].keywords.push(keyword);
      }
    });
  });
  
  // Calculate confidence scores
  const totalMatches = Object.values(results).reduce((sum, { count }) => sum + count, 0);
  const confidenceScores: Record<EmotionType, number> = {} as Record<EmotionType, number>;
  const keywords: Record<EmotionType, string[]> = {} as Record<EmotionType, string[]>;
  
  Object.entries(results).forEach(([emotion, { count, keywords: matchedKeywords }]) => {
    // Calculate confidence score, with a minimum floor of 0.1
    confidenceScores[emotion as EmotionType] = totalMatches > 0 
      ? Math.max(0.1, Math.min(1.0, count / totalMatches)) 
      : 0.2;
    
    // Store unique keywords
    keywords[emotion as EmotionType] = [...new Set(matchedKeywords)];
  });
  
  // Determine primary emotion based on highest confidence
  let primaryEmotion: EmotionType = 'nostalgia'; // Default to nostalgia when no clear emotion is detected
  let highestConfidence = 0;
  
  Object.entries(confidenceScores).forEach(([emotion, score]) => {
    if (score > highestConfidence) {
      highestConfidence = score;
      primaryEmotion = emotion as EmotionType;
    }
  });
  
  return {
    primaryEmotion,
    confidenceScores,
    keywords
  };
}

/**
 * Analyzes audio features to detect emotions based on voice tone
 * In a real implementation, this would use ML to analyze actual voice features
 */
export function detectEmotionsFromAudio(audioFeatures: { pitch: number; tone: number; pace: number }): Partial<EmotionDetectionResult> {
  const confidenceScores: Record<EmotionType, number> = {} as Record<EmotionType, number>;
  
  // Calculate similarity of audio features to each emotion pattern
  // using weighted Euclidean distance between feature vectors
  Object.entries(AUDIO_EMOTION_PATTERNS).forEach(([emotion, pattern]) => {
    const pitchDiff = Math.abs(audioFeatures.pitch - pattern.pitch);
    const toneDiff = Math.abs(audioFeatures.tone - pattern.tone);
    const paceDiff = Math.abs(audioFeatures.pace - pattern.pace);
    
    // Calculate inverse of distance as confidence (closer = higher confidence)
    const distance = Math.sqrt(
      Math.pow(pitchDiff, 2) * 0.4 + // weight pitch at 40%
      Math.pow(toneDiff, 2) * 0.4 +  // weight tone at 40%
      Math.pow(paceDiff, 2) * 0.2    // weight pace at 20%
    );
    
    // Normalize to 0-1 range with inverse relationship to distance
    confidenceScores[emotion as EmotionType] = Math.max(0.1, Math.min(1.0, 1 - distance));
  });
  
  // Determine primary emotion
  let primaryEmotion: EmotionType = 'nostalgia';
  let highestConfidence = 0;
  
  Object.entries(confidenceScores).forEach(([emotion, score]) => {
    if (score > highestConfidence) {
      highestConfidence = score;
      primaryEmotion = emotion as EmotionType;
    }
  });
  
  return {
    primaryEmotion,
    confidenceScores,
    audioFeatures
  };
}

/**
 * Combines text and audio analysis for comprehensive emotion detection
 */
export function detectEmotions(
  text: string, 
  audioFeatures?: { pitch: number; tone: number; pace: number }
): EmotionDetectionResult {
  // Get text-based emotion detection
  const textResults = detectEmotionsFromText(text);
  
  // If audio features are available, get audio-based emotion detection and combine
  if (audioFeatures) {
    const audioResults = detectEmotionsFromAudio(audioFeatures);
    
    // Combine confidence scores (70% text, 30% audio for final confidence)
    const combinedScores: Record<EmotionType, number> = {} as Record<EmotionType, number>;
    
    Object.keys(textResults.confidenceScores || {}).forEach(emotion => {
      const textScore = textResults.confidenceScores?.[emotion as EmotionType] || 0;
      const audioScore = audioResults.confidenceScores?.[emotion as EmotionType] || 0;
      
      // Weighted combination of text and audio scores
      combinedScores[emotion as EmotionType] = textScore * 0.7 + audioScore * 0.3;
    });
    
    // Determine primary emotion from combined scores
    let primaryEmotion: EmotionType = 'nostalgia';
    let highestConfidence = 0;
    
    Object.entries(combinedScores).forEach(([emotion, score]) => {
      if (score > highestConfidence) {
        highestConfidence = score;
        primaryEmotion = emotion as EmotionType;
      }
    });
    
    return {
      primaryEmotion,
      confidenceScores: combinedScores,
      keywords: textResults.keywords || {
        'joy': [],
        'sadness': [],
        'nostalgia': [],
        'excitement': [],
        'reverence': []
      },
      audioFeatures
    };
  }
  
  // If no audio features, just return text-based results
  return {
    primaryEmotion: textResults.primaryEmotion || 'nostalgia',
    confidenceScores: textResults.confidenceScores || {} as Record<EmotionType, number>,
    keywords: textResults.keywords || {
      'joy': [],
      'sadness': [],
      'nostalgia': [],
      'excitement': [],
      'reverence': []
    }
  };
}

/**
 * Extract audio features from raw audio data
 * This is a simplified mock implementation - in a real app, this would use
 * an ML model or audio processing library to extract actual features
 */
export function extractAudioFeatures(audioBlob: Blob): Promise<{ pitch: number; tone: number; pace: number }> {
  // In a real implementation, this would process the audio and extract features
  // For demonstration, we'll return mock values with slight randomization
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        pitch: 0.4 + Math.random() * 0.4, // Random value between 0.4-0.8
        tone: 0.3 + Math.random() * 0.5,  // Random value between 0.3-0.8
        pace: 0.4 + Math.random() * 0.4   // Random value between 0.4-0.8
      });
    }, 500); // Simulate processing time
  });
}
