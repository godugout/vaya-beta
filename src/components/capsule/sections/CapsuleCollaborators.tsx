
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users } from "lucide-react";

interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
}

interface CapsuleCollaboratorsProps {
  collaborators: Collaborator[];
  onAddCollaborator: () => void;
  onRemoveCollaborator: (id: string) => void;
}

export const CapsuleCollaborators = ({
  collaborators,
  onAddCollaborator,
  onRemoveCollaborator,
}: CapsuleCollaboratorsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium">Collaborators</h3>
          <p className="text-sm text-gray-500">Invite family members to contribute to this capsule.</p>
        </div>
        
        <Button type="button" size="sm" variant="outline" onClick={onAddCollaborator}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="font-medium">{collaborators.length} Collaborator{collaborators.length !== 1 ? 's' : ''}</span>
          </div>
          
          <Badge variant="outline" className="text-xs">
            {collaborators.length === 1 ? "Only You" : "Shared"}
          </Badge>
        </div>
        
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {collaborators.map(collaborator => (
            <div key={collaborator.id} className="flex items-center justify-between bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                  <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{collaborator.name}</span>
              </div>
              
              {collaborators.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                  onClick={() => onRemoveCollaborator(collaborator.id)}
                >
                  &times;
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
