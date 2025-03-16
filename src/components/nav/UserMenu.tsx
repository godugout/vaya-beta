
import React from 'react';
import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User as UserIcon, Book, Sparkles } from "lucide-react";
import { motion } from 'framer-motion';

interface UserMenuProps {
  user: User;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, handleSignOut, navigate }) => {
  const userInitials = (() => {
    const fullName = user?.user_metadata?.full_name || '';
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return fullName ? fullName[0].toUpperCase() : 'U';
  })();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full" asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
            <Avatar className="h-9 w-9 border-2 border-autumn/20 bg-black/50 backdrop-blur">
              <AvatarImage 
                src={user?.user_metadata?.avatar_url} 
                alt={user?.user_metadata?.full_name || 'User'}
              />
              <AvatarFallback className="bg-autumn/10 text-autumn">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <motion.span
              className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background bg-green-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/10 text-white" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user?.user_metadata?.full_name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-white/10"
          onClick={() => navigate('/profile')}
        >
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-white/10"
          onClick={() => navigate('/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-white/10"
          onClick={() => navigate('/family-stories')}
        >
          <Book className="mr-2 h-4 w-4" />
          <span>My Stories</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-white/10"
          onClick={() => navigate('/hanuman-edition')}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          <span>Hanuman Edition</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem 
          className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
