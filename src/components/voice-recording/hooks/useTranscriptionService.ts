
import { useVoskTranscription } from './useVoskTranscription';
import { useAudioTranscription } from './useAudioTranscription';

export interface TranscriptionOptions {
  service: 'vosk' | 'openai';
  language?: 'en' | 'hi' | 'gu' | 'auto';
  enhanceWithAI?: boolean;
}

export const useTranscriptionService = (options: TranscriptionOptions = { service: 'vosk' }) => {
  const { service = 'vosk', ...otherOptions } = options;
  
  // Use the selected transcription service
  const voskTranscription = useVoskTranscription(otherOptions);
  const openaiTranscription = useAudioTranscription(otherOptions);
  
  // Select the appropriate service
  const selectedService = service === 'vosk' ? voskTranscription : openaiTranscription;
  
  return {
    ...selectedService,
    serviceType: service
  };
};
