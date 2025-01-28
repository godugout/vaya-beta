import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const culturalBackgrounds = [
  // Mountain landscape - could represent Canada/Mexico
  "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  // Serene water scene - could represent Philippines
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  // Vibrant nature - could represent India
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  // Forest with sunlight - could represent Mexico/Canada
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
  // Mountain vista - could represent any region
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff"
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
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
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