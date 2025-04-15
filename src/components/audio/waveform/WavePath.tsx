
import React, { useMemo } from "react";
import { motion } from "framer-motion";

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
  color = "#FF7675" // Primary coral
}) => {
  // Generate an SVG path from amplitudes
  const path = useMemo(() => {
    const height = 100;
    const width = 800;
    const middle = height / 2;
    
    // Calculate segment width based on number of amplitudes
    const segmentWidth = width / (amplitudes.length - 1);
    
    // Start path at the middle left
    let d = `M 0 ${middle}`;
    
    // Generate smooth Bezier curves between points
    amplitudes.forEach((amplitude, i) => {
      if (i === 0) return; // Skip first point as it's already in the starting point
      
      const x = i * segmentWidth;
      const prevX = (i - 1) * segmentWidth;
      
      // Calculate y positions with amplification for visibility
      const y = middle - amplitudes[i] * 40;
      const prevY = middle - amplitudes[i - 1] * 40;
      
      // Control points for the Bezier curve (1/3 and 2/3 points between x values)
      const cp1x = prevX + segmentWidth / 3;
      const cp1y = prevY;
      const cp2x = prevX + 2 * segmentWidth / 3;
      const cp2y = y;
      
      // Add cubic Bezier curve command
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
    });
    
    return d;
  }, [amplitudes]);

  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 800 100"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={lineWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
          stroke: isRecording ? color : "#9CA3AF", // Dimmer color when not recording
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Add subtle glow effect for active recording */}
      {isRecording && (
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={lineWidth / 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.5}
          filter="blur(4px)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.svg>
  );
};

export default WavePath;
