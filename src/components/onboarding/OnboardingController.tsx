
import { useState, useEffect } from "react";
import { HanumanEditionOnboarding } from "./HanumanEditionOnboarding";
import { WelcomeModal } from "./WelcomeModal";
import { VayaOnboarding } from "./VayaOnboarding";
import { supabase } from "@/integrations/supabase/client";

export function OnboardingController() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [onboardingType, setOnboardingType] = useState<"standard" | "hanuman" | "modern">("modern");

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
    
    if (!hasCompletedOnboarding) {
      // Show welcome modal first
      setShowWelcome(true);
    }
  }, []);

  const handleWelcomeComplete = (chosenEdition: "standard" | "hanuman" | "modern") => {
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
      
      {/* Modern dark theme onboarding - new default */}
      {showOnboarding && onboardingType === "modern" && (
        <VayaOnboarding
          open={showOnboarding}
          onOpenChange={handleOnboardingComplete}
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
  onComplete: (edition: "standard" | "hanuman" | "modern") => void;
}) {
  // Default to modern theme
  const handleEditionSelect = (edition: "standard" | "hanuman" | "modern") => {
    onComplete(edition);
  };
  
  useEffect(() => {
    // Auto-select modern theme after a brief delay
    if (open) {
      const timer = setTimeout(() => {
        handleEditionSelect("modern");
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [open]);
  
  return null; // Skipping the selection UI and directly using the modern theme
}
