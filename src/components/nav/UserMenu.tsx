
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { 
  User as UserIcon, 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  Phone,
  Palette,
  HelpCircle,
  Bookmark,
  Archive
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface UserMenuProps {
  user: User | null;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
}

export const UserMenu = ({ user, handleSignOut, navigate }: UserMenuProps) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  
  if (!user) return null;
  
  const userInitials = user.user_metadata?.full_name
    ? user.user_metadata.full_name.substring(0, 2).toUpperCase()
    : user.email 
      ? user.email.substring(0, 2).toUpperCase() 
      : "VA";
  
  const userDisplayName = user.user_metadata?.full_name || "User";
  const userEmail = user.email || "user@example.com";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden">
          <Avatar className="h-10 w-10 border-2 border-autumn">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-autumn text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <motion.span 
            className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="p-4 border-b">
          <div className="flex flex-col space-y-1">
            <p className="text-base font-semibold">{userDisplayName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        
        <div className="p-2">
          <DropdownMenuItem onClick={() => navigate('/profile')} className="p-2 cursor-pointer">
            <UserIcon className="mr-3 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/saved-stories')} className="p-2 cursor-pointer">
            <Bookmark className="mr-3 h-4 w-4" />
            <span>Saved Stories</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/family-capsules')} className="p-2 cursor-pointer">
            <Archive className="mr-3 h-4 w-4" />
            <span>My Capsules</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/account')} className="p-2 cursor-pointer">
            <Settings className="mr-3 h-4 w-4" />
            <span>Account Settings</span>
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <DropdownMenuItem 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 cursor-pointer"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="mr-3 h-4 w-4" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="mr-3 h-4 w-4" />
                <span>Dark Mode</span>
              </>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/theme')} className="p-2 cursor-pointer">
            <Palette className="mr-3 h-4 w-4" />
            <span>Theme Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/help')} className="p-2 cursor-pointer">
            <HelpCircle className="mr-3 h-4 w-4" />
            <span>Help & Support</span>
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <DropdownMenuItem 
            onClick={async () => {
              setOpen(false);
              await handleSignOut();
            }}
            className="p-2 cursor-pointer text-red-500 dark:text-red-400 focus:text-red-500 dark:focus:text-red-400"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
