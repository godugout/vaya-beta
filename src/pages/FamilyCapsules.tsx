import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { CapsuleLayout } from "@/components/ui/capsule/CapsuleLayout";
import Hero from "@/components/Hero";
import { capsules } from "@/data/capsules"; // We'll keep using the sample data for now

const FamilyCapsules = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="relative min-h-screen">
      <Hero />
      <CapsuleLayout capsules={capsules} />
    </div>
  );
};

export default FamilyCapsules;
