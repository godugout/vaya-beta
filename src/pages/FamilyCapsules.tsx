import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import Hero from "@/components/Hero";
import { CapsuleScrollSection } from "@/components/capsule/sections/CapsuleScrollSection";
import { BackToFutureSection } from "@/components/capsule/sections/BackToFutureSection";
import { Camera, Gift, Heart, Music, Star } from "lucide-react";

const sampleCapsules = [
  {
    title: "Family Reunion 2024",
    link: "/capsules/reunion-2024",
    icon: Star,
    colorKey: "orange",
    metadata: {
      creatorInitials: "JD",
      itemCount: 12,
      status: "upcoming" as const,
      date: "2024-07-15",
    }
  },
  {
    title: "Holiday Memories",
    link: "/capsules/holidays",
    icon: Gift,
    colorKey: "green",
    metadata: {
      creatorInitials: "MC",
      itemCount: 8,
      status: "active" as const,
      date: "2023-12-25",
    }
  },
  {
    title: "Wedding Anniversary",
    link: "/capsules/anniversary",
    icon: Heart,
    colorKey: "orange",
    metadata: {
      creatorInitials: "AS",
      itemCount: 15,
      status: "locked" as const,
      date: "2024-02-14",
    }
  },
  {
    title: "Summer Vacation",
    link: "/capsules/summer",
    icon: Camera,
    colorKey: "green",
    metadata: {
      creatorInitials: "RK",
      itemCount: 6,
      status: "active" as const,
      date: "2024-06-01",
    }
  },
  {
    title: "Family Concert",
    link: "/capsules/concert",
    icon: Music,
    colorKey: "orange",
    metadata: {
      creatorInitials: "PL",
      itemCount: 4,
      status: "revealed" as const,
      date: "2023-11-30",
    }
  }
];

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
      <CapsuleScrollSection capsules={sampleCapsules} />
      <BackToFutureSection />
    </div>
  );
};

export default FamilyCapsules;