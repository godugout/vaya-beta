
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LiveWaveformProps {
  waveformData: Uint8Array | null;
  isRecording: boolean;
  className?: string;
  barColor?: string;
}

const LiveWaveform = ({ 
  waveformData, 
  isRecording,
  className = '',
  barColor = '#ff3b30' 
}: LiveWaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Setup canvas and draw waveform
  useEffect(() => {
    if (!canvasRef.current || !waveformData || !isRecording) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (!isRecording) return;
      
      // Set canvas dimensions based on device pixel ratio
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      if (!waveformData) return;
      
      // Number of bars to display (fewer than the actual data points)
      const numBars = Math.min(40, Math.floor(waveformData.length * 0.5)); 
      const barWidth = Math.max(2, Math.floor((rect.width / numBars) * 0.7));
      const barSpacing = Math.floor((rect.width / numBars) * 0.3);
      
      let x = 0;
      ctx.fillStyle = barColor;
      
      for (let i = 0; i < numBars; i++) {
        if (x >= rect.width) break;
        
        const dataIndex = Math.floor(i * (waveformData.length / numBars));
        const value = waveformData[dataIndex] / 255.0; // Normalize to 0-1
        
        // Calculate bar height based on frequency value
        let barHeight = value * rect.height * 0.8;
        barHeight = Math.max(barHeight, 1); // Minimum height of 1px
        
        // Center the bar vertically
        const y = (rect.height - barHeight) / 2;
        
        ctx.fillRect(x, y, barWidth, barHeight);
        x += barWidth + barSpacing;
      }
    };
    
    const animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [waveformData, isRecording, barColor]);

  return (
    <div className={`relative w-full h-16 ${className}`}>
      {isRecording ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
      ) : (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Tap microphone to start recording
        </motion.div>
      )}
    </div>
  );
};

export default LiveWaveform;
