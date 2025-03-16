
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string | null;
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm flex items-start">
      <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
      <span>{error}</span>
    </div>
  );
};
