
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useDictation } from '@/hooks/useDictation';
import { Play, Square, MicVoiceOn, Sparkles, Send } from 'lucide-react';
import LiveWaveform from '@/components/voice-recording/LiveWaveform';
import RecordingTimer from '@/components/voice-recording/RecordingTimer';

interface DictationRecorderProps {
  onContentChange: (content: string) => void;
  onTitleChange?: (title: string) => void;
  onSave?: (data: { audioBlob: Blob | null; content: string }) => void;
  language?: 'en' | 'hi' | 'gu';
}

export const DictationRecorder = ({ 
  onContentChange, 
  onTitleChange,
  onSave,
  language = 'en'
}: DictationRecorderProps) => {
  const [recordingContent, setRecordingContent] = useState<string>('');
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const {
    isRecording,
    audioBlob,
    audioUrl,
    recordingDuration,
    formattedDuration,
    waveformData,
    volumeLevel,
    isTranscribing,
    transcription,
    startRecording,
    stopRecording,
    transcribe,
    reset
  } = useDictation({
    language,
    enhanceWithAI: true,
    onTranscriptionComplete: (text) => {
      setRecordingContent(text);
      onContentChange(text);
      
      // Try to extract a title from the first sentence
      if (onTitleChange && text) {
        const firstSentence = text.split('.')[0];
        if (firstSentence && firstSentence.length > 3) {
          const maxLength = 50;
          const title = firstSentence.length > maxLength 
            ? firstSentence.substring(0, 47) + '...' 
            : firstSentence;
          onTitleChange(title);
        }
      }
    }
  });
  
  useEffect(() => {
    // Initialize audio element when URL changes
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onended = () => setIsPlayingBack(false);
      setAudioElement(audio);
    }
    
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.onended = null;
      }
    };
  }, [audioUrl]);
  
  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  const handlePlayback = () => {
    if (!audioElement || !audioUrl) return;
    
    if (isPlayingBack) {
      audioElement.pause();
      setIsPlayingBack(false);
    } else {
      audioElement.currentTime = 0;
      audioElement.play()
        .then(() => setIsPlayingBack(true))
        .catch(err => {
          console.error('Error playing audio:', err);
          toast({
            title: "Playback error",
            description: "Could not play recording. Please try again.",
            variant: "destructive"
          });
        });
    }
  };
  
  const handleTranscribe = async () => {
    if (!audioBlob) return;
    
    setIsProcessing(true);
    try {
      await transcribe();
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleSave = () => {
    if (onSave) {
      onSave({ 
        audioBlob, 
        content: recordingContent || transcription || '' 
      });
    }
  };
  
  const handleReset = () => {
    reset();
    setRecordingContent('');
    if (audioElement) {
      audioElement.pause();
      setIsPlayingBack(false);
    }
    setAudioElement(null);
  };
  
  return (
    <Card className="p-4 space-y-4">
      <div className="flex flex-col items-center">
        {/* Recording button */}
        <motion.button
          onClick={handleToggleRecording}
          whileTap={{ scale: 0.95 }}
          disabled={isTranscribing || isProcessing}
          className={`
            h-16 w-16 rounded-full flex items-center justify-center shadow-lg mb-3
            ${isRecording 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-autumn hover:bg-autumn/90'}
            transition-colors disabled:opacity-50 disabled:pointer-events-none
          `}
        >
          {isRecording ? (
            <Square className="h-6 w-6 text-white" />
          ) : (
            <MicVoiceOn className="h-6 w-6 text-white" />
          )}
        </motion.button>
        
        {/* Timer display */}
        <RecordingTimer 
          duration={formattedDuration} 
          isRecording={isRecording} 
        />
      </div>
      
      {/* Live waveform visualization */}
      <LiveWaveform 
        waveformData={waveformData}
        isRecording={isRecording}
        barColor="#e97c49" // autumn color
      />
      
      {/* Audio controls after recording */}
      {audioBlob && !isRecording && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Playback controls */}
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handlePlayback}
              disabled={isTranscribing || isProcessing}
              className="rounded-full h-10 w-10"
            >
              {isPlayingBack ? (
                <Square className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>
          </div>
          
          {/* Transcription button */}
          {!transcription && !isTranscribing && (
            <Button
              onClick={handleTranscribe}
              variant="secondary"
              className="w-full"
              disabled={isProcessing}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isProcessing ? "Processing..." : "Transcribe Recording"}
            </Button>
          )}
          
          {/* Transcription status */}
          {isTranscribing && (
            <div className="text-center text-sm text-muted-foreground py-2">
              <div className="flex justify-center items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-autumn" />
                <span>Transcribing your recording...</span>
              </div>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex gap-2 justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={isTranscribing || isProcessing}
            >
              Record Again
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              disabled={isTranscribing || isProcessing}
              className="bg-autumn hover:bg-autumn/90"
            >
              <Send className="mr-2 h-4 w-4" />
              Use This Recording
            </Button>
          </div>
        </motion.div>
      )}
    </Card>
  );
};

export default DictationRecorder;
