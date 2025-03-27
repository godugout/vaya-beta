
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

type VoiceInteractionLevel = 'off' | 'basic' | 'advanced';
type UserExperienceLevel = 'beginner' | 'intermediate' | 'expert';
type AccessibilityMode = 'standard' | 'high-contrast' | 'simplified';

interface VoiceInteractionContextType {
  voiceEnabled: boolean;
  toggleVoiceEnabled: () => void;
  interactionLevel: VoiceInteractionLevel;
  setInteractionLevel: (level: VoiceInteractionLevel) => void;
  userExperienceLevel: UserExperienceLevel;
  setUserExperienceLevel: (level: UserExperienceLevel) => void;
  accessibilityMode: AccessibilityMode;
  setAccessibilityMode: (mode: AccessibilityMode) => void;
  voiceVolume: number;
  setVoiceVolume: (volume: number) => void;
  isMicrophoneAvailable: boolean;
  activateVoiceForSession: () => Promise<boolean>;
}

const VoiceInteractionContext = createContext<VoiceInteractionContextType>({
  voiceEnabled: false,
  toggleVoiceEnabled: () => {},
  interactionLevel: 'basic',
  setInteractionLevel: () => {},
  userExperienceLevel: 'intermediate',
  setUserExperienceLevel: () => {},
  accessibilityMode: 'standard',
  setAccessibilityMode: () => {},
  voiceVolume: 1,
  setVoiceVolume: () => {},
  isMicrophoneAvailable: false,
  activateVoiceForSession: async () => false,
});

export const useVoiceInteraction = () => useContext(VoiceInteractionContext);

export const VoiceInteractionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [interactionLevel, setInteractionLevel] = useState<VoiceInteractionLevel>('basic');
  const [userExperienceLevel, setUserExperienceLevel] = useState<UserExperienceLevel>('intermediate');
  const [accessibilityMode, setAccessibilityMode] = useState<AccessibilityMode>('standard');
  const [voiceVolume, setVoiceVolume] = useState(1);
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(false);
  const { toast } = useToast();

  // Check for microphone availability on component mount
  useEffect(() => {
    const checkMicrophoneAvailability = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasMicrophone = devices.some(device => device.kind === 'audioinput');
        setIsMicrophoneAvailable(hasMicrophone);
      } catch (error) {
        console.error('Error checking microphone availability:', error);
        setIsMicrophoneAvailable(false);
      }
    };

    checkMicrophoneAvailability();
  }, []);

  const toggleVoiceEnabled = () => {
    if (!isMicrophoneAvailable && !voiceEnabled) {
      toast({
        title: "Microphone not available",
        description: "Please check your microphone settings and try again.",
        variant: "destructive"
      });
      return;
    }
    setVoiceEnabled(prev => !prev);
  };

  const activateVoiceForSession = async (): Promise<boolean> => {
    if (!isMicrophoneAvailable) {
      toast({
        title: "Microphone not available",
        description: "Please check your microphone settings and try again.",
        variant: "destructive"
      });
      return false;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setVoiceEnabled(true);
      
      toast({
        title: "Voice interaction enabled",
        description: "You can now use voice commands throughout the app."
      });
      
      return true;
    } catch (error) {
      console.error('Error requesting microphone permission:', error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access in your browser settings.",
        variant: "destructive"
      });
      return false;
    }
  };

  return (
    <VoiceInteractionContext.Provider
      value={{
        voiceEnabled,
        toggleVoiceEnabled,
        interactionLevel,
        setInteractionLevel,
        userExperienceLevel,
        setUserExperienceLevel,
        accessibilityMode,
        setAccessibilityMode,
        voiceVolume,
        setVoiceVolume,
        isMicrophoneAvailable,
        activateVoiceForSession
      }}
    >
      {children}
    </VoiceInteractionContext.Provider>
  );
};
