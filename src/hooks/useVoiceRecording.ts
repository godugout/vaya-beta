
import { useState, useRef, useCallback } from 'react';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';

export interface VoiceRecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  volume: number;
  audioBlob: Blob | null;
  error: string | null;
}

export interface VoiceRecordingOptions {
  maxDuration?: number;
  quality?: 'low' | 'medium' | 'high';
  autoStop?: boolean;
  silenceThreshold?: number;
}

export const useVoiceRecording = (options: VoiceRecordingOptions = {}) => {
  const { announceToScreenReader } = useAccessibilityContext();
  const [state, setState] = useState<VoiceRecordingState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
    volume: 0,
    audioBlob: null,
    error: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  const startRecording = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, error: null }));
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: options.quality === 'high' ? 48000 : 44100,
        }
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
        bitsPerSecond: options.quality === 'high' ? 128000 : 64000,
      });

      audioChunksRef.current = [];
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setState(prev => ({ ...prev, audioBlob, isRecording: false }));
        announceToScreenReader('Recording stopped');
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(100);
      startTimeRef.current = Date.now();
      
      // Start duration timer
      timerRef.current = window.setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setState(prev => ({ ...prev, duration: elapsed }));
        
        if (options.maxDuration && elapsed >= options.maxDuration) {
          stopRecording();
        }
      }, 100);

      setState(prev => ({ ...prev, isRecording: true, duration: 0 }));
      announceToScreenReader('Recording started');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start recording';
      setState(prev => ({ ...prev, error: errorMessage }));
      announceToScreenReader(`Recording failed: ${errorMessage}`);
    }
  }, [options.maxDuration, options.quality, announceToScreenReader]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [state.isRecording]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording && !state.isPaused) {
      mediaRecorderRef.current.pause();
      setState(prev => ({ ...prev, isPaused: true }));
      announceToScreenReader('Recording paused');
    }
  }, [state.isRecording, state.isPaused, announceToScreenReader]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording && state.isPaused) {
      mediaRecorderRef.current.resume();
      setState(prev => ({ ...prev, isPaused: false }));
      announceToScreenReader('Recording resumed');
    }
  }, [state.isRecording, state.isPaused, announceToScreenReader]);

  const resetRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setState({
      isRecording: false,
      isPaused: false,
      duration: 0,
      volume: 0,
      audioBlob: null,
      error: null,
    });
    announceToScreenReader('Recording reset');
  }, [announceToScreenReader]);

  return {
    state,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
  };
};
