
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VayaCard } from '@/components/ui/vaya-card';
import { useAnimation } from '@/components/animation/AnimationProvider';
import { FadeIn } from '@/components/animation/FadeIn';
import { StaggeredContainer } from '@/components/animation/StaggeredContainer';
import { Progress } from '@/components/ui/progress';

export interface OnboardingStep {
  title: string;
  description: string;
  content: React.ReactNode;
  helpText?: string;
  optional?: boolean;
}

interface SimplifiedOnboardingProps {
  steps: OnboardingStep[];
  onComplete: () => void;
  onSkip?: () => void;
  initialStep?: number;
}

export function SimplifiedOnboarding({
  steps,
  onComplete,
  onSkip,
  initialStep = 0,
}: SimplifiedOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { isReduced } = useAnimation();
  
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  const handleNext = () => {
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    // Move to next step or complete
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      onComplete();
    }
  };

  return (
    <FadeIn className="w-full max-w-3xl mx-auto">
      <VayaCard elevation={3} padding="lg">
        <div className="space-y-6">
          {/* Header with progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{currentStepData.title}</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300">
            {currentStepData.description}
          </p>
          
          {/* Step content with animation */}
          <motion.div
            key={`step-${currentStep}`}
            initial={isReduced ? {} : { opacity: 0, x: 20 }}
            animate={isReduced ? {} : { opacity: 1, x: 0 }}
            exit={isReduced ? {} : { opacity: 0, x: -20 }}
            transition={{ duration: isReduced ? 0 : 0.3 }}
            className="min-h-[300px] py-4"
          >
            {currentStepData.content}
          </motion.div>
          
          {/* Help text if available */}
          {currentStepData.helpText && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex gap-3 text-sm">
              <Info size={20} className="text-gray-400 shrink-0 mt-0.5" />
              <div>{currentStepData.helpText}</div>
            </div>
          )}
          
          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
            <div>
              {!isFirstStep && (
                <Button variant="ghost" onClick={handleBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {currentStepData.optional && (
                <Button variant="ghost" onClick={handleSkip}>
                  Skip
                </Button>
              )}
              
              <Button onClick={handleNext}>
                {isLastStep ? (
                  <>
                    Complete
                    <Check className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </VayaCard>
    </FadeIn>
  );
}
