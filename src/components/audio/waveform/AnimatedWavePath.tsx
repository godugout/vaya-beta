
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@/components/animation/AnimationProvider';
import WavePath from './WavePath';
import { generateFluidAmplitudes, generateFlamingAmplitudes, generateBreezeAmplitudes } from './waveUtils';

interface AnimatedWavePathProps {
  isRecording: boolean;
  intensity?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  emotionType?: 'calm' | 'passionate' | 'soft';
}

export const AnimatedWavePath = ({
  isRecording,
  intensity = 1,
  size = 'md',
  color = "#FF7A00", // Saffron orange as default
  emotionType = 'calm'
}: AnimatedWavePathProps) => {
  const { isReduced } = useAnimation();
  const [amplitudes, setAmplitudes] = useState<number[]>(Array(40).fill(0.1));
  
  // Size mappings
  const sizeClasses = {
    sm: 'h-16',
    md: 'h-24',
    lg: 'h-32'
  };

  // Dynamic colors based on emotion
  const getEmotionColor = (emotion: 'calm' | 'passionate' | 'soft') => {
    switch(emotion) {
      case 'passionate': return "#FF7A00"; // Saffron orange
      case 'calm': return "#1E9C95"; // Sacred teal
      case 'soft': return "#FFDD59"; // Sunshine yellow
      default: return color;
    }
  };
  
  useEffect(() => {
    if (!isRecording || isReduced) return;
    
    const interval = setInterval(() => {
      setAmplitudes(prevAmplitudes => {
        // Choose the amplitude generation based on emotion
        switch(emotionType) {
          case 'passionate':
            return generateFlamingAmplitudes(prevAmplitudes, intensity);
          case 'soft':
            return generateBreezeAmplitudes(prevAmplitudes, intensity);
          case 'calm':
          default:
            return generateFluidAmplitudes(prevAmplitudes, intensity);
        }
      });
    }, 150); // Update every 150ms for a fluid but not too fast animation
    
    return () => clearInterval(interval);
  }, [isRecording, intensity, isReduced, emotionType]);
  
  // Reset to low amplitudes when not recording
  useEffect(() => {
    if (!isRecording) {
      setAmplitudes(Array(40).fill(0.1));
    }
  }, [isRecording]);
  
  return (
    <div className={`w-full ${sizeClasses[size]} flex items-center justify-center`}>
      <motion.div 
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <WavePath 
          amplitudes={amplitudes} 
          isRecording={isRecording} 
          lineWidth={2} 
          color={getEmotionColor(emotionType)}
        />
      </motion.div>
    </div>
  );
};
