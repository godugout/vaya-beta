import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface WaveformVisualizerProps {
  isRecording: boolean;
  audioBlob?: Blob | null;
}

const WaveformVisualizer = ({ isRecording, audioBlob }: WaveformVisualizerProps) => {
  const [amplitudes, setAmplitudes] = useState<number[]>(Array(40).fill(0.1));

  // Simulate waveform when recording
  useEffect(() => {
    if (!isRecording) return;
    
    const interval = setInterval(() => {
      setAmplitudes(prev => {
        const newAmplitudes = [...prev];
        // Create more water-like fluid motion by gradually changing values
        return newAmplitudes.map((amplitude, i) => {
          const prevIndex = i === 0 ? prev.length - 1 : i - 1;
          const nextIndex = i === prev.length - 1 ? 0 : i + 1;
          
          // Mix the current value with neighbors for a more fluid effect
          const change = Math.random() * 0.1 - 0.05;
          const newValue = amplitude + change + (prev[prevIndex] + prev[nextIndex]) * 0.03;
          
          // Keep within bounds
          return Math.max(0.1, Math.min(1, newValue));
        });
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="h-24 w-full flex items-center justify-center relative">
      {/* Background cosmic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-purple-900/5 rounded-lg opacity-50" />
      
      <svg width="100%" height="100%" viewBox="0 0 800 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9b87f5" />
            <stop offset="50%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#D6BCFA" />
          </linearGradient>
        </defs>
        
        {/* Smooth wave path instead of individual lines */}
        <motion.path
          d={generateWavePath(amplitudes)}
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isRecording ? 1 : 0.6,
            filter: `drop-shadow(0 0 3px ${isRecording ? '#0EA5E9' : '#9b87f5'})`
          }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      
      {/* Add subtle star-like particles for cosmic effect */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};

// Helper function to generate a smooth wave path from amplitudes
const generateWavePath = (amplitudes: number[]): string => {
  const height = 100;
  const middle = height / 2;
  const width = 800;
  const segmentWidth = width / (amplitudes.length - 1);
  
  let path = `M 0 ${middle}`;
  
  // First point
  const firstY = middle - amplitudes[0] * 40;
  path += ` C ${segmentWidth * 0.25} ${firstY}, ${segmentWidth * 0.75} ${firstY}, ${segmentWidth} ${middle - amplitudes[1] * 40}`;
  
  // Middle points with bezier curves for smoothness
  for (let i = 1; i < amplitudes.length - 2; i++) {
    const x = i * segmentWidth;
    const y = middle - amplitudes[i] * 40;
    const nextY = middle - amplitudes[i + 1] * 40;
    
    // Control points for the bezier curve
    const cp1x = x + segmentWidth / 3;
    const cp1y = y;
    const cp2x = x + (2 * segmentWidth) / 3;
    const cp2y = nextY;
    const endX = x + segmentWidth;
    const endY = nextY;
    
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
  }
  
  // Last point
  const lastIndex = amplitudes.length - 1;
  const lastY = middle - amplitudes[lastIndex] * 40;
  const beforeLastY = middle - amplitudes[lastIndex - 1] * 40;
  path += ` C ${(lastIndex - 0.75) * segmentWidth} ${beforeLastY}, ${(lastIndex - 0.25) * segmentWidth} ${lastY}, ${lastIndex * segmentWidth} ${middle}`;
  
  return path;
};

export default WaveformVisualizer;
