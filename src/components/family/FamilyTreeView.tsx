
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { TreeDeciduous } from "lucide-react";
import FamilyTreeBuilder from "@/components/family/tree/FamilyTreeBuilder";

interface Family {
  id: string;
  name: string;
  members: any[];
}

interface FamilyTreeViewProps {
  selectedFamilyId: string | null;
  families: Family[];
  onBackToFamilies: () => void;
}

export const FamilyTreeViewComponent = ({ 
  selectedFamilyId, 
  families, 
  onBackToFamilies 
}: FamilyTreeViewProps) => {
  const selectedFamily = families.find(f => f.id === selectedFamilyId);
  const [expandedView, setExpandedView] = useState(false);

  if (!selectedFamilyId) {
    return (
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 text-center">
        <TreeDeciduous className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select a Family</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Please select a family to view and edit its family tree.</p>
        <Button onClick={onBackToFamilies}>
          View Families
        </Button>
      </div>
    );
  }

  const toggleExpandedView = () => {
    setExpandedView(!expandedView);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {selectedFamily?.name} Family Tree
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleExpandedView}
          >
            {expandedView ? "Compact View" : "Expanded View"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToFamilies}
          >
            Back to Families
          </Button>
        </div>
      </div>
      <div className={expandedView ? "h-[calc(100vh-200px)]" : "h-[600px]"}>
        <FamilyTreeBuilder 
          familyId={selectedFamilyId}
          initialMembers={selectedFamily?.members}
        />
      </div>
    </div>
  );
};
