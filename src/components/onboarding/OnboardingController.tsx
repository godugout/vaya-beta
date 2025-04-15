
import { useState, useEffect } from "react";
import { HanumanEditionOnboarding } from "./HanumanEditionOnboarding";
import { WelcomeModal } from "./WelcomeModal";
import { supabase } from "@/integrations/supabase/client";

export function OnboardingController() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [onboardingType, setOnboardingType] = useState<"standard" | "hanuman">("standard");

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
    
    if (!hasCompletedOnboarding) {
      // Show welcome modal first
      setShowWelcome(true);
    }
  }, []);

  const handleWelcomeComplete = (chosenEdition: "standard" | "hanuman") => {
    setShowWelcome(false);
    setOnboardingType(chosenEdition);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem("hasCompletedOnboarding", "true");
    
    // Also record the edition preference
    localStorage.setItem("preferredEdition", onboardingType);
  };

  return (
    <>
      {/* Modified Welcome Modal with Edition Choice */}
      <WelcomeModalWithEdition 
        open={showWelcome}
        onOpenChange={setShowWelcome}
        onComplete={handleWelcomeComplete}
      />
      
      {/* Show the appropriate onboarding flow based on user's selection */}
      {showOnboarding && onboardingType === "hanuman" && (
        <HanumanEditionOnboarding
          open={showOnboarding}
          onOpenChange={handleOnboardingComplete}
        />
      )}
      
      {/* Standard onboarding fallback to regular welcome modal */}
      {showOnboarding && onboardingType === "standard" && (
        <WelcomeModal
          open={showOnboarding}
          onOpenChange={() => handleOnboardingComplete()}
        />
      )}
    </>
  );
}

// Extended Welcome Modal with Edition Choice
function WelcomeModalWithEdition({ 
  open, 
  onOpenChange,
  onComplete
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  onComplete: (edition: "standard" | "hanuman") => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedEdition, setSelectedEdition] = useState<"standard" | "hanuman">("standard");
  
  // Reuse the existing WelcomeModal steps and content
  // but add a final step for edition selection
  
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(selectedEdition);
    }
  };
  
  return (
    <WelcomeModal
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
