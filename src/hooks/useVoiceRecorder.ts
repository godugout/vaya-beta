
import { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface UseVoiceRecorderReturn {
  isRecordingActive: boolean;
  recordingTime: number;
  audioBlob: Blob | null;
  audioUrl: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  resetRecording: () => void;
  setAudioBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
}

export function useVoiceRecorder(): UseVoiceRecorderReturn {
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  
  // Clean up function
  const cleanup = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }
    
    chunksRef.current = [];
  }, []);
  
  // Reset recording state
  const resetRecording = useCallback(() => {
    setIsRecordingActive(false);
    setRecordingTime(0);
    setAudioBlob(null);
    
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    
    cleanup();
  }, [audioUrl, cleanup]);
  
  // Start recording function
  const startRecording = useCallback(async (): Promise<void> => {
    try {
      // Reset any previous recording state
      resetRecording();
      
      // Request access to the microphone with optimal audio settings for voice
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100, // High quality sample rate
          channelCount: 1 // Mono for better speech recognition
        } 
      });
      
      streamRef.current = stream;
      
      // Configure media recorder with high quality audio
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus', // Opus codec for better quality
        audioBitsPerSecond: 128000 // 128kbps for good voice quality
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        
        setAudioBlob(blob);
        setAudioUrl(url);
        setIsRecordingActive(false);
        
        chunksRef.current = [];
      };
      
      // Set up a limit of 60 seconds for recording
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          stopRecording();
          toast({
            title: "Recording stopped",
            description: "Maximum recording time reached (60 seconds)",
          });
        }
      }, 60000);
      
      // Start recording
      mediaRecorder.start();
      setIsRecordingActive(true);
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording failed",
        description: "Could not access microphone. Please check your browser permissions.",
        variant: "destructive"
      });
      resetRecording();
      throw error;
    }
  }, [resetRecording, toast]);
  
  // Stop recording function
  const stopRecording = useCallback(() => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') return;
    
    mediaRecorderRef.current.stop();
    
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    toast({
      title: "Recording stopped",
      description: `Recorded for ${recordingTime} seconds`,
    });
  }, [recordingTime, toast]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanup();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [cleanup, audioUrl]);
  
  return {
    isRecordingActive,
    recordingTime,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
    resetRecording,
    setAudioBlob
  };
}
