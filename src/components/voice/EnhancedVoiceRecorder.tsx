
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Play, Pause, Save, RotateCcw } from 'lucide-react';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { AccessibleButton } from '@/components/foundation/AccessibleButton';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedVoiceRecorderProps {
  onRecordingComplete?: (audioBlob: Blob, transcription?: string) => void;
  className?: string;
}

export const EnhancedVoiceRecorder = ({
  onRecordingComplete,
  className
}: EnhancedVoiceRecorderProps) => {
  const { settings, announceToScreenReader } = useAccessibilityContext();
  const [showWaveform, setShowWaveform] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { 
    state, 
    startRecording, 
    stopRecording, 
    resetRecording 
  } = useVoiceRecording({
    maxDuration: 600 // 10 minutes
  });

  useEffect(() => {
    setShowWaveform(state.isRecording);
  }, [state.isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    startRecording();
    announceToScreenReader('Recording started. Speak your story.');
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    announceToScreenReader('Recording stopped.');
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const handlePlayback = () => {
    if (!state.audioBlob) return;
    setIsPlaying(!isPlaying);
    announceToScreenReader(isPlaying ? 'Paused playback' : 'Playing recording');
  };

  const handleSave = () => {
    if (state.audioBlob && onRecordingComplete) {
      onRecordingComplete(state.audioBlob);
      announceToScreenReader('Story saved successfully');
      resetRecording();
    }
  };

  const handleReset = () => {
    resetRecording();
    setIsPlaying(false);
    announceToScreenReader('Recording cleared');
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-8">
        <div className="flex flex-col items-center space-y-6">
          
          {/* Recording Status */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.isRecording ? 'recording' : state.audioBlob ? 'complete' : 'ready'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-xl font-medium"
              >
                {state.isRecording ? (
                  <span className="text-red-600 flex items-center gap-2">
                    <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                    Recording Your Story
                  </span>
                ) : state.audioBlob ? (
                  <span className="text-green-600">Story Recorded</span>
                ) : (
                  <span className="text-gray-700">Ready to Record</span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Timer */}
          <div className="text-4xl font-mono font-bold text-gray-900 min-h-[3rem] flex items-center">
            {formatTime(state.duration)}
          </div>

          {/* Waveform Visualization */}
          <div className="w-full h-24 flex items-center justify-center">
            {showWaveform ? (
              <motion.div 
                className="flex items-end space-x-1 h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-gradient-to-t from-blue-400 to-blue-600 rounded-full"
                    animate={{
                      height: [8, Math.random() * 60 + 8, 8],
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="text-gray-400 text-center">
                {state.audioBlob ? 'Recording complete' : 'Waveform will appear when recording'}
              </div>
            )}
          </div>

          {/* Main Recording Button */}
          <div className="relative">
            {/* Breathing animation background */}
            {state.isRecording && (
              <motion.div
                className="absolute inset-0 rounded-full bg-red-200"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
            
            <AccessibleButton
              className={cn(
                'h-20 w-20 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition-all duration-300',
                state.isRecording 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
              )}
              onClick={state.isRecording ? handleStopRecording : handleStartRecording}
              ariaLabel={state.isRecording ? 'Stop recording' : 'Start recording'}
              disabled={state.error !== null}
            >
              {state.isRecording ? (
                <Square className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </AccessibleButton>
          </div>

          {/* Voice Commands Hint */}
          <div className="text-sm text-gray-500 text-center max-w-md">
            Voice commands: "Start recording", "Stop recording", or use the button above
          </div>

          {/* Control Buttons */}
          {state.audioBlob && !state.isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-4"
            >
              <AccessibleButton
                variant="outline"
                onClick={handlePlayback}
                ariaLabel={isPlaying ? 'Pause playback' : 'Play recording'}
                className="flex items-center space-x-2"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </AccessibleButton>

              <AccessibleButton
                variant="outline"
                onClick={handleReset}
                ariaLabel="Clear recording and start over"
                className="flex items-center space-x-2"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Reset</span>
              </AccessibleButton>

              <AccessibleButton
                onClick={handleSave}
                ariaLabel="Save this story"
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="h-5 w-5" />
                <span>Save Story</span>
              </AccessibleButton>
            </motion.div>
          )}

          {/* Audio Playback */}
          {state.audioBlob && (
            <audio
              src={URL.createObjectURL(state.audioBlob)}
              controls
              className="w-full max-w-md"
              aria-label="Recorded audio playback"
            />
          )}

          {/* Error Display */}
          {state.error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-center p-4 bg-red-50 rounded-lg max-w-md"
            >
              <strong>Recording Error:</strong> {state.error}
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
