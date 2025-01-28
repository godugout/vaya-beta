import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div 
        className="relative min-h-screen"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1501854140801-50d01698950b")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-white/75" />
        <div className="relative z-10">
          <Hero />
          <Features />
        </div>
      </div>
      <Testimonials />
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