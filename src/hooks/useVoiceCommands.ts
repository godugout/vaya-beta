
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

type CommandCategory = 'navigation' | 'media' | 'family' | 'accessibility' | 'system';

interface VoiceCommand {
  phrase: string[];
  category: CommandCategory;
  action: () => void;
  feedback?: string;
}

export function useVoiceCommands(enabled: boolean = false) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Define all available voice commands
  const buildCommands = useCallback((): VoiceCommand[] => {
    return [
      // Navigation commands
      {
        phrase: ['go home', 'home page', 'go to home'],
        category: 'navigation',
        action: () => navigate('/'),
        feedback: 'Navigating to home page'
      },
      {
        phrase: ['go to settings', 'open settings', 'show settings'],
        category: 'navigation',
        action: () => navigate('/settings'),
        feedback: 'Opening settings'
      },
      {
        phrase: ['go to profile', 'open profile', 'show my profile'],
        category: 'navigation',
        action: () => navigate('/profile'),
        feedback: 'Opening your profile'
      },
      {
        phrase: ['go to family', 'show family', 'open family'],
        category: 'navigation',
        action: () => navigate('/families'),
        feedback: 'Navigating to families'
      },
      {
        phrase: ['go to memories', 'show memories', 'open memories'],
        category: 'navigation',
        action: () => navigate('/memories'),
        feedback: 'Opening memories'
      },
      {
        phrase: ['go back', 'previous page', 'navigate back'],
        category: 'navigation',
        action: () => window.history.back(),
        feedback: 'Going back'
      },
      
      // Media commands
      {
        phrase: ['take photo', 'take picture', 'capture image'],
        category: 'media',
        action: () => {
          toast({ title: 'Camera activated', description: 'Ready to take a photo' })
          // Camera activation would go here
        },
        feedback: 'Activating camera'
      },
      {
        phrase: ['record video', 'start video', 'capture video'],
        category: 'media',
        action: () => {
          toast({ title: 'Video recording', description: 'Starting video capture' })
          // Video recording would go here
        },
        feedback: 'Starting video recording'
      },
      
      // Family tree commands
      {
        phrase: ['add family member', 'new family member', 'create family member'],
        category: 'family',
        action: () => {
          toast({ title: 'Add Family Member', description: 'Say the name of the family member' })
          // Would trigger the family member creation dialog
        },
        feedback: 'Ready to add family member'
      },
      
      // Accessibility commands
      {
        phrase: ['increase text size', 'larger text', 'bigger text'],
        category: 'accessibility',
        action: () => {
          document.documentElement.style.fontSize = 'larger';
          toast({ title: 'Text size increased', description: 'Text is now larger for better readability' })
        },
        feedback: 'Increasing text size'
      },
      {
        phrase: ['decrease text size', 'smaller text', 'reduce text size'],
        category: 'accessibility',
        action: () => {
          document.documentElement.style.fontSize = '';
          toast({ title: 'Text size reset', description: 'Text size returned to normal' })
        },
        feedback: 'Resetting text size'
      },
      
      // System commands
      {
        phrase: ['stop listening', 'turn off voice', 'disable voice'],
        category: 'system',
        action: () => setIsListening(false),
        feedback: 'Voice commands deactivated'
      }
    ];
  }, [navigate, toast]);

  // Start speech recognition
  const startListening = useCallback(() => {
    if (!enabled) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ 
        title: 'Speech Recognition Not Available', 
        description: 'Your browser does not support voice commands. Try using Chrome or Edge.',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
        toast({ title: 'Voice Commands Active', description: 'Listening for commands' });
      };
      
      recognitionInstance.onresult = (event: any) => {
        const currentTranscript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        
        setTranscript(currentTranscript);
        
        const commands = buildCommands();
        for (const command of commands) {
          if (command.phrase.some(phrase => 
            currentTranscript.toLowerCase().includes(phrase.toLowerCase())
          )) {
            if (command.feedback) {
              toast({ title: 'Voice Command', description: command.feedback });
            }
            command.action();
            break;
          }
        }
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          toast({ 
            title: 'Microphone Access Denied', 
            description: 'Voice commands require microphone permission',
            variant: 'destructive'
          });
        }
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        // Restart if still in listening mode
        if (isListening) {
          recognitionInstance.start();
        }
      };
      
      recognitionInstance.start();
      setRecognition(recognitionInstance);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast({ 
        title: 'Voice Commands Error', 
        description: 'Could not start speech recognition',
        variant: 'destructive'
      });
    }
  }, [enabled, isListening, buildCommands, toast]);

  // Stop speech recognition
  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      toast({ title: 'Voice Commands Deactivated', description: 'No longer listening for commands' });
    }
  }, [recognition, toast]);

  // Toggle speech recognition
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  // Start listening if enabled is true
  useEffect(() => {
    if (enabled && !isListening) {
      startListening();
    } else if (!enabled && isListening) {
      stopListening();
    }
  }, [enabled, isListening, startListening, stopListening]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    toggleListening
  };
}
