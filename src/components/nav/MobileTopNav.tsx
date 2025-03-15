
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
    <div className="md:hidden fixed top-0 left-0 right-0 border-b bg-greystone-green z-50">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="h-8 w-8 text-white">
              {/* Greystone wave logo */}
              <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 15 Q 25 5, 40 15 T 70 15" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M10 25 Q 25 15, 40 25 T 70 25" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M10 35 Q 25 25, 40 35 T 70 35" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <span className="font-heading font-bold text-xl text-white ml-2">
              Vaya
            </span>
          </div>
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
