
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

  // Main transcription function
  const transcribeAudio = async (audioBlob: Blob | null): Promise<string | null> => {
    if (!audioBlob) return null;
    
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
      const processedAudio = await preprocessAudio(audioBlob);
      
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
      reader.readAsDataURL(processedAudio);
      
      const audioBase64 = await audioBase64Promise;
      
      // Call Supabase Edge Function for transcription with options
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
      
      if (error) throw error;
      
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
        description: "We couldn't transcribe your audio. You can still save it.",
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
