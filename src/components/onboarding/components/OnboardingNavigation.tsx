
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
}

export const OnboardingNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
}: OnboardingNavigationProps) => {
  const { isSpanish } = useLanguage();

  return (
    <div className="p-4 border-t flex justify-between items-center">
      <div className="flex items-center gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentStep ? "bg-lovable-magenta" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {isSpanish ? "Atrás" : "Back"}
        </Button>
        <Button 
          onClick={onNext}
          className="bg-lovable-magenta hover:bg-lovable-magenta/90"
        >
          {currentStep === totalSteps - 1 ? (
            <span>{isSpanish ? "Personalizar" : "Customize"}</span>
          ) : (
            <>
              {isSpanish ? "Siguiente" : "Next"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
