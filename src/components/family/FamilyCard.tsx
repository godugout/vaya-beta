
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TreeDeciduous } from "lucide-react";
import { motion } from "framer-motion";
import { EditFamilyDialog } from "@/components/family/EditFamilyDialog";

interface FamilyMember {
  id: string;
  role: string;
  profile: {
    full_name: string;
    avatar_url: string | null;
  } | null;
}

interface FamilyCardProps {
  family: {
    id: string;
    name: string;
    description: string | null;
    members: FamilyMember[];
  };
  onFamilySelected: (familyId: string) => void;
  onFamilyUpdated: () => void;
}

export const FamilyCard = ({ family, onFamilySelected, onFamilyUpdated }: FamilyCardProps) => {
  return (
    <motion.div variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300 border-transparent hover:border-gray-200 dark:hover:border-gray-700">
        <div className="h-24 bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-300"></div>
        <CardHeader className="relative pb-2">
          <div className="absolute -top-12 left-6 h-16 w-16 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-md">
            <Users className="h-8 w-8 text-black dark:text-white" />
          </div>
          <div className="ml-20">
            <CardTitle className="text-xl font-semibold">
              {family.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {family.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {family.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {family.members.slice(0, 3).map((member, index) => (
                  <div 
                    key={member.id} 
                    className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-black flex items-center justify-center text-xs font-medium"
                    style={{ zIndex: 10 - index }}
                  >
                    {member.profile?.full_name.charAt(0) || '?'}
                  </div>
                ))}
                {family.members.length > 3 && (
                  <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-black flex items-center justify-center text-xs text-gray-600 dark:text-gray-400 font-medium" style={{ zIndex: 1 }}>
                    +{family.members.length - 3}
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {family.members.length} members
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onFamilySelected(family.id)}
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              >
                <TreeDeciduous className="h-4 w-4" />
              </Button>
              <EditFamilyDialog family={family} onFamilyUpdated={onFamilyUpdated} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
