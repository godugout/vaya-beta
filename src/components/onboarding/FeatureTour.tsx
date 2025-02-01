import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TourStep {
  target: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
}

const tourSteps: TourStep[] = [
  {
    target: "#hero-home-primary-cta",
    title: "Share Your Story",
    description: "Click here to start recording and sharing your family stories.",
    position: "bottom",
  },
  {
    target: "#hero-home-secondary-cta",
    title: "Create Family Capsules",
    description: "Preserve memories and set them to be revealed at special moments.",
    position: "bottom",
  },
];

export function FeatureTour({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open) {
      positionTooltip();
    }
  }, [currentStep, open]);

  const positionTooltip = () => {
    const targetElement = document.querySelector(tourSteps[currentStep].target);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const position = tourSteps[currentStep].position;
      
      let top = 0;
      let left = 0;
      
      switch (position) {
        case "bottom":
          top = rect.bottom + 10;
          left = rect.left + (rect.width / 2) - 150;
          break;
        // Add other position cases as needed
      }

      setTooltipPosition({ top, left });
    }
  };

  const handleNext = () => {
    if (currentStep === tourSteps.length - 1) {
      onOpenChange(false);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
          className="absolute z-50 w-[300px] bg-white rounded-lg shadow-lg p-4 pointer-events-auto"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <h3 className="font-semibold mb-2">{tourSteps[currentStep].title}</h3>
          <p className="text-sm text-gray-600 mb-4">{tourSteps[currentStep].description}</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === currentStep ? "bg-vaya-home" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <Button size="sm" onClick={handleNext}>
              {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}