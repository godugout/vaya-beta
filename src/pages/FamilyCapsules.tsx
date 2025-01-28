import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import Hero from "@/components/Hero";
import { CapsuleScrollSection } from "@/components/capsule/sections/CapsuleScrollSection";
import { Camera, Gift, Heart, Music, Star, Image, Book, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Capsule } from "@/components/ui/capsule/types";

const iconMap: { [key: string]: any } = {
  "Family Reunion": Users,
  "Holiday": Gift,
  "Wedding": Heart,
  "Summer": Camera,
  "Concert": Music,
  "Photos": Image,
  "Graduation": Book,
  "Birthday": Gift,
  "Recipes": Heart,
};

const getIconForTitle = (title: string) => {
  for (const [key, icon] of Object.entries(iconMap)) {
    if (title.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }
  return Star;
};

const getColorForIndex = (index: number) => {
  const colors = ["orange", "green", "blue", "yellow"];
  return colors[index % colors.length];
};

const fetchCapsules = async () => {
  const { data, error } = await supabase
    .from('capsule_schedules')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map((capsule, index) => ({
    title: capsule.title,
    link: `/capsules/${capsule.id}`,
    icon: getIconForTitle(capsule.title),
    colorKey: getColorForIndex(index),
    metadata: {
      creatorInitials: "JD", // We could fetch this from profiles if needed
      itemCount: 0, // We could count capsule_contents if needed
      status: capsule.status as "upcoming" | "active" | "locked" | "revealed",
      date: capsule.reveal_date,
    }
  }));
};

const FamilyCapsules = () => {
  const navigate = useNavigate();

  const { data: capsules, isLoading, error } = useQuery({
    queryKey: ['capsules'],
    queryFn: fetchCapsules,
  });

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

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading capsules...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error loading capsules</div>;
  }

  return (
    <div className="relative min-h-screen">
      <Hero />
      <CapsuleScrollSection capsules={capsules || []} />
    </div>
  );
};

export default FamilyCapsules;