import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
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
      <Hero />
      <Features />
      <Testimonials />
      <div className="bg-[#F8FAFC] py-12 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 sm:mb-6">
            A safe home for your memories
          </h2>
          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            We take privacy seriously. Your memories are securely stored and shared only with the family members you choose.
          </p>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png"
              alt="Vaya Security" 
              className="h-24 w-24 sm:h-32 sm:w-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;