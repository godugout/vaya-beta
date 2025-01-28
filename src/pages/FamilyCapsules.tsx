import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import Hero from "@/components/Hero";
import { CapsuleScrollSection } from "@/components/capsule/sections/CapsuleScrollSection";
import { ExampleCapsules } from "@/components/capsule/ExampleCapsules";
import { CapsulePills } from "@/components/capsule/sections/CapsulePills";
import { Users, Gift, Heart, Camera, Music, Star, Image, Book } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { detailedCapsules, simpleCapsules } from "@/components/capsule/ExampleCapsules";

const FamilyCapsules = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Transform example capsules into the format expected by the table
  const allExampleCapsules = [...detailedCapsules, ...simpleCapsules].map(capsule => ({
    ...capsule,
    link: `/capsule/${Math.random().toString(36).substring(7)}`,
    metadata: capsule.metadata || {
      creatorInitials: "JD",
      itemCount: Math.floor(Math.random() * 20) + 1,
      status: ["upcoming", "active", "locked", "revealed"][Math.floor(Math.random() * 4)] as "upcoming" | "active" | "locked" | "revealed",
      date: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
    }
  }));

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
      <CapsulePills />
      <ExampleCapsules />
      <CapsuleScrollSection capsules={allExampleCapsules} />
    </div>
  );
};

export default FamilyCapsules;