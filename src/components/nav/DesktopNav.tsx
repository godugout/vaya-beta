import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Clock, Box, Mic, Home } from "lucide-react";
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
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png" 
            alt="Vaya Logo" 
            className="h-8 w-8"
          />
          <span className="font-outfit font-bold text-xl text-white">
            Vaya<sup>α</sup>
          </span>
        </Link>
        <nav className="flex items-center space-x-8 ml-12">
          <Link
            to="/"
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white inline-flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            to="/share-stories"
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white inline-flex items-center gap-2"
          >
            <Mic className="h-4 w-4" />
            Share Stories
          </Link>
          <Link
            to="/memory-lane"
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white inline-flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            Memory Lane
          </Link>
          <Link
            to="/family-capsules"
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white inline-flex items-center gap-2"
          >
            <Box className="h-4 w-4" />
            Family Capsules
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
          ) : (
            <Button 
              onClick={() => navigate("/auth")}
              className="bg-vaya-secondary hover:bg-vaya-secondary/90 text-white"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};