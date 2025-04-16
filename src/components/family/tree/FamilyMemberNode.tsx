
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, MessageCircle, Phone, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface FamilyMemberNodeProps {
  data: {
    full_name: string;
    avatar_url?: string | null;
    role?: string;
    isSelected?: boolean;
    storyCount?: number;
  };
  id: string;
  selected: boolean;
}

const FamilyMemberNode = ({ data, id, selected }: FamilyMemberNodeProps) => {
  const { full_name, avatar_url, role, storyCount = 0 } = data;
  
  const initials = full_name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`flex flex-col items-center p-3 w-[180px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border-2 transition-all ${
        selected 
          ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
          : 'border-gray-700'
      }`}
    >
      <div className="absolute top-2 right-2 z-10">
        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-400">
          <MoreHorizontal className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <Avatar className="h-20 w-20 mx-auto mb-3 border-2 border-gray-700">
        <AvatarImage src={avatar_url || ''} alt={full_name} />
        <AvatarFallback className="bg-blue-600 text-white text-xl">{initials}</AvatarFallback>
      </Avatar>
      
      <div className="text-center w-full mb-2">
        <p className="font-bold text-white truncate max-w-[160px] mx-auto">{full_name}</p>
        {role && (
          <p className="text-xs text-gray-400 mt-0.5">{role}</p>
        )}
      </div>
      
      {storyCount > 0 && (
        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-2">
          {storyCount} {storyCount === 1 ? 'Story' : 'Stories'}
        </Badge>
      )}
      
      <div className="flex justify-center space-x-2 mt-1">
        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300">
          <MessageCircle className="h-3.5 w-3.5" />
        </Button>
        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300">
          <Phone className="h-3.5 w-3.5" />
        </Button>
        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300">
          <BookOpen className="h-3.5 w-3.5" />
        </Button>
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
  );
};

export default memo(FamilyMemberNode);
