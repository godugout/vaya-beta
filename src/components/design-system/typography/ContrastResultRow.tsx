
import React from 'react';
import type { ContrastResult } from '@/hooks/useColorContrast';

interface ContrastResultRowProps {
  result: ContrastResult;
}

export const ContrastResultRow = ({ result }: ContrastResultRowProps) => {
  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <span className="font-medium">{result.combination}</span>
      <div className="flex items-center gap-4">
        <span>Ratio: {result.ratio.toFixed(2)}:1</span>
        <div className="flex gap-2">
          <span className={result.passesAA ? "text-green-500" : "text-red-500"}>
            AA {result.passesAA ? "✓" : "✗"}
          </span>
          <span className={result.passesAAA ? "text-green-500" : "text-red-500"}>
            AAA {result.passesAAA ? "✓" : "✗"}
          </span>
        </div>
      </div>
    </div>
  );
};
