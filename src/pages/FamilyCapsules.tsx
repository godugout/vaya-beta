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

// Font showcase component
const FontShowcase = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">Font Variations for Vaya Logo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Original Outfit Font */}
          <div className="p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-200 cursor-pointer">
            <span className="font-outfit font-bold text-5xl block mb-2">
              Vaya<sup className="text-vaya-stories">α</sup>
            </span>
            <p className="text-sm text-gray-600">Outfit (Current)</p>
          </div>
          
          {/* Playfair Display */}
          <div className="p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-200 cursor-pointer">
            <span className="font-playfair font-bold text-5xl block mb-2">
              Vaya<sup className="text-vaya-stories">α</sup>
            </span>
            <p className="text-sm text-gray-600">Playfair Display</p>
          </div>
          
          {/* Montserrat */}
          <div className="p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-200 cursor-pointer">
            <span className="font-montserrat font-bold text-5xl block mb-2">
              Vaya<sup className="text-vaya-stories">α</sup>
            </span>
            <p className="text-sm text-gray-600">Montserrat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FamilyCapsules = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Transform example capsules into the format expected by the table
  const allExampleCapsules = [...detailedCapsules, ...simpleCapsules].map(capsule => ({
    ...capsule,
    link: `/capsule/${crypto.randomUUID()}`,
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
      <FontShowcase />
      <ExampleCapsules />
      <CapsulePills />
      <CapsuleScrollSection capsules={allExampleCapsules} />
    </div>
  );
};

export default FamilyCapsules;