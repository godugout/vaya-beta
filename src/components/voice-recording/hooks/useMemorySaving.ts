
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface MemorySavingOptions {
  onMemorySaved?: (data: { 
    audioUrl?: string;
    transcription?: string;
  }) => void;
}

export const useMemorySaving = ({ onMemorySaved }: MemorySavingOptions = {}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

  const saveMemory = async (audioBlob: Blob | null, transcription: string | null) => {
    if (!audioBlob) return;
    
    setIsProcessing(true);
    try {
      // Get the session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to save memories.",
          variant: "destructive",
        });
        return null;
      }
      
      // Upload audio to Supabase Storage
      const filename = `memory-${Date.now()}.webm`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('memory_media')
        .upload(filename, audioBlob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('memory_media')
        .getPublicUrl(filename);
      
      setAudioUrl(publicUrl);
      
      // Save to the memories table
      const { data, error } = await supabase
        .from('memories')
        .insert({
          user_id: session.user.id,
          memory_type: 'audio',
          title: transcription ? transcription.slice(0, 50) + "..." : "Audio Memory",
          description: transcription || "",
          content_url: publicUrl,
          metadata: { duration: 60 } // Placeholder duration
        })
        .select();
      
      if (error) throw error;

      // Provide haptic feedback on success
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }

      setHasSaved(true);
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["memories"] });
      
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
