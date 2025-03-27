
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWeddingMode } from '@/components/wedding-mode/WeddingModeProvider';
import { useVoiceInteraction } from './VoiceInteractionContext';

// Define the different journey stages a user can be in
type JourneyStage = 
  | 'onboarding' 
  | 'first-story' 
  | 'family-setup'
  | 'wedding-event'
  | 'regular-use'
  | 'voice-tutorial'
  | 'accessibility-setup';

interface UserPathway {
  id: string;
  name: string;
  description: string;
  suggestedFeatures: string[];
  initialFlow: JourneyStage[];
}

interface UserJourneyContextType {
  currentStage: JourneyStage;
  setCurrentStage: (stage: JourneyStage) => void;
  completedStages: JourneyStage[];
  selectedPathway: string | null;
  selectPathway: (pathwayId: string) => void;
  isTransitioning: boolean;
  pathways: UserPathway[];
  moveToNextStage: () => void;
  showWeddingTransition: boolean;
  setShowWeddingTransition: (show: boolean) => void;
  isNewUser: boolean;
  setIsNewUser: (isNew: boolean) => void;
}

// Define the user pathways
const USER_PATHWAYS: UserPathway[] = [
  {
    id: 'elder-storyteller',
    name: 'Elder Storyteller',
    description: 'For those who want to preserve their wisdom and memories for future generations',
    suggestedFeatures: ['Voice Recording', 'Accessibility Mode', 'Family Tree'],
    initialFlow: ['onboarding', 'accessibility-setup', 'voice-tutorial', 'first-story']
  },
  {
    id: 'family-archivist',
    name: 'Family Archivist',
    description: 'For those organizing and preserving family history and stories',
    suggestedFeatures: ['Memory Gallery', 'Family Tree', 'Story Management'],
    initialFlow: ['onboarding', 'family-setup', 'first-story']
  },
  {
    id: 'casual-viewer',
    name: 'Casual Viewer',
    description: 'For those who mainly want to view and enjoy family stories',
    suggestedFeatures: ['Story Feed', 'Quick Comments', 'Simple Navigation'],
    initialFlow: ['onboarding', 'regular-use']
  },
  {
    id: 'wedding-event',
    name: 'Wedding Event',
    description: 'For those participating in a wedding celebration',
    suggestedFeatures: ['QR Cards', 'Group Storytelling', 'Family Radar'],
    initialFlow: ['onboarding', 'wedding-event']
  }
];

const UserJourneyContext = createContext<UserJourneyContextType>({
  currentStage: 'onboarding',
  setCurrentStage: () => {},
  completedStages: [],
  selectedPathway: null,
  selectPathway: () => {},
  isTransitioning: false,
  pathways: USER_PATHWAYS,
  moveToNextStage: () => {},
  showWeddingTransition: false,
  setShowWeddingTransition: () => {},
  isNewUser: true,
  setIsNewUser: () => {}
});

export const useUserJourney = () => useContext(UserJourneyContext);

export const UserJourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStage, setCurrentStage] = useState<JourneyStage>('onboarding');
  const [completedStages, setCompletedStages] = useState<JourneyStage[]>([]);
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWeddingTransition, setShowWeddingTransition] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  
  // These hooks will be used only when the component is mounted inside a Router
  let pathname = '/';
  let navigate = (path: string) => {
    console.warn('Navigation attempted outside Router context. Path:', path);
    window.location.href = path; // Fallback
  };

  // Get the Router context if available
  try {
    const location = useLocation();
    pathname = location.pathname;
    navigate = useNavigate();
  } catch (error) {
    console.warn('Router context not available. Some features may be limited.');
  }
  
  // Get WeddingMode status safely
  const weddingModeContext = useWeddingMode();
  const isWeddingModeActive = weddingModeContext?.isActive || false;
  
  // Get user experience level safely
  const voiceInteractionContext = useVoiceInteraction();
  const userExperienceLevel = voiceInteractionContext?.userExperienceLevel || 'intermediate';

  // If wedding mode is active, set the appropriate pathway
  useEffect(() => {
    if (isWeddingModeActive && selectedPathway !== 'wedding-event') {
      selectPathway('wedding-event');
    }
  }, [isWeddingModeActive, selectedPathway]);

  // Check local storage to determine if user is new
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (hasCompletedOnboarding) {
      setIsNewUser(false);
      setCurrentStage('regular-use');
    }
  }, []);

  // Helper function to transition to the next stage based on selected pathway
  const moveToNextStage = () => {
    if (!selectedPathway) return;
    
    const pathway = USER_PATHWAYS.find(p => p.id === selectedPathway);
    if (!pathway) return;
    
    const currentIndex = pathway.initialFlow.indexOf(currentStage);
    if (currentIndex < 0 || currentIndex >= pathway.initialFlow.length - 1) {
      // If we're at the end of the flow or not in the flow, go to regular use
      setCurrentStage('regular-use');
    } else {
      // Otherwise, move to the next stage in the flow
      const nextStage = pathway.initialFlow[currentIndex + 1];
      setIsTransitioning(true);
      
      // Simulate a transition effect
      setTimeout(() => {
        setCurrentStage(nextStage);
        setCompletedStages(prev => [...prev, currentStage]);
        setIsTransitioning(false);
      }, 400);
    }
  };

  const selectPathway = (pathwayId: string) => {
    const pathway = USER_PATHWAYS.find(p => p.id === pathwayId);
    if (!pathway) return;
    
    setSelectedPathway(pathwayId);
    
    // Set the first stage from the pathway's flow
    if (pathway.initialFlow.length > 0) {
      setCurrentStage(pathway.initialFlow[0]);
    }

    // If this is the wedding pathway, handle special case
    if (pathwayId === 'wedding-event') {
      setShowWeddingTransition(true);
    }
  };

  return (
    <UserJourneyContext.Provider
      value={{
        currentStage,
        setCurrentStage,
        completedStages,
        selectedPathway,
        selectPathway,
        isTransitioning,
        pathways: USER_PATHWAYS,
        moveToNextStage,
        showWeddingTransition,
        setShowWeddingTransition,
        isNewUser,
        setIsNewUser
      }}
    >
      {children}
    </UserJourneyContext.Provider>
  );
};
