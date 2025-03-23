
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Steps, Step, StepLabel, StepContent } from "@/components/ui/stepper";
import { useWizardState } from "./wizard/useWizardState";
import { useWizardSteps } from "./wizard/WizardStepConfig";
import { WizardNavigation } from "./wizard/WizardNavigation";

export function FamilySetupWizard() {
  const {
    state,
    handleFamilyCreated,
    handleNext,
    handleBack,
    handleMediaUploaded,
    handleAudioRecorded,
    handleFamilyContextSaved,
    handleCopyLink,
    handleComplete,
  } = useWizardState();

  const steps = useWizardSteps({
    wizardState: state,
    onFamilyCreated: handleFamilyCreated,
    onMediaUploaded: handleMediaUploaded,
    onAudioRecorded: handleAudioRecorded,
    onFamilyContextSaved: handleFamilyContextSaved,
    onCopyLink: handleCopyLink,
  });

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Family Setup Wizard</CardTitle>
        </CardHeader>
        <CardContent>
          <Steps activeStep={state.activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <div className="py-4">{step.content}</div>
                </StepContent>
              </Step>
            ))}
          </Steps>
        </CardContent>
        <CardFooter>
          <WizardNavigation
            activeStep={state.activeStep}
            stepsLength={steps.length}
            handleBack={handleBack}
            handleNext={handleNext}
            handleComplete={handleComplete}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
