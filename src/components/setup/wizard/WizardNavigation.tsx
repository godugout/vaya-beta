
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";

interface WizardNavigationProps {
  activeStep: number;
  stepsLength: number;
  handleBack: () => void;
  handleNext: () => void;
  handleComplete: () => void;
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
  activeStep,
  stepsLength,
  handleBack,
  handleNext,
  handleComplete,
}) => {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={activeStep === 0}
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div>
        {activeStep === stepsLength - 1 ? (
          <Button onClick={handleComplete}>
            Complete Setup
          </Button>
        ) : activeStep === 0 ? (
          null // First step has its own next button in the form
        ) : (
          <Button onClick={handleNext}>
            Next
            <ArrowRightIcon className="ml-2 h-4 w-4" />  
          </Button>
        )}
      </div>
    </div>
  );
};
