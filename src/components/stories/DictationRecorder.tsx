
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Mic, AudioWaveform, AlertCircle, Check } from "lucide-react";
import { useDictation } from "@/hooks/useDictation";
import AudioPreview from "@/components/audio/AudioPreview";
import TranscriptionDisplay from "@/components/audio/TranscriptionDisplay";

interface DictationRecorderProps {
  onContentChange?: (content: string) => void;
  onTitleChange?: (title: string) => void;
  onSave?: (data: { audioBlob: Blob | null; content: string }) => void;
  language?: 'en' | 'hi' | 'gu';
}

const DictationRecorder: React.FC<DictationRecorderProps> = ({
  onContentChange,
  onTitleChange,
  onSave,
  language = 'en'
}) => {
  const [content, setContent] = useState('');
  const {
    isRecording,
    audioBlob,
    transcription,
    isProcessing,
    transcriptionError,
    startRecording,
    stopRecording,
    toggleRecording,
    resetRecording,
    transcribe
  } = useDictation({ language });

  // Update parent component when transcription changes
  useEffect(() => {
    if (transcription) {
      setContent(transcription);
      onContentChange?.(transcription);
      
      // Extract first sentence for title suggestion
      const firstSentence = transcription.split('.')[0];
      if (firstSentence && onTitleChange) {
        onTitleChange(firstSentence.length > 50 
          ? firstSentence.substring(0, 47) + '...' 
          : firstSentence);
      }
    }
  }, [transcription, onContentChange, onTitleChange]);

  // Handle save action
  const handleSave = async () => {
    if (onSave) {
      // If we don't have a transcription yet but we have audio, try to transcribe
      if (!transcription && audioBlob && !isProcessing) {
        try {
          await transcribe(audioBlob);
        } catch (error) {
          console.error("Error transcribing:", error);
          // Continue with save even if transcription fails
        }
      }
      
      onSave({
        audioBlob,
        content: content || transcription || ''
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant={
          isRecording ? "destructive" : 
          audioBlob ? "secondary" : 
          "outline"
        }>
          {isRecording 
            ? "Recording..." 
            : audioBlob 
              ? "Recorded" 
              : "Ready"
          }
        </Badge>
        
        <Badge variant="outline" className="ml-auto">
          {language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Gujarati'}
        </Badge>
      </div>
      
      {!audioBlob ? (
        <Card className={`p-8 flex flex-col items-center justify-center text-center space-y-4 border-dashed ${
          isRecording ? 'border-red-500 bg-red-500/5 animate-pulse' : 'border-gray-300'
        }`}>
          <Button
            onClick={toggleRecording}
            size="lg"
            className={`rounded-full h-16 w-16 ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : ''
            }`}
          >
            <Mic className={`h-6 w-6 ${isRecording ? 'animate-pulse' : ''}`} />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            {isRecording 
              ? "Tap to stop recording" 
              : "Tap to start recording your story"
            }
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          <AudioPreview 
            audioBlob={audioBlob} 
            disabled={isProcessing}
          />
          
          {isProcessing ? (
            <Alert className="my-4">
              <AudioWaveform className="h-4 w-4" />
              <AlertDescription>
                Transcribing your recording...
              </AlertDescription>
            </Alert>
          ) : transcriptionError ? (
            <TranscriptionDisplay 
              transcription={null}
              error={transcriptionError}
            />
          ) : transcription ? (
            <TranscriptionDisplay transcription={transcription} />
          ) : (
            <Button 
              onClick={() => transcribe(audioBlob)} 
              variant="secondary" 
              className="w-full"
            >
              <AudioWaveform className="mr-2 h-4 w-4" />
              Transcribe Recording
            </Button>
          )}
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={resetRecording}
              className="w-full"
            >
              Record Again
            </Button>
            
            <Button 
              onClick={handleSave}
              className="w-full"
            >
              <Check className="mr-2 h-4 w-4" />
              Use {transcription ? 'Transcription' : 'Recording'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DictationRecorder;
