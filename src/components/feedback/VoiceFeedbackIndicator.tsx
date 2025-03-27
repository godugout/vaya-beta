
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2, VolumeX, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useVoiceInteraction } from '@/contexts/VoiceInteractionContext';
import { cn } from '@/lib/utils';

type FeedbackType = 'listening' | 'processing' | 'success' | 'error' | 'idle';

interface VoiceFeedbackIndicatorProps {
  status?: FeedbackType;
  transcript?: string;
  position?: 'top' | 'bottom' | 'float';
  showVolume?: boolean;
}

export function VoiceFeedbackIndicator({
  status = 'idle',
  transcript,
  position = 'float',
  showVolume = false
}: VoiceFeedbackIndicatorProps) {
  const { voiceEnabled, voiceVolume, interactionLevel, accessibilityMode } = useVoiceInteraction();
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [visible, setVisible] = useState(false);

  // Simulate microphone input levels
  useEffect(() => {
    if (status === 'listening' && voiceEnabled) {
      const interval = setInterval(() => {
        setVolumeLevel(Math.random() * 0.5 + 0.5); // Random value between 0.5 and 1
      }, 200);
      return () => clearInterval(interval);
    } else {
      setVolumeLevel(0);
    }
  }, [status, voiceEnabled]);

  // Control visibility based on status
  useEffect(() => {
    if (status === 'idle') {
      const timer = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [status]);

  // Only show if voice is enabled
  if (!voiceEnabled && status === 'idle') return null;

  // Get position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'fixed top-16 left-1/2 -translate-x-1/2 z-50';
      case 'bottom':
        return 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50';
      case 'float':
      default:
        return 'fixed top-24 right-6 z-50';
    }
  };

  // Get status icon
  const getStatusIcon = () => {
    switch (status) {
      case 'listening':
        return <Mic className={cn("h-5 w-5", volumeLevel > 0.7 ? "text-green-500" : "text-blue-400")} />;
      case 'processing':
        return <Volume2 className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'idle':
      default:
        return <VolumeX className="h-5 w-5 text-gray-400" />;
    }
  };

  // Get background color based on status and accessibility mode
  const getBgClasses = () => {
    const baseClasses = "rounded-lg shadow-lg";
    
    if (accessibilityMode === 'high-contrast') {
      return cn(baseClasses, "bg-black border-2", {
        "border-green-500": status === 'listening',
        "border-amber-500": status === 'processing',
        "border-green-600": status === 'success',
        "border-red-600": status === 'error',
        "border-gray-400": status === 'idle'
      });
    } else if (accessibilityMode === 'simplified') {
      return cn(baseClasses, "bg-white border border-gray-200");
    } else {
      return cn(baseClasses, "bg-black/70 backdrop-blur-md border border-white/10");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={cn(getPositionClasses(), "max-w-xs")}
        >
          <div className={cn(getBgClasses(), "p-3 text-white")}>
            <div className="flex items-center gap-3">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center", 
                  status === 'listening' && "relative"
                )}
              >
                {/* Voice level indicator rings */}
                {status === 'listening' && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-500/20"
                      animate={{
                        scale: [1, 1 + volumeLevel * 0.5],
                        opacity: [0.7, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeOut"
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-500/30"
                      animate={{
                        scale: [1, 1 + volumeLevel * 0.3],
                        opacity: [0.7, 0.1]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeOut"
                      }}
                    />
                  </>
                )}
                {getStatusIcon()}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">
                  {status === 'listening' && "Listening..."}
                  {status === 'processing' && "Processing..."}
                  {status === 'success' && "Understood"}
                  {status === 'error' && "Sorry, I didn't catch that"}
                  {status === 'idle' && "Voice Ready"}
                </div>
                
                {transcript && (
                  <p className="text-xs text-gray-300 truncate mt-0.5">
                    "{transcript}"
                  </p>
                )}
              </div>
            </div>
            
            {/* Volume indicator */}
            {showVolume && (
              <div className="mt-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <VolumeX className="h-3 w-3" />
                  <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${voiceVolume * 100}%` }}
                    />
                  </div>
                  <Volume2 className="h-3 w-3" />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
