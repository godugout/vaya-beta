
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAudioTranscription = () => {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const transcribeAudio = async (audioBlob: Blob | null) => {
    if (!audioBlob) return null;
    
    try {
      setIsProcessing(true);
      
      // Convert blob to base64
      const reader = new FileReader();
      const audioBase64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64data = reader.result as string;
          // Extract only the base64 part
          const base64Content = base64data.split(',')[1];
          resolve(base64Content);
        };
      });
      reader.readAsDataURL(audioBlob);
      
      const audioBase64 = await audioBase64Promise;
      
      // Call Supabase Edge Function for transcription
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { audio: audioBase64 }
      });
      
      if (error) throw error;
      
      setTranscription(data.text);
      return data.text;
      
    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        variant: "destructive",
        title: "Transcription failed",
        description: "We couldn't transcribe your audio. You can still save it.",
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
