
import { useToast } from "@/components/ui/use-toast";

interface TranscribeOptions {
  audio: string; // base64 encoded audio
  language?: string;
}

export async function transcribeAudio(options: TranscribeOptions): Promise<{ text: string }> {
  const { audio, language } = options;
  
  // If we have the Supabase edge function, use it
  try {
    const response = await fetch('/api/transcribe-audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audio, language }),
    });
    
    if (!response.ok) {
      throw new Error(`Transcription failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Transcription API error:', error);
    
    // Fallback to a simulated response
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          text: "This is a simulated transcription. The actual transcription service is not available."
        });
      }, 2000);
    });
  }
}

export function useTranscribe() {
  const { toast } = useToast();
  
  const transcribe = async (audioBlob: Blob): Promise<string | null> => {
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
      const result = await transcribeAudio({ audio: base64Audio });
      return result.text;
    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        title: "Transcription failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
      return null;
    }
  };
  
  return { transcribe };
}
