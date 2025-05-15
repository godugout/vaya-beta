
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, AudioWaveform, Loader2, PauseCircle, StopCircle, Check } from "lucide-react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useTranscriptionService } from "@/components/voice-recording/hooks/useTranscriptionService";
import { useToast } from "@/components/ui/use-toast";
import TranscriptionDisplay from "@/components/audio/TranscriptionDisplay";
import { Badge } from "@/components/ui/badge";

interface DictationRecorderProps {
  onContentChange: (content: string) => void;
  onTitleChange?: (title: string) => void;
  onSave?: (data: { audioBlob: Blob | null; content: string }) => void;
  language?: 'en' | 'hi' | 'gu';
  showProgress?: boolean;
}

const DictationRecorder = ({ 
  onContentChange, 
  onTitleChange,
  onSave,
  language = 'en',
  showProgress = true
}: DictationRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showTranscription, setShowTranscription] = useState(false);
  const { toast } = useToast();

  // Use the combined hook with Vosk as default service
  const {
    isRecordingActive,
    audioBlob,
    startRecording,
    stopRecording,
    setAudioBlob
  } = useVoiceRecorder();

  const {
    transcription,
    isProcessing,
    transcribeAudio,
    error,
    serviceType
  } = useTranscriptionService({
    service: 'vosk',  // Use Vosk by default
    language,
    enhanceWithAI: true
  });

  // Handle recording toggle
  const handleToggleRecording = async () => {
    if (isRecordingActive) {
      stopRecording();
      setIsRecording(false);
    } else {
      setShowTranscription(false);
      await startRecording();
      setIsRecording(true);
    }
  };

  // Auto-transcribe when recording stops and we have an audio blob
  useEffect(() => {
    if (audioBlob && !isRecordingActive && !transcription) {
      handleTranscribe();
    }
  }, [audioBlob, isRecordingActive]);

  // Handle transcription
  const handleTranscribe = async () => {
    if (!audioBlob) return;
    
    try {
      const text = await transcribeAudio(audioBlob);
      
      if (text) {
        onContentChange(text);
        
        // Extract title from first sentence
        if (onTitleChange) {
          const firstSentence = text.split('.')[0];
          if (firstSentence) {
            const title = firstSentence.length > 50 
              ? firstSentence.substring(0, 47) + '...' 
              : firstSentence;
            onTitleChange(title);
          }
        }
        
        setShowTranscription(true);
        toast({
          title: "Transcription complete",
          description: "Your recording has been transcribed.",
        });
      }
    } catch (error) {
      console.error('Error transcribing:', error);
      toast({
        variant: "destructive",
        title: "Transcription failed",
        description: "Failed to transcribe your recording. You can still save it or try again.",
      });
    }
  };

  // Handle save action
  const handleSave = () => {
    if (onSave && (transcription || audioBlob)) {
      onSave({
        audioBlob,
        content: transcription || ""
      });
    }
  };

  // Reset recording
  const handleReset = () => {
    setAudioBlob(null);
    setIsRecording(false);
    setShowTranscription(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant={serviceType === 'vosk' ? "secondary" : "outline"} className="text-xs">
          {serviceType === 'vosk' ? 'Using Offline Transcription' : 'Using OpenAI'}
        </Badge>
      </div>

      {!audioBlob ? (
        <Button
          onClick={handleToggleRecording}
          variant="outline"
          size="lg"
          className={`w-full h-20 ${
            isRecording ? 'bg-red-50 border-red-500 text-red-600 hover:bg-red-100' : ''
          }`}
        >
          {isRecording ? (
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center mb-2">
                <span className="animate-pulse mr-2"><StopCircle size={20} /></span>
                <span>Recording... click to stop</span>
              </div>
              <AudioWaveform className="h-4 w-16 animate-pulse" />
            </div>
          ) : (
            <div className="flex items-center">
              <Mic className="mr-2 h-5 w-5" />
              <span>Click to start recording</span>
            </div>
          )}
        </Button>
      ) : (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          {showTranscription ? (
            <TranscriptionDisplay 
              transcription={transcription}
              isGenerating={isProcessing}
              error={error}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              {isProcessing ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
                  <p className="text-sm text-gray-600">Transcribing your recording...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Check className="h-10 w-10 text-green-500 mb-4" />
                  <p className="text-sm text-gray-600">Recording complete!</p>
                  <div className="mt-4 flex flex-col items-center">
                    <Button 
                      onClick={handleTranscribe} 
                      variant="secondary" 
                      disabled={isProcessing}
                    >
                      Generate Transcription
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button 
              onClick={handleToggleRecording} 
              variant="outline"
              className="flex-1"
            >
              <Mic className="mr-2 h-4 w-4" />
              Record Again
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={isProcessing}
              variant="default"
              className="flex-1"
            >
              <Check className="mr-2 h-4 w-4" />
              {transcription ? 'Save with Transcription' : 'Save Recording'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DictationRecorder;
