
import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ImmersiveRecordingOptions {
  onSave?: (data: { 
    audioUrl: string; 
    transcription?: string;
  }) => void;
}

export const useImmersiveRecording = (options: ImmersiveRecordingOptions = {}) => {
  const [isImmersiveMode, setIsImmersiveMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const startImmersiveRecording = useCallback(() => {
    setIsImmersiveMode(true);
  }, []);

  const stopImmersiveRecording = useCallback(() => {
    setIsImmersiveMode(false);
  }, []);

  const handleRecordingComplete = useCallback(async (data: { 
    audioBlob: Blob; 
    transcription?: string;
  }) => {
    if (!data.audioBlob) {
      toast({
        variant: "destructive",
        title: "Recording error",
        description: "No audio was recorded. Please try again.",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Generate a unique filename
      const fileName = `${crypto.randomUUID()}.webm`;
      
      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('stories')
        .upload(fileName, data.audioBlob);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('stories')
        .getPublicUrl(fileName);
      
      // Call the onSave callback with the results
      options.onSave?.({
        audioUrl: publicUrl,
        transcription: data.transcription,
      });
      
      toast({
        title: "Memory Saved",
        description: "Your audio memory has been saved successfully.",
      });
      
      // Exit immersive mode
      setIsImmersiveMode(false);
      
    } catch (error) {
      console.error("Error saving recording:", error);
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "There was a problem saving your recording. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [options, toast]);

  return {
    isImmersiveMode,
    isProcessing,
    startImmersiveRecording,
    stopImmersiveRecording,
    handleRecordingComplete
  };
};
