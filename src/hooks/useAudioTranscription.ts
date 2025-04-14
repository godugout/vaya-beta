
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UseAudioTranscriptionReturn {
  transcription: string | null;
  isProcessing: boolean;
  error: Error | null;
  transcribeAudio: (audioBlob: Blob) => Promise<string | null>;
  setTranscription: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useAudioTranscription(): UseAudioTranscriptionReturn {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
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
      
      // Upload the audio to Supabase storage for persistence
      const filePath = `transcriptions/${Date.now()}.webm`;
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, audioBlob);
      
      if (uploadError) {
        console.warn('Failed to upload audio for future reference:', uploadError);
        // Continue with transcription even if storage fails
      }
      
      // Call the transcription API
      try {
        const response = await fetch('/api/transcribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ audio: base64Audio })
        });
        
        if (!response.ok) {
          throw new Error(`Transcription error: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.text) {
          throw new Error('No transcription returned');
        }
        
        // Save the transcription to state
        setTranscription(data.text);
        
        // Log the transcription activity
        try {
          await supabase
            .from('user_activities')
            .insert({
              activity_type: 'audio_transcribed',
              metadata: {
                length: audioBlob.size,
                transcription_length: data.text.length,
                timestamp: new Date().toISOString()
              }
            });
        } catch (logError) {
          console.warn('Failed to log transcription activity:', logError);
        }
        
        return data.text;
      } catch (fetchError) {
        // Fallback to simulated transcription if API is not available
        console.warn('Using fallback transcription due to error:', fetchError);
        // Simulate a realistic delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        const fallbackText = "This is a simulated transcription since the API is unavailable.";
        setTranscription(fallbackText);
        toast({
          title: "Using fallback transcription",
          description: "Transcription API is unavailable. Using simulated text.",
          variant: "default"
        });
        return fallbackText;
      }
      
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
    transcribeAudio,
    setTranscription
  };
}
