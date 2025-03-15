
import React from 'react';
import { BookOpen } from "lucide-react";

interface FamilyTimelineViewProps {
  familyId: string;
}

export const FamilyTimelineView = ({ familyId }: FamilyTimelineViewProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="text-center">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Family Timeline</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Coming soon! See your family's journey through time with an interactive timeline. Family ID: {familyId}</p>
      </div>
    </div>
  );
};
