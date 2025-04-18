
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FamilyContextOnboarding } from "./FamilyContextOnboarding";
import { useLanguage } from "@/contexts/LanguageContext";
import { onboardingScreens } from "./constants/onboardingScreens";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { OnboardingNavigation } from "./components/OnboardingNavigation";

interface HanumanEditionOnboardingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HanumanEditionOnboarding({ 
  open, 
  onOpenChange 
}: HanumanEditionOnboardingProps) {
  const [step, setStep] = useState(0);
  const [showFamilyContext, setShowFamilyContext] = useState(false);
  const { isSpanish } = useLanguage();
  
  const handleNext = () => {
    if (step < onboardingScreens.length - 1) {
      setStep(step + 1);
    } else {
      setShowFamilyContext(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    onOpenChange(false);
  };

  if (showFamilyContext) {
    return (
      <FamilyContextOnboarding 
        open={open} 
        onOpenChange={handleComplete}
      />
    );
  }

  const currentScreen = onboardingScreens[step];
  const lang = isSpanish ? 'es' : 'en';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white">
        <div className="flex flex-col h-full">
          <OnboardingScreen 
            screen={currentScreen}
            lang={lang}
          />
          <OnboardingNavigation
            currentStep={step}
            totalSteps={onboardingScreens.length}
            onNext={handleNext}
            onBack={handleBack}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
