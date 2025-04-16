
import React from 'react';
import type { ContrastResult } from '@/hooks/useColorContrast';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

interface ContrastResultRowProps {
  result: ContrastResult;
}

export const ContrastResultRow = ({ result }: ContrastResultRowProps) => {
  const contrastLevel = 
    result.passesAAA ? "excellent" :
    result.passesAA ? "good" :
    "poor";

  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-md",
      "border transition-colors",
      contrastLevel === "excellent" && "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900",
      contrastLevel === "good" && "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900",
      contrastLevel === "poor" && "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
    )}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background">
          {result.passesAA ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
        <span className="font-medium">{result.combination}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono">{result.ratio.toFixed(2)}:1</span>
        <div className="flex gap-2">
          <span className={result.passesAA ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
            AA {result.passesAA ? "✓" : "✗"}
          </span>
          <span className={result.passesAAA ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
            AAA {result.passesAAA ? "✓" : "✗"}
          </span>
        </div>
      </div>
    </div>
  );
};
