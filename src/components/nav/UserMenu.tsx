
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
  Users,
  Image,
  TreeDeciduous,
  Layers,
  Feather
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
      : "VA";
  
  const userDisplayName = user.user_metadata?.full_name || "User";
  const userEmail = user.email || "user@example.com";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-ui-teal">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-ui-green text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{userDisplayName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        {/* Pages Navigation Section */}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <span className="text-xs text-muted-foreground">Pages</span>
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigate('/families')}>
          <Users className="mr-2 h-4 w-4" />
          <span>Families</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/family-capsules')}>
          <Layers className="mr-2 h-4 w-4" />
          <span>Family Capsules</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/media-library')}>
          <Image className="mr-2 h-4 w-4" />
          <span>Media Library</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/family/:id')}>
          <TreeDeciduous className="mr-2 h-4 w-4" />
          <span>Family Tree</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/sacred-foundation')}>
          <Feather className="mr-2 h-4 w-4" />
          <span>Sacred Foundation</span>
        </DropdownMenuItem>
        
        {/* Settings Section */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/account')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? (
            <>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark Mode</span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/theme')}>
          <Palette className="mr-2 h-4 w-4" />
          <span>Theme Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open('tel:+1234567890')}>
          <Phone className="mr-2 h-4 w-4" />
          <span>Contact Support</span>
        </DropdownMenuItem>
        
        {/* Sign Out */}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={async () => {
            setOpen(false);
            await handleSignOut();
          }}
          className="text-red-500 dark:text-red-400 focus:text-red-500 dark:focus:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
