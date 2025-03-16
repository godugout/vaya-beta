
import React from 'react';
import { TreeDeciduous, Users, Plus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FamilyTreeMainProps {
  familyId: string;
}

export const FamilyTreeMain = ({ familyId }: FamilyTreeMainProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <TreeDeciduous className="h-5 w-5 text-green-600 dark:text-green-500" />
            Family Tree
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="h-20 w-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <TreeDeciduous className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Build Your Family Tree</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Create a visual representation of your family's generations. Add members, connect relationships, and preserve your lineage.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Add Family Member
              </Button>
              <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4" />
                Create New Tree
              </Button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <h4 className="text-sm font-semibold mb-3">Recent Family Members</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center p-2 border border-gray-100 dark:border-gray-800 rounded-md">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Family Member {i}</p>
                    <p className="text-xs text-gray-500">Added recently</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Family ID: {familyId}
      </div>
    </div>
  );
};
