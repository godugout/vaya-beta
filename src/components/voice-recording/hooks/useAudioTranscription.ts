
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
  const { toast } = useToast();

  const transcribeAudio = async (audioBlob: Blob): Promise<string | null> => {
    if (!audioBlob) return null;

    try {
      setIsProcessing(true);
      
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
      
      if (error) throw error;
      
      if (data && data.text) {
        setTranscription(data.text);
        return data.text;
      }
      
      return null;
    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        variant: "destructive",
        title: "Transcription failed",
        description: error instanceof Error ? error.message : "Could not transcribe audio",
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
    setTranscription
  };
};
