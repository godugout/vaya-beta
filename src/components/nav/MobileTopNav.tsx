
import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { UserMenu } from "./UserMenu";
import { GuestMenu } from "./GuestMenu";
import { cn } from "@/lib/utils";
import { ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileTopNavProps {
  user: User | null;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
  isSimplifiedView?: boolean;
  onSettingsToggle?: () => void;
}

export const MobileTopNav = ({ 
  user, 
  handleSignOut, 
  navigate, 
  isSimplifiedView,
  onSettingsToggle
}: MobileTopNavProps) => {
  return (
    <div className="md:hidden py-3 px-4 flex items-center justify-between">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-1"
        aria-label="Go to homepage"
      >
        <img src="/lovable-uploads/4425ec86-56fe-44c4-9f47-75e59d3cb287.png" alt="Vaya Logo" className="h-7" />
        <span className="text-lg font-heading font-semibold text-forest dark:text-leaf">Vaya</span>
      </button>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onSettingsToggle}
          className="rounded-full"
          aria-label={isSimplifiedView ? "Use standard view" : "Use simplified view"}
        >
          <Settings className="h-5 w-5" />
        </Button>
        
        {user ? (
          <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
        ) : (
          <GuestMenu navigate={navigate} />
        )}
      </div>
    </div>
  );
};
