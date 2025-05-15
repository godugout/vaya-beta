
import { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Define model download URLs for different languages
const MODEL_URLS = {
  en: 'https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip',
  hi: 'https://alphacephei.com/vosk/models/vosk-model-small-hi-0.22.zip',
  gu: 'https://alphacephei.com/vosk/models/vosk-model-small-gu-0.4.zip',
  auto: 'https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip', // Default to English for auto
};

export interface VoskTranscriptionOptions {
  language?: 'en' | 'hi' | 'gu' | 'auto';
  enhanceWithAI?: boolean;
}

export const useVoskTranscription = (options: VoskTranscriptionOptions = {}) => {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const workerRef = useRef<Worker | null>(null);
  const { toast } = useToast();
  
  const language = options.language || 'en';

  // Initialize the Vosk worker
  const initializeWorker = async (): Promise<Worker> => {
    if (workerRef.current) return workerRef.current;
    
    // Create a new worker
    const voskWorker = new Worker(
      new URL('/src/workers/vosk-worker.js', import.meta.url),
      { type: 'module' }
    );
    
    // Set up message handling
    voskWorker.onmessage = (e) => {
      const { type, data } = e.data;
      
      switch (type) {
        case 'progress':
          setProgress(data.percent);
          break;
        case 'ready':
          console.log('Vosk worker is ready');
          break;
        case 'error':
          setError(data.error);
          toast({
            title: 'Transcription Error',
            description: data.error,
            variant: 'destructive',
          });
          setIsProcessing(false);
          break;
        default:
          break;
      }
    };
    
    // Initialize the worker with the selected language model
    voskWorker.postMessage({ 
      command: 'init', 
      modelUrl: MODEL_URLS[language] 
    });
    
    workerRef.current = voskWorker;
    return voskWorker;
  };
  
  // Clean up worker when component unmounts
  const cleanupWorker = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  };

  // Main transcription function
  const transcribeAudio = async (audioBlob: Blob): Promise<string | null> => {
    if (!audioBlob) return null;
    
    try {
      setIsProcessing(true);
      setError(null);
      setProgress(0);
      
      // Convert to an audio format that Vosk can process if needed
      let processedBlob = audioBlob;
      if (audioBlob.type !== 'audio/wav') {
        // For simplicity, we'll use the original blob
        // In a real implementation, you might want to convert it to WAV
        console.log('Using original audio format:', audioBlob.type);
      }
      
      // Initialize worker
      const worker = await initializeWorker();
      
      // Create a promise that will be resolved when transcription is complete
      const transcriptionPromise = new Promise<string>((resolve, reject) => {
        if (!worker) {
          reject(new Error('Failed to initialize transcription worker'));
          return;
        }
        
        // Set up one-time message handler for transcription result
        const messageHandler = (e: MessageEvent) => {
          const { type, data } = e.data;
          
          if (type === 'transcription') {
            worker.removeEventListener('message', messageHandler);
            resolve(data.text);
          } else if (type === 'error') {
            worker.removeEventListener('message', messageHandler);
            reject(new Error(data.error));
          }
        };
        
        worker.addEventListener('message', messageHandler);
        
        // Read the audio file as array buffer
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            // Send the audio data to the worker
            worker.postMessage({
              command: 'transcribe',
              audio: e.target.result,
            });
          } else {
            reject(new Error('Failed to read audio file'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read audio file'));
        reader.readAsArrayBuffer(processedBlob);
      });
      
      // Wait for transcription to complete
      setProgress(10);
      const result = await transcriptionPromise;
      setProgress(100);
      
      // Set the transcription state
      setTranscription(result);
      return result;
      
    } catch (error) {
      console.error('Transcription error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown transcription error';
      setError(errorMessage);
      
      toast({
        title: 'Transcription failed',
        description: errorMessage,
        variant: 'destructive',
      });
      
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    transcription,
    isProcessing,
    error,
    progress,
    transcribeAudio,
    setTranscription,
    cleanupWorker,
  };
};
