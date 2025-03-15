
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogOut, User as UserIcon, Settings, Users, Sun, Moon } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { useTheme } from "next-themes";

interface UserMenuProps {
  user: User;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
}

export const UserMenu = ({ user, handleSignOut, navigate }: UserMenuProps) => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex items-center gap-2">
      <LanguageSelector />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 hover:bg-[#333333] z-content"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata.full_name}
              />
              <AvatarFallback>
                <UserIcon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 z-floating" align="end" forceMount>
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>User Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/families")}>
            <Users className="mr-2 h-4 w-4" />
            <span>My Families</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/account")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Account Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? (
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
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
