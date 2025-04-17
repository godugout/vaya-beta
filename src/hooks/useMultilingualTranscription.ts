
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface TranscriptionSegment {
  text: string;
  start: number;
  end: number;
  confidence: number;
  speakerId?: string;
  speakerName?: string;
  isEdited?: boolean;
}

export interface TranscriptionResult {
  segments: TranscriptionSegment[];
  language: string;
  fullText: string;
  metadata: {
    duration: number;
    speakers: Array<{ id: string; name?: string }>;
    confidence: number;
  };
}

export interface TranscriptionOptions {
  /** Language code for transcription */
  language?: 'en' | 'es' | 'hi' | 'gu' | 'auto';
  /** Whether to identify different speakers */
  speakerIdentification?: boolean;
  /** Whether to generate timestamps */
  generateTimestamps?: boolean;
  /** Maximum number of speakers to identify */
  maxSpeakers?: number;
  /** Whether to attempt to improve quality with AI */
  enhanceWithAI?: boolean;
}

export const useMultilingualTranscription = (options: TranscriptionOptions = {}) => {
  const {
    language = 'auto',
    speakerIdentification = true,
    generateTimestamps = true,
    maxSpeakers = 4,
    enhanceWithAI = true
  } = options;
  
  const [transcription, setTranscription] = useState<TranscriptionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const { toast } = useToast();
  
  // Cancel any in-progress transcription
  const cancelTranscription = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsProcessing(false);
      setProgress(0);
    }
  };

  // Convert a WebM audio blob to a mp3 for better compatibility
  const convertAudioFormat = async (audioBlob: Blob): Promise<Blob> => {
    try {
      // This would require more complex audio conversion logic, but for now 
      // we'll just use the original blob as WebM is supported by our transcription service
      return audioBlob;
    } catch (error) {
      console.warn("Audio conversion failed:", error);
      return audioBlob;
    }
  };

  // Update or correct a specific segment
  const updateSegment = (segmentIndex: number, updatedText: string) => {
    if (!transcription) return;
    
    const updatedSegments = [...transcription.segments];
    updatedSegments[segmentIndex] = {
      ...updatedSegments[segmentIndex],
      text: updatedText,
      isEdited: true
    };
    
    // Recalculate the full text from segments
    const fullText = updatedSegments.map(segment => segment.text).join(' ');
    
    setTranscription({
      ...transcription,
      segments: updatedSegments,
      fullText
    });
  };

  // Assign a name to a speaker
  const assignSpeakerName = (speakerId: string, name: string) => {
    if (!transcription) return;
    
    // Update speaker in metadata
    const updatedSpeakers = transcription.metadata.speakers.map(speaker => 
      speaker.id === speakerId ? { ...speaker, name } : speaker
    );
    
    // Update speaker name in all segments
    const updatedSegments = transcription.segments.map(segment => 
      segment.speakerId === speakerId ? { ...segment, speakerName: name } : segment
    );
    
    setTranscription({
      ...transcription,
      segments: updatedSegments,
      metadata: {
        ...transcription.metadata,
        speakers: updatedSpeakers
      }
    });
  };

  // Main transcription function
  const transcribeAudio = async (audioBlob: Blob | null): Promise<TranscriptionResult | null> => {
    if (!audioBlob) return null;
    
    try {
      // Cancel any previous transcription
      cancelTranscription();
      abortControllerRef.current = new AbortController();
      
      setIsProcessing(true);
      setProgress(5); // Start progress at 5%
      setTranscription(null);
      setError(null);
      
      // Convert audio format if needed
      setProgress(15);
      const processedAudio = await convertAudioFormat(audioBlob);
      
      // Convert blob to base64
      setProgress(25);
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
      setProgress(40);
      const { data, error } = await supabase.functions.invoke('advanced-transcribe', {
        body: { 
          audio: audioBase64,
          language,
          speaker_identification: speakerIdentification,
          generate_timestamps: generateTimestamps,
          max_speakers: maxSpeakers,
          enhance_with_ai: enhanceWithAI
        }
      });
      
      if (error) throw error;
      setProgress(90);
      
      // Process the transcription result
      if (data && data.segments) {
        const result: TranscriptionResult = {
          segments: data.segments.map((segment: any) => ({
            text: segment.text,
            start: segment.start,
            end: segment.end,
            confidence: segment.confidence,
            speakerId: segment.speaker_id,
            speakerName: segment.speaker_name || `Speaker ${segment.speaker_id}`
          })),
          language: data.language,
          fullText: data.full_text,
          metadata: {
            duration: data.metadata.duration,
            speakers: data.metadata.speakers,
            confidence: data.metadata.confidence
          }
        };
        
        setTranscription(result);
        setProgress(100);
        return result;
      }
      
      throw new Error("Invalid transcription response format");
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log('Transcription was cancelled');
        return null;
      }
      
      const errorMessage = (error as Error).message || "Transcription failed";
      setError(errorMessage);
      console.error('Transcription error:', error);
      
      toast({
        variant: "destructive",
        title: "Transcription failed",
        description: errorMessage,
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
    progress,
    error,
    transcribeAudio,
    cancelTranscription,
    updateSegment,
    assignSpeakerName
  };
};
