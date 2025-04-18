
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TranscriptionOptions {
  /** Model to use for transcription */
  model?: string;
  /** Language code (auto detect if not specified) */
  language?: string;
  /** Whether to include word-level timestamps */
  wordTimestamps?: boolean;
  /** Whether to use streaming mode for real-time results */
  streaming?: boolean;
  /** Whether to filter out background noise */
  noiseFiltering?: boolean;
}

interface TranscriptionResult {
  text: string;
  confidence?: number;
  language?: string;
  wordTimestamps?: Array<{word: string, start: number, end: number}>;
}

export const useAudioTranscription = (options: TranscriptionOptions = {}) => {
  const {
    model = "whisper-1",
    language,
    wordTimestamps = false,
    streaming = false,
    noiseFiltering = true
  } = options;
  
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [wordTimings, setWordTimings] = useState<Array<{word: string, start: number, end: number}>>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const { toast } = useToast();
  
  // Cancel any in-progress transcription
  const cancelTranscription = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsProcessing(false);
    }
  };

  // Process audio for better transcription quality
  const preprocessAudio = async (audioBlob: Blob): Promise<Blob> => {
    if (!noiseFiltering) return audioBlob;
    
    try {
      // For now, we return the original blob since browser APIs don't 
      // provide direct audio preprocessing capabilities
      return audioBlob;
    } catch (error) {
      console.warn("Audio preprocessing failed:", error);
      return audioBlob;
    }
  };

  // Helper function to verify the audio format and size
  const verifyAudioBlob = (blob: Blob): boolean => {
    console.log(`Audio type: ${blob.type}, size: ${blob.size} bytes`);
    
    // Check if the blob is too small to be valid audio
    if (blob.size < 100) {
      console.error("Audio data is too small to be valid");
      return false;
    }
    
    // Check if the blob has a valid MIME type
    const validTypes = ['audio/webm', 'audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/ogg'];
    if (!validTypes.some(type => blob.type.includes(type)) && blob.type !== '') {
      console.warn(`Unexpected audio format: ${blob.type}`);
      // We'll still try to process it, just a warning
    }
    
    return true;
  };

  // Main transcription function
  const transcribeAudio = async (audioBlob: Blob | null): Promise<string | null> => {
    if (!audioBlob) {
      console.error("No audio blob provided");
      return null;
    }
    
    // Verify the audio blob
    if (!verifyAudioBlob(audioBlob)) {
      toast({
        variant: "destructive",
        title: "Invalid audio",
        description: "The audio recording appears to be corrupted or too short.",
      });
      return null;
    }
    
    try {
      // Cancel any previous transcription
      cancelTranscription();
      abortControllerRef.current = new AbortController();
      
      setIsProcessing(true);
      setTranscription(null);
      setConfidence(null);
      setDetectedLanguage(null);
      setWordTimings([]);
      
      // Preprocess audio for better quality
      console.log("Preprocessing audio...");
      const processedAudio = await preprocessAudio(audioBlob);
      
      // Convert blob to base64
      console.log("Converting audio to base64...");
      const reader = new FileReader();
      const audioBase64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          try {
            const base64data = reader.result as string;
            // Extract only the base64 part
            const base64Content = base64data.split(',')[1];
            resolve(base64Content);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = (error) => reject(error);
      });
      
      reader.readAsDataURL(processedAudio);
      const audioBase64 = await audioBase64Promise;
      
      console.log(`Base64 audio length: ${audioBase64.length}`);
      
      // Call Supabase Edge Function for transcription with options
      console.log("Calling transcribe-audio edge function...");
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { 
          audio: audioBase64,
          model,
          language,
          response_format: wordTimestamps ? "verbose_json" : "json",
          temperature: 0.2, // Lower temperature for higher accuracy
          noise_filtering: noiseFiltering
        }
      });
      
      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(`Transcription service error: ${error.message}`);
      }
      
      console.log("Received response from transcribe-audio:", data);
      
      if (data.error) {
        console.error("Transcription API error:", data.error);
        throw new Error(`Transcription failed: ${data.error}`);
      }
      
      // Handle result based on format
      if (typeof data.text === 'string') {
        // Simple text format
        setTranscription(data.text);
        return data.text;
      } else if (data.results) {
        // Advanced format with metadata
        const result = data.results as TranscriptionResult;
        setTranscription(result.text);
        
        if (result.confidence) {
          setConfidence(result.confidence);
        }
        
        if (result.language) {
          setDetectedLanguage(result.language);
        }
        
        if (result.wordTimestamps) {
          setWordTimings(result.wordTimestamps);
        }
        
        return result.text;
      }
      
      if (!data.text) {
        throw new Error("No transcription text returned");
      }
      
      return null;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log('Transcription was cancelled');
        return null;
      }
      
      console.error('Transcription error:', error);
      toast({
        variant: "destructive",
        title: "Transcription failed",
        description: (error as Error).message || "We couldn't transcribe your audio. You can still save it.",
      });
      return null;
    } finally {
      setIsProcessing(false);
      abortControllerRef.current = null;
    }
  };

  return {
    transcription,
    isProcessing,
    confidence,
    detectedLanguage,
    wordTimings,
    transcribeAudio,
    cancelTranscription,
    setTranscription
  };
};
