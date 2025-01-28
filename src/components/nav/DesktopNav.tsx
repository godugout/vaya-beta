import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Clock, Box, Mic, Home } from "lucide-react";
import { User as UserType } from "@supabase/supabase-js";
import { UserMenu } from "./UserMenu";

interface DesktopNavProps {
  user: UserType | null;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
}

export const DesktopNav = ({ user, handleSignOut, navigate }: DesktopNavProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="border-b bg-[#222222] hidden md:block">
      <div className="flex h-20 items-center px-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-1.5 group">
          <img 
            src="/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png" 
            alt="Vaya Logo" 
            className="h-10 w-10"
          />
          <span className="font-outfit font-bold text-2xl text-white">
            Vaya<sup className="text-vaya-stories group-hover:text-vaya-stories transition-colors duration-200 text-2xl font-semibold">ᵅ</sup>
          </span>
        </Link>
        <nav className="flex items-center space-x-10 ml-12">
          <Link
            to="/"
            className={`text-base font-medium transition-all duration-200 hover:text-white inline-flex items-center gap-2 relative
              ${isActive('/') ? 'text-white' : 'text-gray-300'}
              after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-vaya-capsules after:bottom-[-4px] after:left-0
              after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300
              ${isActive('/') ? 'after:scale-x-100' : ''}`}
          >
            Home
            <Home className="h-5 w-5" />
          </Link>
          <Link
            to="/share-stories"
            className={`text-base font-medium transition-all duration-200 hover:text-white inline-flex items-center gap-2 relative
              ${isActive('/share-stories') ? 'text-white' : 'text-gray-300'}
              after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-vaya-capsules after:bottom-[-4px] after:left-0
              after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300
              ${isActive('/share-stories') ? 'after:scale-x-100' : ''}`}
          >
            Share Stories
            <Mic className="h-5 w-5" />
          </Link>
          <Link
            to="/memory-lane"
            className={`text-base font-medium transition-all duration-200 hover:text-white inline-flex items-center gap-2 relative
              ${isActive('/memory-lane') ? 'text-white' : 'text-gray-300'}
              after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-vaya-capsules after:bottom-[-4px] after:left-0
              after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300
              ${isActive('/memory-lane') ? 'after:scale-x-100' : ''}`}
          >
            Memory Lane
            <Clock className="h-5 w-5" />
          </Link>
          <Link
            to="/family-capsules"
            className={`text-base font-medium transition-all duration-200 hover:text-white inline-flex items-center gap-2 relative
              ${isActive('/family-capsules') ? 'text-white' : 'text-gray-300'}
              after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-vaya-capsules after:bottom-[-4px] after:left-0
              after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300
              ${isActive('/family-capsules') ? 'after:scale-x-100' : ''}`}
          >
            Family Capsules
            <Box className="h-5 w-5" />
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
          ) : (
            <Button 
              onClick={() => navigate("/auth")}
              className="bg-vaya-capsules hover:bg-vaya-capsules/90 text-white text-base px-6 py-2"
            >
              Sign In
              <Box className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};