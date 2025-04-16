
import React from "react";

interface VoiceNavigationIndicatorProps {
  isActive: boolean;
}

export const VoiceNavigationIndicator = ({ isActive }: VoiceNavigationIndicatorProps) => {
  if (!isActive) return null;
  
  return (
    <div className="container max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 rounded-lg shadow-md">
        <div className="flex items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg animate-pulse">
          <div className="h-10 w-10 bg-ui-orange rounded-full flex items-center justify-center text-white mr-3">
            <span className="sr-only">Voice Active</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 10V12C19 15.866 15.866 19 12 19M12 19C8.13401 19 5 15.866 5 12V10M12 19V22M8 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-medium">Listening for commands...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Try "Go to Home" or "Record Story"</p>
          </div>
        </div>
      </div>
    </div>
  );
};
