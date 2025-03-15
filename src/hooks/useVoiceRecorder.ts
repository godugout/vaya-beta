
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface VoiceRecorderOptions {
  /** Enable noise filtering for cleaner recordings */
  noiseFiltering?: boolean;
  /** Audio quality preset: low, medium, high */
  quality?: 'low' | 'medium' | 'high';
  /** Maximum recording duration in seconds (0 for unlimited) */
  maxDuration?: number;
  /** Enable silence detection to automatically pause recording */
  silenceDetection?: boolean;
  /** Audio format to use (default: audio/webm) */
  audioFormat?: string;
}

interface RecorderState {
  isRecordingActive: boolean;
  audioBlob: Blob | null;
  isProcessing: boolean;
  duration: number;
  volume: number;
}

export const useVoiceRecorder = (options: VoiceRecorderOptions = {}) => {
  const {
    noiseFiltering = true,
    quality = 'medium',
    maxDuration = 0,
    silenceDetection = false,
    audioFormat = 'audio/webm'
  } = options;
  
  const [state, setState] = useState<RecorderState>({
    isRecordingActive: false,
    audioBlob: null,
    isProcessing: false,
    duration: 0,
    volume: 0
  });
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const recordingStartTimeRef = useRef<number>(0);
  const recordingTimerRef = useRef<number | null>(null);
  const maxDurationTimerRef = useRef<number | null>(null);
  const silenceDetectionTimerRef = useRef<number | null>(null);
  
  const { toast } = useToast();

  // Set up media recorder quality based on preset
  const getMediaRecorderOptions = (): MediaRecorderOptions => {
    const bitsPerSecond = {
      low: 12000,
      medium: 24000,
      high: 48000
    }[quality];
    
    return {
      mimeType: 'audio/webm',
      bitsPerSecond
    };
  };

  // Start recording with optimized settings
  const startRecording = async () => {
    try {
      setState(prev => ({ ...prev, isProcessing: true }));
      
      // Request audio with noise reduction if requested
      const constraints: MediaStreamConstraints = {
        audio: {
          echoCancellation: noiseFiltering,
          noiseSuppression: noiseFiltering,
          autoGainControl: true,
          // Request low latency audio processing
          latency: 0.01,
          sampleRate: quality === 'high' ? 48000 : quality === 'medium' ? 44100 : 22050,
          sampleSize: quality === 'low' ? 8 : 16,
          channelCount: quality === 'high' ? 2 : 1
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      // Set up audio context for volume analysis
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        latencyHint: 'interactive',
        sampleRate: quality === 'high' ? 48000 : 44100
      });
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      // Set up media recorder with optimal options
      const recorder = new MediaRecorder(stream, getMediaRecorderOptions());
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: audioFormat });
        setState(prev => ({ 
          ...prev, 
          isRecordingActive: false, 
          audioBlob, 
          isProcessing: false 
        }));
        
        // Clean up timers
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
        
        if (maxDurationTimerRef.current) {
          clearTimeout(maxDurationTimerRef.current);
          maxDurationTimerRef.current = null;
        }
        
        if (silenceDetectionTimerRef.current) {
          clearInterval(silenceDetectionTimerRef.current);
          silenceDetectionTimerRef.current = null;
        }
        
        // Disconnect and stop all audio processing
        source.disconnect();
        stream.getTracks().forEach(track => track.stop());
      };

      // Start timer for tracking duration
      recordingStartTimeRef.current = Date.now();
      recordingTimerRef.current = window.setInterval(() => {
        const duration = (Date.now() - recordingStartTimeRef.current) / 1000;
        setState(prev => ({ ...prev, duration }));
      }, 100);
      
      // Start silence detection if enabled
      if (silenceDetection) {
        startSilenceDetection();
      }
      
      // Set max duration timer if specified
      if (maxDuration > 0) {
        maxDurationTimerRef.current = window.setTimeout(() => {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            stopRecording();
            toast({
              title: "Recording complete",
              description: `Maximum recording duration of ${maxDuration} seconds reached.`,
            });
          }
        }, maxDuration * 1000);
      }
      
      // Start recording with minimal time slice for lower latency
      recorder.start(100);
      
      // Provide haptic feedback if supported
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
      
      setState(prev => ({ ...prev, isRecordingActive: true, isProcessing: false, audioBlob: null }));
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setState(prev => ({ ...prev, isProcessing: false }));
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not access microphone. Please check your permissions.",
      });
    }
  };
  
  // Start silence detection for auto-pause
  const startSilenceDetection = () => {
    if (!analyserRef.current) return;
    
    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let silenceCounter = 0;
    
    silenceDetectionTimerRef.current = window.setInterval(() => {
      if (!analyserRef.current) return;
      
      // Get current audio levels
      analyser.getByteFrequencyData(dataArray);
      
      // Calculate average volume
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      
      // Update volume state
      setState(prev => ({ ...prev, volume: average / 255 }));
      
      // Check for silence (adjust threshold as needed)
      if (average < 5) {
        silenceCounter++;
        
        // If silent for 2 seconds, stop recording
        if (silenceCounter > 20) {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            stopRecording();
            toast({
              title: "Recording stopped",
              description: "Recording automatically stopped due to silence.",
            });
          }
        }
      } else {
        silenceCounter = 0;
      }
    }, 100);
  };

  // Stop recording and clean up
  const stopRecording = () => {
    if (mediaRecorderRef.current && state.isRecordingActive) {
      mediaRecorderRef.current.stop();
      
      // Provide haptic feedback if supported
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  };
  
  // Memory cleanup on component unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      
      if (maxDurationTimerRef.current) {
        clearTimeout(maxDurationTimerRef.current);
      }
      
      if (silenceDetectionTimerRef.current) {
        clearInterval(silenceDetectionTimerRef.current);
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(console.error);
      }
    };
  }, []);

  return {
    ...state,
    startRecording,
    stopRecording,
    setAudioBlob: (blob: Blob | null) => setState(prev => ({ ...prev, audioBlob: blob }))
  };
};
