import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Mic, Waveform, AlertCircle, Check } from "lucide-react";
import { useDictation } from "@/hooks/useDictation";
import AudioPreview from "@/components/audio/AudioPreview";
import TranscriptionDisplay from "@/components/audio/TranscriptionDisplay";

interface DictationRecorderProps {
  onContentChange: (content: string) => void;
  onTitleChange: (title: string) => void;
  onSave: (data: { audioBlob: Blob | null; content: string }) => void;
  language: 'en' | 'hi' | 'gu';
}

const DictationRecorder = ({
  onContentChange,
  onTitleChange,
  onSave,
  language
}: DictationRecorderProps) => {
  const [transcription, setTranscription] = useState<string | null>(null);
  const {
    isRecording,
    audioBlob,
    audioUrl,
    recordingDuration,
    formattedDuration,
    volumeLevel,
    waveformData,
    isTranscribing,
    transcribe,
    startRecording,
    stopRecording,
    reset
  } = useDictation({
    language: language,
    onTranscriptionComplete: (text) => {
      setTranscription(text);
      onContentChange(text);
      onTitleChange(text.split('.')[0]);
    }
  });
  
  const handleSave = async () => {
    if (!transcription && audioBlob) {
      const text = await transcribe();
      if (text) {
        onSave({ audioBlob: audioBlob, content: text });
      }
    } else if (transcription) {
      onSave({ audioBlob: audioBlob, content: transcription });
    }
  };
  
  const handleReset = () => {
    reset();
    setTranscription(null);
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Button
          variant="outline"
          size="lg"
          className="w-full justify-start gap-2"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isTranscribing}
        >
          <Mic className="h-5 w-5" />
          {isRecording ? (
            <>
              Recording... ({formattedDuration})
            </>
          ) : (
            <>
              Start Recording
            </>
          )}
        </Button>
        
        {volumeLevel > 0 && (
          <div
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-green-500"
            style={{
              transform: `translateY(-50%) scale(${volumeLevel})`,
              opacity: volumeLevel,
            }}
          />
        )}
      </div>
      
      {waveformData && (
        <div className="relative h-10">
          <WaveformVisualization waveformData={waveformData} isRecording={isRecording} />
        </div>
      )}
      
      {audioBlob && (
        <div className="space-y-2">
          <AudioPreview audioBlob={audioBlob} disabled={isTranscribing} />
          
          {isTranscribing ? (
            <Alert className="my-4">
              <Waveform className="h-4 w-4" />
              <AlertDescription>
                Transcribing your recording...
              </AlertDescription>
            </Alert>
          ) : transcription ? (
            <TranscriptionDisplay transcription={transcription} />
          ) : (
            <Button 
              variant="secondary" 
              size="sm" 
              className="w-full"
              onClick={handleSave}
              disabled={isTranscribing}
            >
              Transcribe
            </Button>
          )}
          
          <Button 
            variant="destructive" 
            size="sm" 
            className="w-full"
            onClick={handleReset}
            disabled={isTranscribing}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

interface WaveformVisualizationProps {
  waveformData: Uint8Array;
  isRecording: boolean;
}

const WaveformVisualization: React.FC<WaveformVisualizationProps> = ({ waveformData, isRecording }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasWidth = canvas?.offsetWidth || 0;
    const canvasHeight = canvas?.offsetHeight || 0;
    
    if (!canvas) return;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    
    const barCount = waveformData.length;
    const barWidth = (canvasWidth / barCount) * 2.5;
    
    let x = 0;
    
    for (let i = 0; i < barCount; i++) {
      const barHeight = waveformData[i] * (canvasHeight / 255);
      
      context.fillStyle = 'rgb(100,149,237)';
      context.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight / 2);
      
      x += barWidth + 1;
    }
  }, [waveformData, isRecording]);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default DictationRecorder;
