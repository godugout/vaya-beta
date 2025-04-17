
import { useEffect, useRef, useState } from "react";
import { useAnimation } from "@/components/animation/AnimationProvider";

interface AudioWaveformProps {
  isActive?: boolean;
  amplitude?: number;
  color?: string;
  speed?: number;
  className?: string;
}

const AudioWaveform = ({
  isActive = false,
  amplitude = 0.5,
  color = "rgba(107, 92, 231, 0.6)",
  speed = 1,
  className = "",
}: AudioWaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isReduced } = useAnimation();
  const [points, setPoints] = useState<number[]>([]);
  const animationRef = useRef<number>(0);
  
  // Initialize points for the waveform
  useEffect(() => {
    const pointCount = Math.floor(window.innerWidth / 10);
    const initialPoints = Array.from({ length: pointCount }, () => 
      (Math.random() * 0.3 + 0.1) * amplitude
    );
    setPoints(initialPoints);
    
    const handleResize = () => {
      const newPointCount = Math.floor(window.innerWidth / 10);
      const newPoints = Array.from({ length: newPointCount }, (_, i) => {
        return i < points.length ? points[i] : (Math.random() * 0.3 + 0.1) * amplitude;
      });
      setPoints(newPoints);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate the waveform
  useEffect(() => {
    if (!canvasRef.current || points.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateCanvasSize();
    
    window.addEventListener('resize', updateCanvasSize);
    
    // Simplified animation for reduced motion preference
    if (isReduced) {
      const drawSimplified = () => {
        if (!ctx || !canvas) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        
        const centerY = canvas.height / 2;
        const waveHeight = isActive ? canvas.height * 0.1 * amplitude : canvas.height * 0.05;
        
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        
        for (let x = 0; x < canvas.width; x += 20) {
          ctx.lineTo(x, centerY + Math.sin(x * 0.02) * waveHeight);
        }
        
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();
      };
      
      drawSimplified();
      return () => window.removeEventListener('resize', updateCanvasSize);
    }
    
    // Full animation
    let offset = 0;
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      
      // Update points for a more dynamic waveform
      const newPoints = [...points];
      
      if (isActive) {
        for (let i = 0; i < newPoints.length; i++) {
          // Create more dynamic movement when active
          const changeAmount = (Math.random() - 0.5) * 0.1 * amplitude * speed;
          newPoints[i] = Math.max(0.1, Math.min(0.9, newPoints[i] + changeAmount));
        }
        setPoints(newPoints);
      }
      
      // Draw the waveform
      const waveHeight = canvas.height * 0.8;
      const centerY = canvas.height / 2;
      
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      
      // Generate smooth curve through points
      for (let i = 0; i < newPoints.length; i++) {
        const x = (i / newPoints.length) * canvas.width;
        const y = centerY - (newPoints[i] * waveHeight - waveHeight / 2);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Use quadratic curves for smoother appearance
          const prevX = ((i - 1) / newPoints.length) * canvas.width;
          const prevY = centerY - (newPoints[i - 1] * waveHeight - waveHeight / 2);
          
          const cpX = (prevX + x) / 2;
          ctx.quadraticCurveTo(prevX, prevY, cpX, (prevY + y) / 2);
        }
      }
      
      ctx.lineTo(canvas.width, centerY);
      ctx.stroke();
      
      // Add a subtle glow effect
      if (isActive) {
        ctx.strokeStyle = color.replace(')', ', 0.3)').replace('rgba', 'rgba');
        ctx.lineWidth = 4;
        ctx.stroke();
      }
      
      offset += speed * 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [points, isActive, amplitude, color, speed, isReduced]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full ${className}`}
      style={{ opacity: isActive ? 1 : 0.6 }}
    />
  );
};

export default AudioWaveform;
