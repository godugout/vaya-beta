
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, MessageCircle, Phone, BookOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

const FamilyMemberNode = ({ data, id, selected }: FamilyMemberNodeProps) => {
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
  
  const initials = full_name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
    
  // Scale memory richness indicator based on story count
  const memoryRichness = storyCount === 0 ? 0 : Math.min(Math.log(storyCount + 1) / Math.log(10) * 3, 3);
  
  // Generation-based coloring for better visual hierarchy
  const generationColors = [
    'from-blue-600 to-blue-800', // Oldest generation
    'from-purple-600 to-purple-800',
    'from-indigo-600 to-indigo-800',
    'from-cyan-600 to-cyan-800',
    'from-teal-600 to-teal-800'  // Youngest generation
  ];
  
  const colorClass = generationColors[generation % generationColors.length];
  
  // Different border for direct lineage members
  const borderStyle = isInDirectLineage 
    ? 'border-amber-400 border-2' 
    : 'border-gray-700';

  return (
    <TooltipProvider>
      <motion.div
        whileHover={{ y: -5 }}
        className={`flex flex-col items-center p-3 w-[180px] bg-gradient-to-b ${colorClass} rounded-lg ${borderStyle} transition-all shadow-lg ${
          selected 
            ? 'ring-2 ring-amber-400 shadow-amber-400/20' 
            : 'ring-0'
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
        
        {/* Memory richness indicator */}
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
        
        <Avatar className={`h-20 w-20 mx-auto mb-3 border-2 ${isInDirectLineage ? 'border-amber-400' : 'border-gray-700'}`}>
          <AvatarImage src={avatar_url || ''} alt={full_name} />
          <AvatarFallback className="bg-gray-800 text-white text-xl">{initials}</AvatarFallback>
        </Avatar>
        
        <div className="text-center w-full mb-2">
          <p className="font-bold text-white truncate max-w-[160px] mx-auto">{full_name}</p>
          {role && (
            <p className="text-xs text-gray-200 mt-0.5">{role}</p>
          )}
          {birthdate && (
            <p className="text-xs text-gray-300 mt-0.5">Birth: {new Date(birthdate).getFullYear()}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-1 mb-2">
          {storyCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  variant="secondary" 
                  className="bg-amber-500/30 text-amber-100 border border-amber-500/30"
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  {storyCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{storyCount} {storyCount === 1 ? 'Story' : 'Stories'}</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {hasNewStories && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-orange-500 text-white flex items-center gap-1">
                  <Star className="h-3 w-3" /> New
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>New stories added recently</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        
        <div className="flex justify-center space-x-2 mt-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300">
                <MessageCircle className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send message</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300">
                <Phone className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Call</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300">
                <BookOpen className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View stories</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {/* Handles for connections */}
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
