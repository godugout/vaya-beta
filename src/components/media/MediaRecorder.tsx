
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Trash, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { useAudioTranscription } from '@/hooks/useAudioTranscription';
import AudioPreview from '@/components/audio/AudioPreview';

interface MediaRecorderProps {
  onSave?: (data: {
    blob: Blob;
    transcription?: string;
    duration: number;
  }) => void;
  maxDuration?: number; // in seconds
  autoTranscribe?: boolean;
  withTranscription?: boolean;
  className?: string;
}

export const MediaRecorder = ({
  onSave,
  maxDuration = 60,
  autoTranscribe = true,
  withTranscription = true,
  className
}: MediaRecorderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  
  const {
    isRecordingActive,
    recordingTime,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
    resetRecording
  } = useVoiceRecorder();
  
  const {
    transcription,
    isProcessing: isTranscribing,
    transcribeAudio,
  } = useAudioTranscription();
  
  // Handle recording progress
  useEffect(() => {
    if (isRecordingActive) {
      setDuration(0);
      setProgress(0);
      
      // Set up a progress interval
      progressInterval.current = setInterval(() => {
        setDuration(prev => {
          const newDuration = prev + 0.1;
          const newProgress = (newDuration / maxDuration) * 100;
          setProgress(newProgress);
          
          // Auto-stop if max duration reached
          if (newDuration >= maxDuration) {
            stopRecording();
          }
          
          return newDuration;
        });
      }, 100);
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isRecordingActive, maxDuration, stopRecording]);
  
  // Auto-transcribe when recording stops
  useEffect(() => {
    const processAudio = async () => {
      if (audioBlob && !isRecordingActive && autoTranscribe && withTranscription) {
        await transcribeAudio(audioBlob);
      }
    };
    
    if (audioBlob && !isRecordingActive && autoTranscribe && withTranscription) {
      processAudio();
    }
  }, [audioBlob, isRecordingActive, autoTranscribe, withTranscription, transcribeAudio]);
  
  // Request microphone permission when component mounts
  useEffect(() => {
    const requestPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsReady(true);
      } catch (err) {
        console.error('Microphone permission denied:', err);
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to record audio",
          variant: "destructive"
        });
      }
    };
    
    requestPermission();
  }, [toast]);
  
  const handleSave = () => {
    if (audioBlob && onSave) {
      onSave({
        blob: audioBlob,
        transcription: transcription || undefined,
        duration: recordingTime
      });
      
      toast({
        title: "Recording saved",
        description: transcription 
          ? "Audio and transcription saved successfully" 
          : "Audio saved successfully"
      });
      
      resetRecording();
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-center">
        <Mic className="h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500">
          Requesting microphone permission...
        </p>
      </div>
    );
  }
  
  return (
    <div className={`p-4 rounded-lg border border-gray-200 ${className}`}>
      {!audioBlob ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {isRecordingActive ? 'Recording...' : 'Ready to record'}
            </span>
            <span className="text-sm text-gray-500">
              {formatTime(recordingTime)} / {formatTime(maxDuration)}
            </span>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-center">
            <Button
              variant={isRecordingActive ? "destructive" : "default"}
              size="lg"
              className={`rounded-full h-16 w-16 ${isRecordingActive ? 'bg-red-500 hover:bg-red-600' : ''}`}
              onClick={isRecordingActive ? stopRecording : startRecording}
            >
              {isRecordingActive ? (
                <Square className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Review Recording</span>
            <span className="text-sm text-gray-500">{formatTime(recordingTime)}</span>
          </div>
          
          <AudioPreview audioBlob={audioBlob} />
          
          {withTranscription && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Transcription</h4>
              {isTranscribing ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-2 bg-gray-200 rounded"></div>
                    <div className="h-2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ) : transcription ? (
                <div className="text-sm p-3 bg-gray-50 rounded-md border border-gray-200">
                  {transcription}
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  No transcription available.
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-between space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={resetRecording}
              className="flex-1"
            >
              <Trash className="h-4 w-4 mr-2" />
              Discard
            </Button>
            
            <Button
              onClick={handleSave}
              className="flex-1"
              disabled={isTranscribing}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaRecorder;
