
import React from "react";
import { Mic } from "lucide-react";

interface VoiceNavigationIndicatorProps {
  isActive: boolean;
}

export const VoiceNavigationIndicator = ({ isActive }: VoiceNavigationIndicatorProps) => {
  if (!isActive) return null;
  
  return (
    <div className="fixed bottom-24 left-0 right-0 z-40 px-4">
      <div className="container max-w-sm mx-auto">
        <div className="bg-gray-900/90 dark:bg-gray-800/90 border border-gray-700 dark:border-gray-700 p-3 rounded-lg shadow-lg backdrop-blur-sm">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-ui-orange rounded-full flex items-center justify-center text-white mr-3">
              <span className="sr-only">Voice Active</span>
              <Mic className="h-4 w-4" />
            </div>
            <div>
              <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-500 dark:bg-red-500/10 dark:text-red-400 mb-1">
                LISTENING
              </div>
              <p className="text-sm text-white dark:text-gray-200">Try "Go to Home" or "Record Story"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
