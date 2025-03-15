
import { motion } from "framer-motion";
import { generateWavePath } from "./waveUtils";

interface WavePathProps {
  amplitudes: number[];
  isRecording: boolean;
}

const WavePath = ({ amplitudes, isRecording }: WavePathProps) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 800 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9b87f5" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#D6BCFA" />
        </linearGradient>
      </defs>
      
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
  );
};

export default WavePath;
