
import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { UserMenu } from "./UserMenu";
import { GuestMenu } from "./GuestMenu";
import { cn } from "@/lib/utils";
import { Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);
  
  const mobileMenuItems = [
    { label: "Home", path: "/" },
    { label: "Stories", path: "/share-stories" },
    { label: "Memories", path: "/memory-lane" },
    { label: "Capsules", path: "/family-capsules" },
    { label: "Family", path: "/families" },
  ];
  
  return (
    <div className="md:hidden py-3 px-4 flex items-center justify-between bg-black/80 backdrop-blur-md border-b border-white/10">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-black/95 text-white border-r border-white/10">
          <div className="flex flex-col gap-6 mt-6">
            <Link 
              to="/" 
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <div className="h-10 w-10 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
                  alt="Vaya Logo" 
                  className="h-7 w-7 object-contain"
                />
              </div>
              <span className="text-lg font-heading font-semibold text-white">Vaya</span>
            </Link>
            
            <nav className="flex flex-col gap-1">
              {mobileMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-4 py-3 hover:bg-white/10 rounded-md"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
      
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-1"
        aria-label="Go to homepage"
      >
        <div className="h-9 w-9 flex items-center justify-center">
          <img 
            src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
            alt="Vaya Logo" 
            className="h-7 w-7 object-contain"
          />
        </div>
        <span className="text-lg font-heading font-semibold text-white">Vaya</span>
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
