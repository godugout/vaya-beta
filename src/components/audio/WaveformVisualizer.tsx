
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
      {/* Background cosmic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-purple-900/5 rounded-lg opacity-50" />
      
      <WavePath amplitudes={amplitudes} isRecording={isRecording} />
      
      {/* Add subtle star-like particles for cosmic effect */}
      <CosmicParticles />
    </div>
  );
};

export default WaveformVisualizer;
