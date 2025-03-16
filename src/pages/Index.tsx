
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CreateFamilyWizard } from "@/components/family/CreateFamilyWizard";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { Link } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { HomeRecordingSection } from "@/components/home/HomeRecordingSection";
import { useActivityTracking } from "@/hooks/useActivityTracking";
import { ActivityTypes } from "@/hooks/useActivityTracking";
import { useEffect } from "react";

export default function Index() {
  const [showCreateFamily, setShowCreateFamily] = useState(false);
  const { trackActivity } = useActivityTracking();

  useEffect(() => {
    // Track page view when component mounts
    trackActivity(ActivityTypes.PAGE_VIEW, { 
      page: "home",
      referrer: document.referrer
    });
  }, []);

  return (
    <div className="page-container">
      <MainNav />
      
      {/* Main Hero Section - Agencs Simplified Style */}
      <section className="min-h-[90vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center staggered-fade-in">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-medium mb-3 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Preserve,
          </motion.h1>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-medium mb-3 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Connect,
          </motion.h1>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-medium mb-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Remember.
          </motion.h1>
          
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <HomeRecordingSection />
          </motion.div>
        </div>
      </section>
      
      {/* Key Features */}
      <div className="bg-gray-950">
        <Features />
      </div>
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* FAQ */}
      <div className="bg-gray-950">
        <FAQ />
      </div>
      
      {/* Create Family Wizard */}
      {showCreateFamily && <CreateFamilyWizard onOpenChange={setShowCreateFamily} open={showCreateFamily} />}
    </div>
  );
};
