
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";

interface FamilyMemberNodeProps {
  data: {
    full_name: string;
    avatar_url?: string | null;
    role?: string;
    isSelected?: boolean;
  };
  id: string;
  selected: boolean;
}

const FamilyMemberNode = ({ data, selected }: FamilyMemberNodeProps) => {
  const { full_name, avatar_url, role } = data;
  const initials = full_name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div 
      className={`flex flex-col items-center p-1 w-[140px] h-[140px] rounded-md transition-shadow ${
        selected ? 'ring-2 ring-blue-500 shadow-lg' : ''
      }`}
    >
      <div className="absolute top-1 right-1">
        <button className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700">
          <Ellipsis className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <Avatar className="h-16 w-16 mx-auto my-2">
        <AvatarImage src={avatar_url || ''} alt={full_name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      
      <div className="text-center mt-1">
        <p className="text-sm font-medium truncate max-w-[120px]">{full_name}</p>
        {role && <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>}
      </div>
      
      {/* Handles for connections */}
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      <Handle type="source" position={Position.Right} id="spouse" className="w-3 h-3" />
      <Handle type="target" position={Position.Left} id="spouse-target" className="w-3 h-3" />
    </div>
  );
};

export default memo(FamilyMemberNode);
