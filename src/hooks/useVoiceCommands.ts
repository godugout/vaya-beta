
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useVoiceInteraction } from '@/contexts/VoiceInteractionContext';
import { useWeddingMode } from '@/components/wedding-mode/WeddingModeProvider';

type CommandCategory = 'navigation' | 'media' | 'family' | 'accessibility' | 'system' | 'wedding';

interface VoiceCommand {
  phrase: string[];
  category: CommandCategory;
  action: () => void;
  feedback?: string;
  contextSpecific?: boolean;
  context?: string[];
}

export function useVoiceCommands(enabled: boolean = false) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { interactionLevel, accessibilityMode, voiceVolume } = useVoiceInteraction();
  const { isActive: isWeddingModeActive } = useWeddingMode();
  
  // Define all available voice commands
  const buildCommands = useCallback((): VoiceCommand[] => {
    const baseCommands: VoiceCommand[] = [
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
        phrase: ['go to stories', 'show stories', 'open stories'],
        category: 'navigation',
        action: () => navigate('/share-stories'),
        feedback: 'Opening stories'
      },
      {
        phrase: ['go to voice', 'open voice recording', 'voice experience'],
        category: 'navigation',
        action: () => navigate('/sacred-voice-experience'),
        feedback: 'Opening voice experience'
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
        },
        feedback: 'Activating camera'
      },
      {
        phrase: ['record story', 'start recording', 'tell story'],
        category: 'media',
        action: () => {
          navigate('/sacred-voice-experience');
          // Additional logic to automatically start recording would go here
        },
        feedback: 'Opening voice recorder'
      },
      
      // Family tree commands
      {
        phrase: ['add family member', 'new family member', 'create family member'],
        category: 'family',
        action: () => {
          toast({ title: 'Add Family Member', description: 'Say the name of the family member' })
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
      {
        phrase: ['high contrast mode', 'enable high contrast', 'better visibility'],
        category: 'accessibility',
        action: () => {
          // This would be handled by the accessibilityMode context
          toast({ title: 'High contrast mode', description: 'Visual display optimized for better visibility' })
        },
        feedback: 'Enabling high contrast mode'
      },
      {
        phrase: ['simple mode', 'simplified view', 'easy mode'],
        category: 'accessibility',
        action: () => {
          // This would be handled by the accessibilityMode context
          toast({ title: 'Simple mode', description: 'Interface simplified for easier navigation' })
        },
        feedback: 'Switching to simplified mode'
      },
      
      // System commands
      {
        phrase: ['stop listening', 'turn off voice', 'disable voice'],
        category: 'system',
        action: () => setIsListening(false),
        feedback: 'Voice commands deactivated'
      }
    ];
    
    // Wedding-specific commands
    const weddingCommands: VoiceCommand[] = [
      {
        phrase: ['wedding mode', 'enable wedding mode', 'activate wedding features'],
        category: 'wedding',
        action: () => navigate('/wedding-mode'),
        feedback: 'Activating wedding mode'
      },
      {
        phrase: ['create place card', 'generate qr code', 'make name card'],
        category: 'wedding',
        action: () => navigate('/wedding-mode?tab=qr-cards'),
        feedback: 'Opening QR code generator',
        contextSpecific: true,
        context: ['wedding']
      },
      {
        phrase: ['family radar', 'who is nearby', 'find family'],
        category: 'wedding',
        action: () => navigate('/wedding-mode?tab=proximity'),
        feedback: 'Opening family proximity view',
        contextSpecific: true,
        context: ['wedding']
      },
      {
        phrase: ['shared story', 'group story', 'tell group story'],
        category: 'wedding',
        action: () => navigate('/wedding-mode?tab=stories'),
        feedback: 'Opening group storytelling',
        contextSpecific: true,
        context: ['wedding']
      }
    ];
    
    // Combine all commands, filtering out context-specific ones that don't apply
    let allCommands = [...baseCommands];
    
    if (isWeddingModeActive) {
      allCommands = [...allCommands, ...weddingCommands];
    } else {
      // Only include non-context specific wedding commands when not in wedding mode
      const nonContextSpecificWeddingCommands = weddingCommands.filter(cmd => !cmd.contextSpecific);
      allCommands = [...allCommands, ...nonContextSpecificWeddingCommands];
    }
    
    return allCommands;
  }, [navigate, toast, isWeddingModeActive]);

  // Start speech recognition
  const startListening = useCallback(() => {
    if (!enabled) return;
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      toast({ 
        title: 'Speech Recognition Not Available', 
        description: 'Your browser does not support voice commands. Try using Chrome or Edge.',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      const recognitionInstance = new SpeechRecognitionAPI();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
        if (interactionLevel !== 'basic') {
          toast({ title: 'Voice Commands Active', description: 'Listening for commands' });
        }
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
            // Provide visual/audio feedback before executing command
            if (command.feedback) {
              toast({ title: 'Voice Command', description: command.feedback });
            }
            
            // Execute after a slight delay to allow for feedback
            setTimeout(() => command.action(), 300);
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
      recognitionRef.current = recognitionInstance;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast({ 
        title: 'Voice Commands Error', 
        description: 'Could not start speech recognition',
        variant: 'destructive'
      });
    }
  }, [enabled, isListening, buildCommands, toast, interactionLevel]);

  // Stop speech recognition
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setTranscript('');
      if (interactionLevel !== 'basic') {
        toast({ title: 'Voice Commands Deactivated', description: 'No longer listening for commands' });
      }
    }
  }, [toast, interactionLevel]);

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
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Start/stop listening when enabled changes
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
