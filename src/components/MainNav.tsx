import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon, Clock, FolderTree, Box, Settings } from "lucide-react";

export function MainNav() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link to="/" className="font-bold text-xl text-vaya-orange">
          Vaya Alpha
        </Link>
        <nav className="flex items-center space-x-8 ml-12">
          <Link
            to="/memory-lane"
            className="text-sm font-medium transition-colors hover:text-vaya-orange inline-flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            Memory Lane
          </Link>
          <Link
            to="/family-tree"
            className="text-sm font-medium transition-colors hover:text-vaya-orange inline-flex items-center gap-2"
          >
            <FolderTree className="h-4 w-4" />
            Family Tree
          </Link>
          <Link
            to="/capsules"
            className="text-sm font-medium transition-colors hover:text-vaya-orange inline-flex items-center gap-2"
          >
            <Box className="h-4 w-4" />
            Capsules
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <>
              <Button
                variant="ghost"
                className="gap-2"
                onClick={() => navigate("/record")}
              >
                Create Memory
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata.full_name}
                      />
                      <AvatarFallback>
                        <UserIcon className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")}>Sign In</Button>
          )}
        </div>
      </div>
    </div>
  );
}