import React from "react";
import { motion, MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CapsuleNavigationProps {
  contentOpacity: MotionValue;
  onNavigate: () => void;
}

export const CapsuleNavigation = ({ contentOpacity, onNavigate }: CapsuleNavigationProps) => {
  return (
    <motion.div
      style={{ opacity: contentOpacity }}
      className="fixed bottom-24 left-0 right-0 z-10 flex justify-center gap-4"
    >
      <Button
        variant="outline"
        size="lg"
        className="bg-white/90 backdrop-blur-sm"
        onClick={onNavigate}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="bg-white/90 backdrop-blur-sm"
        onClick={onNavigate}
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
};