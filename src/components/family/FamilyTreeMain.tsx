
import React from 'react';
import { TreeDeciduous } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FamilyTreeMainProps {
  familyId: string;
}

export const FamilyTreeMain = ({ familyId }: FamilyTreeMainProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="text-center">
        <TreeDeciduous className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Family Tree</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">View and edit your family's genealogical tree. Family ID: {familyId}</p>
        <Button variant="outline">Create Tree</Button>
      </div>
    </div>
  );
};
