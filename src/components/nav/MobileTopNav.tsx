import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { UserMenu } from "./UserMenu";

interface MobileTopNavProps {
  user: User | null;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
}

export const MobileTopNav = ({ user, handleSignOut, navigate }: MobileTopNavProps) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 border-b bg-[#222222] z-50">
      <div className="flex h-16 items-center px-4">
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
        <div className="ml-auto">
          {user && (
            <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
          )}
        </div>
      </div>
    </div>
  );
};