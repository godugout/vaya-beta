
import React from 'react';

interface WavePathProps {
  amplitudes: number[];
  isRecording: boolean;
  lineWidth?: number;
  color?: string;
}

const WavePath: React.FC<WavePathProps> = ({ 
  amplitudes, 
  isRecording, 
  lineWidth = 2,
  color = "#FF7A00"
}) => {
  // Default to a flat line if not recording
  const effectiveAmplitudes = isRecording 
    ? amplitudes 
    : amplitudes.map(() => 0.1);
  
  // Vertical center point
  const centerY = 50;
  
  // Create a smooth path from the amplitudes
  const createWavePath = (amps: number[]) => {
    if (amps.length === 0) return '';
    
    const width = 100 / (amps.length - 1);
    let path = `M 0,${centerY}`;
    
    amps.forEach((amp, i) => {
      const x = i * width;
      const y = centerY - (amp * 40); // Scale amplitude to pixels
      path += ` L ${x},${y}`;
    });
    
    // Mirror the wave below the center
    for (let i = amps.length - 1; i >= 0; i--) {
      const x = i * width;
      const y = centerY + (amps[i] * 40); // Mirror below center
      path += ` L ${x},${y}`;
    }
    
    // Close the path
    path += ' Z';
    return path;
  };
  
  const wavePath = createWavePath(effectiveAmplitudes);
  
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Fill with a gradient */}
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="50%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      {/* Wave path with gradient fill */}
      <path 
        d={wavePath} 
        fill="url(#waveGradient)" 
        strokeLinejoin="round"
      />
      
      {/* Stroke to outline the wave */}
      <path 
        d={wavePath} 
        fill="none" 
        stroke={color}
        strokeWidth={lineWidth} 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WavePath;
