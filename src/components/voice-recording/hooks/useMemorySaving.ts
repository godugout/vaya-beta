
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseMemorySavingProps {
  onMemorySaved?: (data: { 
    audioUrl?: string; 
    transcription?: string;
  }) => void;
}

interface UseMemorySavingReturn {
  isProcessing: boolean;
  error: Error | null;
  hasSaved: boolean;
  saveMemory: (audioBlob: Blob, transcription?: string | null) => Promise<void>;
  resetSavedState: () => void;
}

export function useMemorySaving({ onMemorySaved }: UseMemorySavingProps = {}): UseMemorySavingReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasSaved, setHasSaved] = useState(false);
  
  const resetSavedState = useCallback(() => {
    setHasSaved(false);
    setError(null);
  }, []);
  
  const saveMemory = useCallback(async (audioBlob: Blob, transcription?: string | null): Promise<void> => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Upload audio file to storage
      const fileName = `audio-memory-${Date.now()}.webm`;
      
      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('memory-recordings')
        .upload(fileName, audioBlob, {
          contentType: 'audio/webm'
        });
      
      if (uploadError) {
        throw new Error(`Error uploading audio: ${uploadError.message}`);
      }
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('memory-recordings')
        .getPublicUrl(fileName);
      
      const audioUrl = publicUrlData.publicUrl;
      
      // Save memory metadata in database
      const { error: insertError } = await supabase
        .from('memories')
        .insert({
          audio_url: audioUrl,
          transcription: transcription || null,
          type: 'audio',
        });
      
      if (insertError) {
        throw new Error(`Error saving memory data: ${insertError.message}`);
      }
      
      setHasSaved(true);
      
      // Notify caller if callback provided
      if (onMemorySaved) {
        onMemorySaved({
          audioUrl,
          transcription: transcription || undefined
        });
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error saving memory';
      console.error('Memory saving error:', errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));
      setHasSaved(false);
      
    } finally {
      setIsProcessing(false);
    }
  }, [onMemorySaved]);
  
  return {
    isProcessing,
    error,
    hasSaved,
    saveMemory,
    resetSavedState
  };
}
