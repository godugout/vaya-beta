import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const culturalBackgrounds = [
  // Japanese family enjoying hanami (cherry blossom viewing) together
  "https://images.unsplash.com/photo-1522543558187-768b6df7c25c",
  // Vietnamese family sharing a traditional meal
  "https://images.unsplash.com/photo-1583394293214-28ded15ee548",
  // Italian multigenerational family gathering in a traditional courtyard
  "https://images.unsplash.com/photo-1545062156-d69c67b27679",
  // Korean family celebrating Chuseok together
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
  // Portuguese family at a colorful street festival
  "https://images.unsplash.com/photo-1536663815808-535e2280d2c2",
  // Chinese family reunion dinner celebration
  "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a",
  // African American family backyard gathering
  "https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2"
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