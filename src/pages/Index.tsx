import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const culturalBackgrounds = [
  // Japanese-inspired landscape - serene mountain view with cherry blossoms
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
  // Vietnamese/Asian rice terraces and mountains
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
  // Italian/Mediterranean coastal scene
  "https://images.unsplash.com/photo-1499678329028-101435549a4e",
  // Korean temple architecture in nature setting
  "https://images.unsplash.com/photo-1578637387939-43c525550085",
  // Portuguese/Italian villa and countryside
  "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e",
  // Chinese traditional architecture and nature
  "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
  // African American family gathering/community scene
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
];

const Index = () => {
  const navigate = useNavigate();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    // Rotate background images every 7 seconds
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % culturalBackgrounds.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div 
        className="relative transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url("${culturalBackgrounds[currentBgIndex]}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
            backdropFilter: 'blur(1px)',
          }}
        />
        <div className="relative z-10">
          <Hero />
          <Features />
        </div>
      </div>
      <div className="bg-[#F8FAFC] py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            A safe home for your memories
          </h2>
          <p className="mt-4 text-lg text-gray-600 sm:text-xl max-w-2xl mx-auto">
            We take privacy seriously. Your memories are securely stored and shared only with the family members you choose.
          </p>
          <div className="flex justify-center mt-8">
            <img 
              src="/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png"
              alt="Vaya Security" 
              className="h-24 w-24 sm:h-32 sm:w-32"
            />
          </div>
        </div>
      </div>
      <FAQ />
    </div>
  );
}

export default Index;