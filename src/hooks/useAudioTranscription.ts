
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseAudioTranscriptionReturn {
  transcription: string | null;
  isProcessing: boolean;
  error: Error | null;
  transcribeAudio: (audioBlob: Blob) => Promise<string | null>;
}

export function useAudioTranscription(): UseAudioTranscriptionReturn {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const transcribeAudio = async (audioBlob: Blob): Promise<string | null> => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Convert blob to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const base64String = reader.result as string;
          const base64Data = base64String.split(',')[1]; // Remove the data:audio/webm;base64, part
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(audioBlob);
      });
      
      const base64Audio = await base64Promise;
      
      // Call the transcription function
      const { data, error: functionError } = await supabase.functions.invoke('voice-to-text', {
        body: { audio: base64Audio }
      });
      
      if (functionError) {
        throw new Error(`Transcription error: ${functionError.message}`);
      }
      
      if (!data || !data.text) {
        throw new Error('No transcription returned');
      }
      
      setTranscription(data.text);
      return data.text;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error during transcription';
      console.error('Transcription error:', errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));
      return null;
      
    } finally {
      setIsProcessing(false);
    }
  };
  
  return {
    transcription,
    isProcessing,
    error,
    transcribeAudio
  };
}
