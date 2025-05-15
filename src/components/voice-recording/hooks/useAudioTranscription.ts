
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface TranscriptionOptions {
  language?: 'en' | 'hi' | 'gu' | 'auto';
  enhanceWithAI?: boolean;
}

export const useAudioTranscription = (options: TranscriptionOptions = {}) => {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const transcribeAudio = async (audioBlob: Blob): Promise<string | null> => {
    if (!audioBlob) return null;

    try {
      setIsProcessing(true);
      setError(null);
      
      // Convert blob to base64
      const reader = new FileReader();
      const audioBase64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64data = reader.result as string;
          const base64Content = base64data.split(',')[1];
          resolve(base64Content);
        };
      });
      
      reader.readAsDataURL(audioBlob);
      const audioBase64 = await audioBase64Promise;
      
      // Call Supabase Edge Function for transcription
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { 
          audio: audioBase64,
          language: options.language || 'en',
          enhanceWithAI: options.enhanceWithAI !== false
        }
      });
      
      if (error) {
        // Check if it's a quota error
        const errorMessage = error.message || '';
        if (errorMessage.includes('non-2xx') || errorMessage.includes('quota')) {
          setError('OpenAI API quota exceeded. Please try again later or contact support.');
          throw new Error('OpenAI API quota exceeded. Please try again later or contact support.');
        }
        throw error;
      }
      
      if (data && data.text) {
        setTranscription(data.text);
        return data.text;
      }
      
      return null;
    } catch (error) {
      console.error('Transcription error:', error);
      
      // Set appropriate error message based on the error
      const errorMessage = error instanceof Error ? error.message : "Could not transcribe audio";
      
      // Check for quota error in the error message
      if (typeof errorMessage === 'string' && 
         (errorMessage.includes('quota') || 
          errorMessage.includes('insufficient_quota') || 
          errorMessage.includes('billing'))) {
        setError('OpenAI API quota exceeded. Please try again later or contact support.');
      } else if (typeof errorMessage === 'string' && errorMessage.includes('non-2xx')) {
        setError('Transcription service unavailable. Please try again later.');
      } else {
        setError(errorMessage);
      }
      
      toast({
        variant: "destructive",
        title: "Transcription failed",
        description: errorMessage,
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    transcription,
    isProcessing,
    transcribeAudio,
    setTranscription,
    error
  };
};
