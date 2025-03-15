
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MemorySavingOptions {
  onMemorySaved?: (data: { 
    audioUrl?: string;
    transcription?: string;
  }) => void;
}

export const useMemorySaving = ({ onMemorySaved }: MemorySavingOptions = {}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

  const saveMemory = async (audioBlob: Blob | null, transcription: string | null) => {
    if (!audioBlob) return;
    
    setIsProcessing(true);
    try {
      // Upload audio to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('memories')
        .upload(`memory-${Date.now()}.webm`, audioBlob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('memories')
        .getPublicUrl(uploadData.path);
      
      setAudioUrl(publicUrl);

      // Provide haptic feedback on success
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }

      setHasSaved(true);
      
      toast({
        title: "Memory saved",
        description: "Your memory has been saved successfully",
      });

      // Call the callback with data
      if (onMemorySaved) {
        onMemorySaved({
          audioUrl: publicUrl,
          transcription: transcription || undefined
        });
      }

      return publicUrl;

    } catch (error) {
      console.error('Error saving memory:', error);
      toast({
        variant: "destructive",
        title: "Failed to save",
        description: "There was an error saving your memory. Please try again.",
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const resetSavedState = () => {
    setAudioUrl(null);
    setHasSaved(false);
  };

  return {
    isProcessing,
    audioUrl,
    hasSaved,
    saveMemory,
    resetSavedState
  };
};
