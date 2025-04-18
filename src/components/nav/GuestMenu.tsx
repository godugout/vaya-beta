
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { 
  User as UserIcon, 
  LogIn, 
  Moon, 
  Sun, 
  HelpCircle,
  Info
} from "lucide-react";

interface GuestMenuProps {
  navigate: (path: string) => void;
}

export const GuestMenu = ({ navigate }: GuestMenuProps) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full" style={{ zIndex: 210 }}>
          <UserIcon className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Sign In</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" style={{ zIndex: 220, backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
        <div className="p-2">
          <DropdownMenuItem 
            onClick={() => navigate('/auth')}
            className="p-2 cursor-pointer"
          >
            <LogIn className="mr-3 h-4 w-4" />
            <span>Sign In / Register</span>
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
          
          <DropdownMenuItem onClick={() => navigate('/about')} className="p-2 cursor-pointer">
            <Info className="mr-3 h-4 w-4" />
            <span>About Us</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/help')} className="p-2 cursor-pointer">
            <HelpCircle className="mr-3 h-4 w-4" />
            <span>Help Center</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
