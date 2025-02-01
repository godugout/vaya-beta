import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight, Heart, Home, Users, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeStep {
  title: string;
  description: string;
  icon: JSX.Element;
}

const welcomeSteps: WelcomeStep[] = [
  {
    title: "Welcome to Vaya",
    description: "Your family's digital time capsule for preserving memories and stories across generations.",
    icon: <Heart className="w-12 h-12 text-vaya-home" />,
  },
  {
    title: "Create Your Family Space",
    description: "Start by creating a private space for your family to share memories and stories.",
    icon: <Home className="w-12 h-12 text-vaya-home" />,
  },
  {
    title: "Invite Family Members",
    description: "Connect with your loved ones and build your family network together.",
    icon: <Users className="w-12 h-12 text-vaya-home" />,
  },
  {
    title: "Create Time Capsules",
    description: "Preserve special moments and reveal them at meaningful times in the future.",
    icon: <Clock className="w-12 h-12 text-vaya-home" />,
  },
];

export function WelcomeModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === welcomeSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onOpenChange(false);
      // Here we could trigger the feature tour
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                {welcomeSteps[currentStep].icon}
              </div>
              <DialogTitle className="text-2xl mb-4">
                {welcomeSteps[currentStep].title}
              </DialogTitle>
              <DialogDescription className="text-base">
                {welcomeSteps[currentStep].description}
              </DialogDescription>
            </motion.div>
          </AnimatePresence>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex justify-center gap-2">
            {welcomeSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentStep ? "bg-vaya-home" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <Button onClick={handleNext} className="w-full">
            {isLastStep ? "Get Started" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}