import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { UserMenu } from "./UserMenu";

interface DesktopNavProps {
  user: User | null;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
}

export const DesktopNav = ({ user, handleSignOut, navigate }: DesktopNavProps) => {
  return (
    <div className="border-b bg-[#222222] hidden md:block">
      <div className="flex h-20 items-center px-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-1 group">
          <img 
            src="/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png" 
            alt="Vaya Logo" 
            className="h-10 w-10"
          />
          <span className="font-outfit font-bold text-2xl text-white">
            Vaya<sup className="text-vaya-stories group-hover:text-vaya-stories transition-colors duration-200">α</sup>
          </span>
        </Link>
        <nav className="flex items-center space-x-10 ml-12">
          <Link to="/" className="text-white hover:text-vaya-capsules transition-colors">Home</Link>
          <Link to="/share-stories" className="text-white hover:text-vaya-capsules transition-colors">Share</Link>
          <Link to="/memory-lane" className="text-white hover:text-vaya-capsules transition-colors">Memory Lane</Link>
          <Link to="/family-capsules" className="text-white hover:text-vaya-capsules transition-colors">Capsules</Link>
        </nav>
        <div className="ml-auto">
          {user ? (
            <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
          ) : (
            <Link to="/auth" className="text-white hover:text-vaya-capsules transition-colors">Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
};
