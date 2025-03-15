
import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { UserMenu } from "./UserMenu";
import { cn } from "@/lib/utils";
import { ArrowLeft, Settings } from "lucide-react";

interface MobileTopNavProps {
  user: User | null;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
  isSimplifiedView?: boolean;
  showBackButton?: boolean;
  title?: string;
  onBack?: () => void;
  onSettingsToggle?: () => void;
}

export const MobileTopNav = ({ 
  user, 
  handleSignOut, 
  navigate, 
  isSimplifiedView = false,
  showBackButton = false,
  title,
  onBack,
  onSettingsToggle
}: MobileTopNavProps) => {
  return (
    <div className={cn(
      "md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-gray-800 z-nav shadow-sm",
      isSimplifiedView && "simplified-nav"
    )}>
      <div className="flex h-16 items-center px-4">
        {showBackButton && onBack ? (
          <button 
            onClick={onBack}
            className="mr-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className={cn("h-5 w-5", isSimplifiedView && "h-6 w-6")} />
          </button>
        ) : (
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="h-8 w-8 text-ui-orange">
                {/* Stylized nature wave logo */}
                <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 15 Q 25 5, 40 15 T 70 15" stroke="currentColor" strokeWidth="3" fill="none" />
                  <path d="M10 25 Q 25 15, 40 25 T 70 25" stroke="currentColor" strokeWidth="3" fill="none" />
                  <path d="M10 35 Q 25 25, 40 35 T 70 35" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <span className="font-heading font-bold text-xl text-ui-orange ml-2">
                Vaya
              </span>
            </div>
          </Link>
        )}
        
        {title && (
          <h1 className={cn(
            "text-lg font-medium mx-auto",
            isSimplifiedView && "text-xl"
          )}>
            {title}
          </h1>
        )}
        
        <div className="ml-auto flex items-center gap-2">
          {onSettingsToggle && (
            <button 
              onClick={onSettingsToggle}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Settings className={cn("h-5 w-5", isSimplifiedView && "h-6 w-6")} />
            </button>
          )}
          
          {user && (
            <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
          )}
        </div>
      </div>
    </div>
  );
};
