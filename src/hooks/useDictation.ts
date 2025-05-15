
import { useState, useEffect } from 'react';
import { useVoiceRecorder } from './useVoiceRecorder';
import { useAudioTranscription, TranscriptionOptions } from '@/components/voice-recording/hooks/useAudioTranscription';

interface DictationOptions extends TranscriptionOptions {
  maxDuration?: number;
}

export const useDictation = (options: DictationOptions = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
  
  const {
    isRecordingActive,
    audioBlob,
    duration,
    startRecording: startVoiceRecording,
    stopRecording: stopVoiceRecording,
    setAudioBlob
  } = useVoiceRecorder();
  
  const {
    transcription,
    isProcessing,
    transcribeAudio,
    error
  } = useAudioTranscription({
    language: options.language,
    enhanceWithAI: true
  });

  // Sync external and internal recording state
  useEffect(() => {
    if (isRecording !== isRecordingActive) {
      setIsRecording(isRecordingActive);
    }
  }, [isRecordingActive]);

  // Handle max duration
  useEffect(() => {
    if (options.maxDuration && isRecording && duration >= options.maxDuration) {
      stopRecording();
    }
  }, [isRecording, duration, options.maxDuration]);

  const startRecording = () => {
    setTranscriptionError(null);
    startVoiceRecording();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (isRecordingActive) {
      stopVoiceRecording();
    }
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setTranscriptionError(null);
  };

  const transcribe = async (blob: Blob) => {
    try {
      const text = await transcribeAudio(blob);
      if (!text && error) {
        setTranscriptionError(error);
      }
      return text;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Transcription failed";
      setTranscriptionError(errorMessage);
      throw err;
    }
  };

  return {
    isRecording,
    audioBlob,
    duration,
    transcription,
    isProcessing,
    transcriptionError,
    startRecording,
    stopRecording,
    toggleRecording,
    resetRecording,
    transcribe
  };
};
