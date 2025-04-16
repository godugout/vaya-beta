
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MinimizeButtonProps {
  isMinimized: boolean;
  toggleMinimized: () => void;
}

export const MinimizeButton = ({ isMinimized, toggleMinimized }: MinimizeButtonProps) => {
  return (
    <button
      onClick={toggleMinimized}
      className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-50"
      aria-label={isMinimized ? "Expand navigation" : "Minimize navigation"}
    >
      {isMinimized ? (
        <ChevronDown className="h-4 w-4" />
      ) : (
        <ChevronUp className="h-4 w-4" />
      )}
    </button>
  );
};
