
import React from "react";
import { Button } from "@/components/ui/button";
import { Hourglass, Plus } from "lucide-react";

interface EmptyTimelineStateProps {
  timeView: "upcoming" | "past" | "all";
  currentYear: number;
  onCreateCapsule?: () => void;
}

export const EmptyTimelineState = ({ 
  timeView, 
  currentYear, 
  onCreateCapsule 
}: EmptyTimelineStateProps) => {
  return (
    <div className="py-12 text-center">
      <Hourglass className="h-10 w-10 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-1">No capsules found</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        No memory capsules {timeView === "upcoming" ? "scheduled to reveal" : timeView === "past" ? "revealed" : ""} in {currentYear}.
      </p>
      <Button variant="outline" onClick={onCreateCapsule}>
        <Plus className="h-4 w-4 mr-2" />
        Create New Capsule
      </Button>
    </div>
  );
};
