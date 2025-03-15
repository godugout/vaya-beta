
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WizardNavigationProps {
  step: number;
  totalSteps: number;
  loading: boolean;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
}

export const WizardNavigation = ({
  step,
  totalSteps,
  loading,
  handleBack,
  handleNext,
  handleSubmit,
}: WizardNavigationProps) => {
  return (
    <div className="flex justify-end gap-2 mt-6">
      {step > 1 && step < totalSteps && (
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={loading}
        >
          Back
        </Button>
      )}
      
      {step < totalSteps - 1 && (
        <Button onClick={handleNext} disabled={loading} className="bg-ui-orange hover:bg-ui-orange/90 text-white">
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
      
      {step === totalSteps - 1 && (
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-ui-orange hover:bg-ui-orange/90 text-white"
        >
          {loading ? "Creating..." : "Create Family"}
        </Button>
      )}
    </div>
  );
};
