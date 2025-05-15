
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAudioTranscription } from '@/components/voice-recording/hooks/useAudioTranscription';

interface UseDictationOptions {
  language?: 'en' | 'hi' | 'gu' | 'auto';
  enhanceWithAI?: boolean;
  onTranscriptionComplete?: (text: string) => void;
}

export const useDictation = (options: UseDictationOptions = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [waveformData, setWaveformData] = useState<Uint8Array | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const { toast } = useToast();
  const {
    transcribeAudio,
    isProcessing: isTranscribing,
    transcription
  } = useAudioTranscription({
    language: options.language || 'en',
    enhanceWithAI: options.enhanceWithAI !== false
  });
  
  // Clean up resources on unmount
  useEffect(() => {
    return () => {
      cleanupResources();
    };
  }, []);
  
  // Reset timer when recording stops
  useEffect(() => {
    if (!isRecording) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  }, [isRecording]);
  
  const startRecording = async () => {
    try {
      // Clean up any existing resources first
      cleanupResources();
      
      // Reset state
      audioChunksRef.current = [];
      setAudioBlob(null);
      setAudioUrl(null);
      setRecordingDuration(0);
      
      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000
        } 
      });
      
      streamRef.current = stream;
      
      // Setup audio context for visualization
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.75;
      source.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      
      // Setup waveform data array
      const bufferLength = analyser.frequencyBinCount;
      const waveformArray = new Uint8Array(bufferLength);
      setWaveformData(waveformArray);
      
      // Create MediaRecorder
      try {
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;
      } catch (e) {
        console.warn('audio/webm not supported, trying default:', e);
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
      }
      
      // Set up data collection
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Handle recording stop
      mediaRecorderRef.current.onstop = () => {
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorderRef.current?.mimeType || 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          
          setAudioBlob(audioBlob);
          setAudioUrl(url);
        }
      };
      
      // Start recording
      mediaRecorderRef.current.start(250); // Collect data every 250ms
      setIsRecording(true);
      
      // Start timer for duration tracking
      timerRef.current = window.setInterval(() => {
        setRecordingDuration(prev => prev + 0.1);
      }, 100);
      
      // Start waveform analysis
      startWaveformAnalysis();
      
    } catch (error) {
      console.error('Error starting recording:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to record your story.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Recording error",
          description: "Could not start recording. Please try again.",
          variant: "destructive"
        });
      }
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop and clear the timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Stop waveform analysis
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      // Stop all audio tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };
  
  const transcribe = async () => {
    if (!audioBlob) return null;
    
    try {
      const text = await transcribeAudio(audioBlob);
      
      if (options.onTranscriptionComplete && text) {
        options.onTranscriptionComplete(text);
      }
      
      return text;
    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        title: "Transcription failed",
        description: "Could not transcribe your recording. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };
  
  const startWaveformAnalysis = () => {
    if (!analyserRef.current || !waveformData) return;
    
    const analyseAudio = () => {
      if (!isRecording || !analyserRef.current || !waveformData) return;
      
      animationFrameRef.current = requestAnimationFrame(analyseAudio);
      
      // Get frequency data for visualization
      analyserRef.current.getByteFrequencyData(waveformData);
      
      // Calculate volume level (simple average of frequency data)
      let sum = 0;
      for (let i = 0; i < waveformData.length; i++) {
        sum += waveformData[i];
      }
      const average = sum / waveformData.length;
      setVolumeLevel(average / 255); // Normalize to 0-1
      
      // Update waveform data state
      setWaveformData(new Uint8Array(waveformData));
    };
    
    analyseAudio();
  };
  
  const cleanupResources = () => {
    // Stop recording if active
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    
    // Clear all timers and animation frames
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Stop all audio tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Close audio context
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(err => console.warn('Error closing AudioContext:', err));
      audioContextRef.current = null;
    }
    
    analyserRef.current = null;
    mediaRecorderRef.current = null;
    setIsRecording(false);
  };
  
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };
  
  return {
    isRecording,
    audioBlob,
    audioUrl,
    recordingDuration,
    formattedDuration: formatDuration(recordingDuration),
    volumeLevel,
    waveformData,
    isTranscribing,
    transcription,
    startRecording,
    stopRecording,
    transcribe,
    reset: cleanupResources
  };
};
