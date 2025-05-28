
import React from 'react';
import { Mic, Square, Pause, Play } from 'lucide-react';
import { AccessibleButton } from '@/components/foundation/AccessibleButton';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { useCultureContext } from '@/contexts/CultureContext';
import { cn } from '@/lib/utils';

interface VoiceRecordingButtonProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
  maxDuration?: number;
  className?: string;
}

export const VoiceRecordingButton = ({
  onRecordingComplete,
  maxDuration = 300, // 5 minutes default
  className,
}: VoiceRecordingButtonProps) => {
  const { getUITranslation } = useCultureContext();
  const { state, startRecording, stopRecording, pauseRecording, resumeRecording, resetRecording } = 
    useVoiceRecording({ maxDuration });

  React.useEffect(() => {
    if (state.audioBlob && onRecordingComplete) {
      onRecordingComplete(state.audioBlob);
    }
  }, [state.audioBlob, onRecordingComplete]);

  const getButtonState = () => {
    if (state.error) return 'error';
    if (state.isRecording && state.isPaused) return 'paused';
    if (state.isRecording) return 'recording';
    if (state.audioBlob) return 'complete';
    return 'idle';
  };

  const getButtonIcon = () => {
    const buttonState = getButtonState();
    switch (buttonState) {
      case 'recording': return <Square className="h-8 w-8" />;
      case 'paused': return <Play className="h-8 w-8" />;
      case 'complete': return <Mic className="h-8 w-8" />;
      case 'error': return <Mic className="h-8 w-8" />;
      default: return <Mic className="h-8 w-8" />;
    }
  };

  const getButtonColor = () => {
    const buttonState = getButtonState();
    switch (buttonState) {
      case 'recording': return 'bg-red-500 hover:bg-red-600 text-white';
      case 'paused': return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case 'complete': return 'bg-green-500 hover:bg-green-600 text-white';
      case 'error': return 'bg-red-500 hover:bg-red-600 text-white';
      default: return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  const handlePrimaryAction = () => {
    const buttonState = getButtonState();
    switch (buttonState) {
      case 'idle':
        startRecording();
        break;
      case 'recording':
        stopRecording();
        break;
      case 'paused':
        resumeRecording();
        break;
      case 'complete':
        resetRecording();
        break;
      case 'error':
        resetRecording();
        break;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn('flex flex-col items-center space-y-4', className)}>
      {/* Main Recording Button */}
      <AccessibleButton
        className={cn(
          'rounded-full h-20 w-20 flex items-center justify-center shadow-lg transition-all duration-300',
          getButtonColor(),
          state.isRecording && !state.isPaused && 'animate-pulse'
        )}
        ariaLabel={getUITranslation(
          state.isRecording ? 'stop_recording' : 'start_recording'
        )}
        announcement={
          state.isRecording ? 'Recording stopped' : 'Recording started'
        }
        onClick={handlePrimaryAction}
      >
        {getButtonIcon()}
      </AccessibleButton>

      {/* Recording Status */}
      <div className="text-center space-y-2">
        <div className="text-2xl font-mono font-bold text-gray-900">
          {formatTime(state.duration)}
        </div>
        
        {state.isRecording && (
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600">
              {state.isPaused ? getUITranslation('paused') : getUITranslation('recording')}
            </span>
          </div>
        )}
        
        {state.error && (
          <div className="text-red-600 text-sm max-w-xs text-center">
            {state.error}
          </div>
        )}
      </div>

      {/* Secondary Controls */}
      {state.isRecording && (
        <div className="flex space-x-3">
          <AccessibleButton
            variant="outline"
            size="sm"
            onClick={state.isPaused ? resumeRecording : pauseRecording}
            ariaLabel={state.isPaused ? getUITranslation('resume') : getUITranslation('pause')}
          >
            {state.isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </AccessibleButton>
        </div>
      )}
    </div>
  );
};
