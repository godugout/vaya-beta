
import React from "react";

interface MinimizedHeaderProps {
  isMinimized: boolean;
}

export const MinimizedHeader = ({ isMinimized }: MinimizedHeaderProps) => {
  if (!isMinimized) return null;
  
  return (
    <div className="flex items-center h-12 px-4">
      <img 
        src="/lovable-uploads/4425ec86-56fe-44c4-9f47-75e59d3cb287.png" 
        alt="Vaya Logo" 
        className="h-6" 
      />
    </div>
  );
};
