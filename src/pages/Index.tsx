import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

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
      <div className="relative">
        <Hero />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-20 right-10 w-96 h-96"
        >
          <img
            src="/lovable-uploads/4425ec86-56fe-44c4-9f47-75e59d3cb287.png"
            alt="Student illustration"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
      <Testimonials />
    </div>
  );
}

export default Index;