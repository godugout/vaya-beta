
import { useState, useEffect } from "react";
import WavePath from "./waveform/WavePath";
import CosmicParticles from "./waveform/CosmicParticles";
import { generateFluidAmplitudes } from "./waveform/waveUtils";

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
      setAmplitudes(prev => generateFluidAmplitudes(prev));
    }, 100);
    
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="h-24 w-full flex items-center justify-center relative">
      {/* Background with brand colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-background-purple/20 to-dark-background-orange/10 rounded-lg opacity-60" />
      
      <WavePath amplitudes={amplitudes} isRecording={isRecording} />
      
      {/* Add brand-colored particles for cosmic effect */}
      <CosmicParticles 
        count={30} 
        colors={["#FF7675", "#6C5CE7", "#74B9FF"]} 
      />
    </div>
  );
};

export default WaveformVisualizer;
