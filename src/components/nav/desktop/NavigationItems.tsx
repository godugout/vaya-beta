
import { Link, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { 
  Home, 
  BookOpen, 
  Package, 
  Users, 
  Clock,
  FileAudio
} from "lucide-react";

interface NavigationItemsProps {
  user?: User | null;
  isSimplifiedView?: boolean;
  className?: string;
}

export const NavigationItems = ({ 
  user, 
  isSimplifiedView, 
  className 
}: NavigationItemsProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className={cn("flex items-center space-x-1", className)}>
      <Link
        to="/"
        className={cn(
          "nav-item flex items-center gap-2 px-3 py-2",
          isActive("/") && "active"
        )}
      >
        <Home className="h-5 w-5" />
        <span className={isSimplifiedView ? "sr-only" : ""}>Home</span>
      </Link>
      
      <Link
        to="/memory-lane"
        className={cn(
          "nav-item flex items-center gap-2 px-3 py-2",
          isActive("/memory-lane") && "active"
        )}
      >
        <FileAudio className="h-5 w-5" />
        <span className={isSimplifiedView ? "sr-only" : ""}>Memory Lane</span>
      </Link>
      
      <Link
        to="/share-stories"
        className={cn(
          "nav-item flex items-center gap-2 px-3 py-2",
          isActive("/share-stories") && "active"
        )}
      >
        <BookOpen className="h-5 w-5" />
        <span className={isSimplifiedView ? "sr-only" : ""}>Stories</span>
      </Link>
      
      <Link
        to="/family-capsules"
        className={cn(
          "nav-item flex items-center gap-2 px-3 py-2",
          isActive("/family-capsules") && "active"
        )}
      >
        <Package className="h-5 w-5" />
        <span className={isSimplifiedView ? "sr-only" : ""}>Capsules</span>
      </Link>
      
      {user && (
        <Link
          to="/families"
          className={cn(
            "nav-item flex items-center gap-2 px-3 py-2",
            isActive("/families") && "active"
          )}
        >
          <Users className="h-5 w-5" />
          <span className={isSimplifiedView ? "sr-only" : ""}>Family</span>
        </Link>
      )}
      
      <Link
        to="/timeline"
        className={cn(
          "nav-item flex items-center gap-2 px-3 py-2",
          isActive("/timeline") && "active"
        )}
      >
        <Clock className="h-5 w-5" />
        <span className={isSimplifiedView ? "sr-only" : ""}>Timeline</span>
      </Link>
    </nav>
  );
};
