
import React from 'react';
import { EmotionType } from './types';

interface KeywordHighlightProps {
  text: string;
  keywords: Record<EmotionType, string[]>;
  primaryEmotion: EmotionType;
}

const EMOTION_COLORS: Record<EmotionType, string> = {
  'joy': 'text-yellow-700 bg-yellow-100',
  'sadness': 'text-blue-700 bg-blue-100',
  'nostalgia': 'text-purple-700 bg-purple-100',
  'excitement': 'text-red-700 bg-red-100',
  'reverence': 'text-teal-700 bg-teal-100'
};

export const KeywordHighlight: React.FC<KeywordHighlightProps> = ({
  text,
  keywords,
  primaryEmotion
}) => {
  // Highlight keywords in text
  let highlightedText = text;
  const allKeywords: string[] = [];
  
  // First collect all keywords
  Object.entries(keywords).forEach(([emotion, words]) => {
    words.forEach(word => {
      if (!allKeywords.includes(word)) {
        allKeywords.push(word);
      }
    });
  });
  
  // Sort keywords by length (descending) to prevent nested replacements
  const sortedKeywords = allKeywords.sort((a, b) => b.length - a.length);
  
  // Replace each keyword with a marked version
  sortedKeywords.forEach(keyword => {
    // Find which emotion this keyword belongs to
    let keywordEmotion: EmotionType | null = null;
    
    Object.entries(keywords).forEach(([emotion, words]) => {
      if (words.includes(keyword)) {
        keywordEmotion = emotion as EmotionType;
      }
    });
    
    // Skip if we couldn't determine the emotion
    if (!keywordEmotion) return;
    
    // Determine highlight class
    const highlightClass = EMOTION_COLORS[keywordEmotion];
    
    // Create regex to match keyword with word boundaries
    const regex = new RegExp(`\\b${keyword}\\b|\\b${keyword}s\\b|\\b${keyword}ing\\b|\\b${keyword}ed\\b`, 'gi');
    
    // Replace with marked span
    highlightedText = highlightedText.replace(regex, 
      `<mark class="rounded px-1 ${highlightClass}">$&</mark>`
    );
  });
  
  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: highlightedText }} 
    />
  );
};
