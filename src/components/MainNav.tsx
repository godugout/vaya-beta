
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileTopNav } from "./nav/MobileTopNav";
import { MobileBottomNav } from "./nav/MobileBottomNav";

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
    <>
      <div className="fixed top-0 left-0 right-0 z-nav">
        <DesktopNav user={user} handleSignOut={handleSignOut} navigate={navigate} />
        <MobileTopNav user={user} handleSignOut={handleSignOut} navigate={navigate} />
      </div>
      <MobileBottomNav user={user} navigate={navigate} />
      
      {/* Content Padding - Adjusted for better mobile spacing */}
      <div className="h-16 md:h-20" /> {/* Top spacing */}
      <div className="md:hidden h-20" /> {/* Bottom spacing for mobile */}
    </>
  );
}
