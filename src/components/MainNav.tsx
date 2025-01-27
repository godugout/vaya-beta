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
      <DesktopNav user={user} handleSignOut={handleSignOut} navigate={navigate} />
      <MobileTopNav user={user} handleSignOut={handleSignOut} navigate={navigate} />
      <MobileBottomNav user={user} navigate={navigate} />
      
      {/* Mobile Content Padding */}
      <div className="md:hidden h-16" />
      <div className="md:hidden h-16 mb-16" />
    </>
  );
}