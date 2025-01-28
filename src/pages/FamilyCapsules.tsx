import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import Hero from "@/components/Hero";
import { CapsulePills } from "@/components/capsule/sections/CapsulePills";
import { CapsuleScrollSection } from "@/components/capsule/sections/CapsuleScrollSection";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

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
  const { data: userFamilies, error: familiesError } = await supabase
    .from('family_members')
    .select('family_id')
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

  if (familiesError) throw familiesError;

  const familyIds = userFamilies.map(fm => fm.family_id);

  const { data, error } = await supabase
    .from('capsule_schedules')
    .select(`
      id,
      title,
      description,
      memory_count,
      status,
      created_at,
      thumbnail_url,
      lock_deadline,
      reveal_date
    `)
    .in('family_id', familyIds)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map((capsule, index) => ({
    title: capsule.title,
    link: `/capsule/${capsule.id}`,
    icon: getIconForTitle(capsule.title),
    colorKey: getColorForIndex(index),
    metadata: {
      creatorInitials: "JD",
      itemCount: capsule.memory_count || 0,
      status: capsule.status as "upcoming" | "active" | "locked" | "revealed",
      date: capsule.reveal_date,
    }
  }));
};

const FamilyCapsules = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading capsules",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading capsules...</div>;
  }

  return (
    <div className="relative min-h-screen">
      <Hero />
      <CapsulePills />
      <CapsuleScrollSection capsules={capsules || []} />
    </div>
  );
};

export default FamilyCapsules;
