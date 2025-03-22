
import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { useAnimation } from '@/components/animation/AnimationProvider';

interface VoiceNavigationIndicatorProps {
  enabled: boolean;
}

export function VoiceNavigationIndicator({ enabled }: VoiceNavigationIndicatorProps) {
  const { isReduced } = useAnimation();
  const { isListening, transcript, toggleListening } = useVoiceCommands(enabled);
  const [visible, setVisible] = useState(false);

  // Only show the indicator when voice navigation is enabled
  useEffect(() => {
    if (enabled) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [enabled]);

  // Animation variants for the indicator
  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.95 }
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={isReduced ? {} : variants}
        transition={{ duration: 0.3 }}
      >
        <div className="voice-indicator bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 w-64 max-w-full">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isListening ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
              {isListening ? (
                <Mic className={isReduced ? '' : 'animate-pulse'} size={20} />
              ) : (
                <MicOff size={20} />
              )}
            </div>
            
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium">
                {isListening ? 'Listening...' : 'Voice navigation ready'}
              </div>
              {transcript && (
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  "{transcript}"
                </div>
              )}
            </div>
            
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={toggleListening}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
