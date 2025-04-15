
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { generateWavePath } from './waveUtils';
import { useAnimation } from '@/components/animation/AnimationProvider';

interface AnimatedWavePathProps {
  isRecording: boolean;
  intensity?: number; // 0-1 value representing audio intensity
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedWavePath = ({
  isRecording,
  intensity = 0.5,
  color = 'url(#waveGradient)',
  size = 'md',
}: AnimatedWavePathProps) => {
  const { isReduced } = useAnimation();
  const [amplitudes, setAmplitudes] = useState<number[]>(Array(40).fill(0.1));

  // Configure size options
  const sizeConfig = {
    sm: { height: 60, strokeWidth: 2 },
    md: { height: 100, strokeWidth: 3 },
    lg: { height: 140, strokeWidth: 4 },
  };

  // Update wave pattern based on recording state
  useEffect(() => {
    if (!isRecording || isReduced) return;

    const updateAmplitudes = () => {
      setAmplitudes((prev) => {
        return prev.map(() => {
          // Base amplitude determined by intensity
          const baseAmplitude = intensity * 0.7;
          // Add randomness for natural look
          const randomFactor = Math.random() * 0.3;
          return baseAmplitude + randomFactor;
        });
      });
    };

    // Update more frequently during recording for responsive feel
    const interval = setInterval(updateAmplitudes, 100);
    return () => clearInterval(interval);
  }, [isRecording, intensity, isReduced]);

  // For reduced motion or when not recording, use minimal animation
  if (isReduced || !isRecording) {
    return (
      <svg width="100%" height={sizeConfig[size].height} viewBox={`0 0 800 ${sizeConfig[size].height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6C5CE7" />
            <stop offset="50%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#FF7675" />
          </linearGradient>
        </defs>
        
        <motion.path
          d={generateWavePath(Array(40).fill(isRecording ? 0.3 : 0.1))}
          fill="none"
          stroke={color}
          strokeWidth={sizeConfig[size].strokeWidth}
          strokeLinecap="round"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isRecording ? 0.8 : 0.5 }}
          transition={{ duration: 0.5 }}
        />
      </svg>
    );
  }

  return (
    <svg width="100%" height={sizeConfig[size].height} viewBox={`0 0 800 ${sizeConfig[size].height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#FF7675" />
        </linearGradient>
      </defs>
      
      <motion.path
        d={generateWavePath(amplitudes)}
        fill="none"
        stroke={color}
        strokeWidth={sizeConfig[size].strokeWidth}
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          filter: `drop-shadow(0 0 5px ${isRecording ? '#FF7675' : '#6C5CE7'})`
        }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  );
};
