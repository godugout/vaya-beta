
import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { UserMenu } from "./UserMenu";
import { GuestMenu } from "./GuestMenu";
import { cn } from "@/lib/utils";
import { Bell, Menu, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { NavButton } from "./NavButton";

interface MobileTopNavProps {
  user?: User | null;
  handleSignOut?: () => Promise<void>;
  navigate?: (path: string) => void;
  isSimplifiedView?: boolean;
  onSettingsToggle?: () => void;
  className?: string;
}

export const MobileTopNav = ({ 
  user, 
  handleSignOut, 
  navigate, 
  isSimplifiedView,
  onSettingsToggle,
  className
}: MobileTopNavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className={`mobile-top-nav ${className || ''}`}>
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full h-10 w-10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pt-12">
              <div className="flex flex-col gap-4">
                <NavButton 
                  to="/" 
                  icon={<Search className="h-5 w-5" />} 
                  label="Search" 
                  isSimplified={false} 
                />
                <NavButton 
                  to="/" 
                  icon={<Search className="h-5 w-5" />} 
                  label="Home" 
                  isSimplified={false} 
                />
                <NavButton 
                  to="/share-stories" 
                  icon={<Search className="h-5 w-5" />} 
                  label="Stories" 
                  isSimplified={false} 
                />
                <NavButton 
                  to="/memory-lane" 
                  icon={<Search className="h-5 w-5" />} 
                  label="Memories" 
                  isSimplified={false} 
                />
                <NavButton 
                  to="/family-capsules" 
                  icon={<Search className="h-5 w-5" />} 
                  label="Capsules" 
                  isSimplified={false} 
                />
                {user && (
                  <NavButton 
                    to="/families" 
                    icon={<Search className="h-5 w-5" />} 
                    label="Family" 
                    isSimplified={false} 
                  />
                )}
              </div>
            </SheetContent>
          </Sheet>
          
          <button 
            onClick={() => navigate && navigate('/')} 
            className={cn(
              "flex items-center gap-1",
              isSimplifiedView && "scale-110"
            )}
            aria-label="Go to homepage"
          >
            <img src="/lovable-uploads/4425ec86-56fe-44c4-9f47-75e59d3cb287.png" alt="Vaya Logo" className="h-8" />
            <span className="text-lg font-heading font-semibold text-forest dark:text-leaf">Vaya</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-10 w-10"
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          
          {user && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-10 w-10"
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onSettingsToggle}
            className={cn(
              "rounded-full h-10 w-10",
              isSimplifiedView && "bg-black/5 dark:bg-white/10"
            )}
            aria-label={isSimplifiedView ? "Use standard view" : "Use simplified view"}
          >
            <Settings className={cn(
              "h-5 w-5",
              isSimplifiedView && "text-autumn"
            )} />
          </Button>
          
          {user && handleSignOut && navigate ? (
            <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
          ) : navigate ? (
            <GuestMenu navigate={navigate} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
