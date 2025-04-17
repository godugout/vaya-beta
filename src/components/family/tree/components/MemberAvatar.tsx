
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MemberAvatarProps {
  full_name: string;
  avatar_url?: string | null;
  isInDirectLineage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const MemberAvatar = ({ 
  full_name, 
  avatar_url, 
  isInDirectLineage = false,
  size = 'md'
}: MemberAvatarProps) => {
  const initials = full_name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-20 w-20',
    lg: 'h-24 w-24'
  };

  return (
    <Avatar className={`${sizeClasses[size]} mx-auto mb-3 border-2 ${isInDirectLineage ? 'border-amber-400' : 'border-gray-700'}`}>
      <AvatarImage src={avatar_url || ''} alt={full_name} />
      <AvatarFallback className="bg-gray-800 text-white text-xl">{initials}</AvatarFallback>
    </Avatar>
  );
};
