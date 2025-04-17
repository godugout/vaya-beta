
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ResponsiveWaveformProps {
  isActive: boolean;
  volume?: number;
  color?: string;
  className?: string;
}

const ResponsiveWaveform = ({
  isActive,
  volume = 0,
  color = "#f97316", // Default orange/saffron color
  className = ""
}: ResponsiveWaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  
  // Ensure the canvas fills its container and handle window resizing
  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const rect = canvas.parentElement?.getBoundingClientRect();
      
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  
  // Draw the waveform based on activity and volume
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Calculate the minimum number of bars to display
    const minBars = Math.max(20, Math.floor(canvas.width / 15));
    
    // A more natural-looking algorithm for responsive bars
    const barsArray = Array.from({ length: minBars }, (_, i) => {
      // Create a baseline amplitude for each bar
      let baseAmplitude = 0.2 + Math.sin(i / minBars * Math.PI) * 0.3;
      
      // When active, add some randomness weighted by volume
      if (isActive) {
        // Volume impact increases with higher volumes
        const volumeImpact = Math.pow(volume, 1.5);
        const randomFactor = Math.random() * volumeImpact * 0.6;
        
        // Combine base amplitude with the random factor, weighted by volume
        baseAmplitude = Math.min(
          0.95, // Cap maximum amplitude
          Math.max(
            0.1, // Ensure minimum amplitude
            baseAmplitude + randomFactor // Add randomness based on volume
          )
        );
      }
      
      return baseAmplitude;
    });
    
    const drawWaveform = () => {
      if (!ctx || !canvas) return;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate dimensions
      const barWidth = Math.max(2, Math.min(8, canvas.width / minBars / 2));
      const spacing = (canvas.width - barWidth * minBars) / (minBars + 1);
      const centerY = canvas.height / 2;
      
      // Draw each bar
      barsArray.forEach((amplitude, i) => {
        // Calculate bar height based on amplitude
        const maxHeight = canvas.height * 0.9;
        const barHeight = amplitude * maxHeight;
        
        // Calculate bar position
        const x = (i + 1) * spacing + i * barWidth;
        
        // Draw upper half of the bar
        ctx.beginPath();
        ctx.moveTo(x, centerY);
        ctx.lineTo(x, centerY - barHeight / 2);
        ctx.lineCap = "round";
        ctx.lineWidth = barWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
        
        // Draw lower half of the bar
        ctx.beginPath();
        ctx.moveTo(x, centerY);
        ctx.lineTo(x, centerY + barHeight / 2);
        ctx.stroke();
      });
      
      // Only animate if active
      if (isActive) {
        animationRef.current = requestAnimationFrame(drawWaveform);
      }
    };
    
    // Start the animation
    drawWaveform();
    
    // Cleanup animation loop
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isActive, volume, color]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
        />
      </motion.div>
      {!isActive && !volume && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
          <p className="text-sm">Start recording to see voice visualization</p>
        </div>
      )}
    </div>
  );
};

export default ResponsiveWaveform;
