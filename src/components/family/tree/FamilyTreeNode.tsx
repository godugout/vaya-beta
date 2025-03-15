
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FamilyTreeNodeProps {
  data: {
    name: string;
    avatar?: string;
    relationship?: string;
    storyCount?: number;
    isSelected?: boolean;
    hasNewStories?: boolean;
  };
  id: string;
  selected: boolean;
}

const FamilyTreeNode = ({ data, selected }: FamilyTreeNodeProps) => {
  const { name, avatar, relationship, storyCount = 0, hasNewStories = false } = data;
  const initials = name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div 
      className={`flex flex-col items-center p-2 w-[150px] bg-white dark:bg-gray-800 rounded-lg border transition-all ${
        selected ? 'border-lovable-blue shadow-md' : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="absolute top-2 right-2">
        <button className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600">
          <MoreHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <Avatar className="h-20 w-20 mx-auto my-2 border-2 border-gray-200 dark:border-gray-700">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="bg-lovable-blue text-white text-xl">{initials}</AvatarFallback>
      </Avatar>
      
      <div className="text-center mt-1 w-full">
        <p className="font-semibold truncate max-w-[130px] mx-auto">{name}</p>
        {relationship && <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{relationship}</p>}
        
        <div className="flex justify-center items-center gap-1 mt-2">
          {storyCount > 0 && (
            <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-0.5">
              {storyCount} {storyCount === 1 ? 'Story' : 'Stories'}
            </Badge>
          )}
          
          {hasNewStories && (
            <Badge className="bg-lovable-magenta text-white text-xs px-2 py-0.5 flex items-center gap-1">
              <Star className="h-3 w-3" /> New
            </Badge>
          )}
        </div>
      </div>
      
      {/* Handles for connections */}
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-lovable-teal border-white dark:border-gray-800" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-lovable-teal border-white dark:border-gray-800" />
      <Handle type="source" position={Position.Right} id="spouse" className="w-3 h-3 bg-lovable-magenta border-white dark:border-gray-800" />
      <Handle type="target" position={Position.Left} id="spouse-target" className="w-3 h-3 bg-lovable-magenta border-white dark:border-gray-800" />
    </div>
  );
};

export default memo(FamilyTreeNode);
