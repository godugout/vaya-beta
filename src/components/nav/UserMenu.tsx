
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
  Book, 
  Users,
  Archive,
  Home
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      : "U";
  
  const userDisplayName = user.user_metadata?.full_name || "User";
  const userEmail = user.email || "";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-autumn">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64 z-[200]">
        <DropdownMenuLabel className="p-4 border-b">
          <div className="flex flex-col space-y-1">
            <p className="text-base font-semibold">{userDisplayName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        
        <div className="p-2">
          <DropdownMenuItem onClick={() => navigate('/')} className="p-2">
            <Home className="mr-3 h-4 w-4" />
            <span>Home</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/profile')} className="p-2">
            <UserIcon className="mr-3 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/memory-lane')} className="p-2">
            <Book className="mr-3 h-4 w-4" />
            <span>Memories</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/families')} className="p-2">
            <Users className="mr-3 h-4 w-4" />
            <span>Families</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/capsules')} className="p-2">
            <Archive className="mr-3 h-4 w-4" />
            <span>Time Capsules</span>
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <DropdownMenuItem onClick={() => navigate('/settings')} className="p-2">
            <Settings className="mr-3 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2"
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
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <DropdownMenuItem 
            onClick={handleSignOut}
            className="p-2 text-red-500 dark:text-red-400"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
