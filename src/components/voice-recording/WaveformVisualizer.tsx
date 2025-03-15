
import { AnimatedWavePath } from "@/components/audio/waveform/AnimatedWavePath";

interface WaveformVisualizerProps {
  isRecording: boolean;
}

const WaveformVisualizer = ({ isRecording }: WaveformVisualizerProps) => {
  return (
    <div className="h-24 w-full flex items-center justify-center">
      <AnimatedWavePath 
        isRecording={isRecording} 
        intensity={0.7}
        size="md"
      />
    </div>
  );
};

export default WaveformVisualizer;
