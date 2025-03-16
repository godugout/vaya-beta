
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
        <div className="relative h-9 w-9 rounded-lg bg-black flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {/* Star dots background */}
            <span className="absolute h-1 w-1 bg-white rounded-full top-1 left-1"></span>
            <span className="absolute h-1 w-1 bg-white rounded-full top-2 right-2"></span>
            <span className="absolute h-0.5 w-0.5 bg-white rounded-full bottom-2 left-2"></span>
            <span className="absolute h-0.5 w-0.5 bg-white rounded-full bottom-1 right-1"></span>
          </div>
          <img 
            src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
            alt="Vaya Logo" 
            className="h-6 w-6 object-contain"
          />
        </div>
        <span className="text-lg font-heading font-semibold text-forest dark:text-autumn">Vaya</span>
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
