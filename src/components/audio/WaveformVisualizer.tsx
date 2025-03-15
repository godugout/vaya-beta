
import { useState, useEffect } from "react";

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
      setAmplitudes(prev => 
        prev.map(() => Math.random() * 0.8 + 0.2) // Random amplitude between 0.2 and 1.0
      );
    }, 100);
    
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="h-24 w-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 800 100" preserveAspectRatio="none">
        <g className="flex items-center justify-between">
          {amplitudes.map((amplitude, index) => (
            <line
              key={index}
              x1={index * 20}
              y1={50 - amplitude * 40}
              x2={index * 20}
              y2={50 + amplitude * 40}
              stroke={isRecording ? "#D946EF" : "#9F9EA1"}
              strokeWidth="2"
              className={isRecording ? "animate-wave" : ""}
              style={{ animationDelay: `${index * 0.05}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default WaveformVisualizer;
