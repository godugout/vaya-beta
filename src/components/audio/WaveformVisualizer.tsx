
import { useState, useEffect, useRef, useMemo } from "react";
import WavePath from "./waveform/WavePath";
import { generateFluidAmplitudes } from "./waveform/waveUtils";

interface WaveformVisualizerProps {
  isRecording: boolean;
  audioBlob?: Blob | null;
  lineWidth?: number;
  sensitivity?: number;
  color?: string;
}

const WaveformVisualizer = ({ 
  isRecording, 
  audioBlob, 
  lineWidth = 2, // 2px line width as specified
  sensitivity = 1.5,
  color = "#FF7675" // Using primary coral color
}: WaveformVisualizerProps) => {
  const [amplitudes, setAmplitudes] = useState<number[]>(Array(40).fill(0.1));
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  
  // Memoize the amplitudes generation function for better performance
  const generateNextAmplitudes = useMemo(
    () => (prev: number[]) => generateFluidAmplitudes(prev, sensitivity),
    [sensitivity]
  );

  // Real-time recording visualization with optimized animation frame handling
  useEffect(() => {
    let animationFrameId: number;
    
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        
        // Only update every ~16ms (60fps target)
        if (deltaTime > 16) {
          if (isRecording && analyserRef.current && dataArrayRef.current) {
            // Get frequency data for real-time visualization
            analyserRef.current.getByteFrequencyData(dataArrayRef.current);
            
            // Convert frequency data to amplitudes
            const newAmplitudes = Array.from(dataArrayRef.current)
              .slice(0, 40)
              .map(val => val / 255);
              
            setAmplitudes(newAmplitudes);
          } else if (isRecording) {
            // Fallback to simulated visualization if audio API is not available
            setAmplitudes(prev => generateNextAmplitudes(prev));
          }
          
          previousTimeRef.current = time;
        }
      } else {
        previousTimeRef.current = time;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    if (isRecording) {
      animationFrameId = requestAnimationFrame(animate);
      
      // Set up audio analyser for real-time visualization if not already set up
      if (!analyserRef.current) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            // Create audio context with low latency settings
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
              latencyHint: 'interactive', // Request low latency
              sampleRate: 44100 // Standard sample rate
            });
            
            audioContextRef.current = audioCtx;
            
            // Create analyser node
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256; // Small FFT size for lower latency
            analyser.smoothingTimeConstant = 0.5; // Balance between response and smoothness
            analyserRef.current = analyser;
            
            // Connect audio source to analyser
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);
            sourceRef.current = source;
            
            // Create data array for frequency analysis
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            dataArrayRef.current = dataArray;
          })
          .catch(err => {
            console.error("Failed to access microphone:", err);
          });
      }
    } else {
      // Clean up audio context when not recording
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        if (sourceRef.current) {
          sourceRef.current.disconnect();
          sourceRef.current = null;
        }
        
        if (analyserRef.current) {
          analyserRef.current.disconnect();
          analyserRef.current = null;
        }
        
        dataArrayRef.current = null;
        
        // Reset amplitudes to low values when not recording
        setAmplitudes(prev => prev.map(() => 0.1));
      }
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRecording, generateNextAmplitudes]);
  
  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(console.error);
      }
    };
  }, []);

  return (
    <div className="h-24 w-full flex items-center justify-center relative">
      <WavePath 
        amplitudes={amplitudes} 
        isRecording={isRecording} 
        lineWidth={lineWidth}
        color={color}
      />
    </div>
  );
};

export default WaveformVisualizer;
