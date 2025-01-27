import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Testimonials />
      <div className="bg-[#F8FAFC] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            A safe home for your memories
          </h2>
          <p className="text-lg leading-8 text-gray-600 mb-10 max-w-2xl mx-auto">
            We take privacy seriously. Your memories are securely stored and shared only with the family members you choose.
          </p>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png"
              alt="Vaya Security" 
              className="h-32 w-32"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;