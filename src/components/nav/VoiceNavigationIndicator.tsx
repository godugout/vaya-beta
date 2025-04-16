
import React from "react";
import { Mic } from "lucide-react";

interface VoiceNavigationIndicatorProps {
  isActive: boolean;
}

export const VoiceNavigationIndicator = ({ isActive }: VoiceNavigationIndicatorProps) => {
  if (!isActive) return null;
  
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4">
      <div className="bg-gray-900/80 dark:bg-gray-800/90 border border-gray-700 dark:border-gray-700 rounded-lg shadow-lg backdrop-blur-sm">
        <div className="flex items-center px-4 py-2">
          <div className="h-7 w-7 bg-ui-orange rounded-full flex items-center justify-center text-white mr-3">
            <Mic className="h-3.5 w-3.5" />
          </div>
          <div className="flex flex-col">
            <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-500 dark:bg-red-500/10 dark:text-red-400">
              LISTENING
            </div>
            <p className="text-xs text-white dark:text-gray-200">Try "Go to Home" or "Record Story"</p>
          </div>
        </div>
      </div>
    </div>
  );
};
