
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MemberAvatar } from './components/MemberAvatar';
import { MemberBadges } from './components/MemberBadges';
import { MemberActions } from './components/MemberActions';

interface FamilyMemberNodeProps {
  data: {
    full_name: string;
    avatar_url?: string | null;
    role?: string;
    isSelected?: boolean;
    storyCount?: number;
    hasNewStories?: boolean;
    birthdate?: string | null;
    generation?: number;
    isInDirectLineage?: boolean;
  };
  id: string;
  selected: boolean;
}

const generationColors = [
  'from-blue-600 to-blue-800',
  'from-purple-600 to-purple-800',
  'from-indigo-600 to-indigo-800',
  'from-cyan-600 to-cyan-800',
  'from-teal-600 to-teal-800'
];

const FamilyMemberNode = ({ data, selected }: FamilyMemberNodeProps) => {
  const { 
    full_name, 
    avatar_url, 
    role, 
    storyCount = 0, 
    hasNewStories = false,
    birthdate,
    generation = 0,
    isInDirectLineage = false
  } = data;

  const colorClass = generationColors[generation % generationColors.length];
  const borderStyle = isInDirectLineage ? 'border-amber-400 border-2' : 'border-gray-700';
  
  const memoryRichness = storyCount === 0 ? 0 : Math.min(Math.log(storyCount + 1) / Math.log(10) * 3, 3);

  return (
    <TooltipProvider>
      <motion.div
        whileHover={{ y: -5 }}
        className={`flex flex-col items-center p-3 w-[180px] bg-gradient-to-b ${colorClass} rounded-lg ${borderStyle} transition-all shadow-lg ${
          selected ? 'ring-2 ring-amber-400 shadow-amber-400/20' : 'ring-0'
        }`}
      >
        <div className="absolute top-2 right-2 z-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More options</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {memoryRichness > 0 && (
          <div 
            className="absolute -top-1 -right-1 rounded-full bg-amber-500"
            style={{
              width: `${16 + memoryRichness * 4}px`,
              height: `${16 + memoryRichness * 4}px`,
              opacity: 0.4 + (memoryRichness / 10),
              boxShadow: `0 0 ${8 + memoryRichness * 4}px rgba(245, 158, 11, 0.5)`
            }}
          />
        )}
        
        <MemberAvatar
          full_name={full_name}
          avatar_url={avatar_url}
          isInDirectLineage={isInDirectLineage}
        />
        
        <div className="text-center w-full mb-2">
          <p className="font-bold text-white truncate max-w-[160px] mx-auto">{full_name}</p>
          {role && <p className="text-xs text-gray-200 mt-0.5">{role}</p>}
          {birthdate && <p className="text-xs text-gray-300 mt-0.5">Birth: {new Date(birthdate).getFullYear()}</p>}
        </div>
        
        <MemberBadges storyCount={storyCount} hasNewStories={hasNewStories} />
        <MemberActions />
        
        <Handle 
          type="target" 
          position={Position.Top} 
          className="w-3 h-3 bg-blue-500 border-white dark:border-gray-800" 
        />
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="w-3 h-3 bg-blue-500 border-white dark:border-gray-800" 
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          id="spouse" 
          className="w-3 h-3 bg-purple-500 border-white dark:border-gray-800" 
        />
        <Handle 
          type="target" 
          position={Position.Left} 
          id="spouse-target" 
          className="w-3 h-3 bg-purple-500 border-white dark:border-gray-800" 
        />
      </motion.div>
    </TooltipProvider>
  );
};

export default memo(FamilyMemberNode);
