
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@/components/animation/AnimationProvider';
import WavePath from './WavePath';

interface AnimatedWavePathProps {
  isRecording: boolean;
  intensity?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const AnimatedWavePath = ({
  isRecording,
  intensity = 1,
  size = 'md',
  color = "#FF7675"
}: AnimatedWavePathProps) => {
  const { isReduced } = useAnimation();
  const [amplitudes, setAmplitudes] = useState<number[]>(Array(40).fill(0.1));
  
  // Size mappings
  const sizeClasses = {
    sm: 'h-16',
    md: 'h-24',
    lg: 'h-32'
  };
  
  useEffect(() => {
    if (!isRecording || isReduced) return;
    
    const interval = setInterval(() => {
      setAmplitudes(prevAmplitudes => {
        return prevAmplitudes.map(() => {
          // Generate a value between 0.1-0.7 when recording
          return isRecording 
            ? 0.1 + Math.random() * 0.6 * intensity
            : 0.1;
        });
      });
    }, 150); // Update every 150ms for a fluid but not too fast animation
    
    return () => clearInterval(interval);
  }, [isRecording, intensity, isReduced]);
  
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
          color={color}
        />
      </motion.div>
    </div>
  );
};
