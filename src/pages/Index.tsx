
import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Archive, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateFamilyWizard } from "@/components/family/CreateFamilyWizard";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { VoiceRecordingDemo } from "@/components/home/VoiceRecordingDemo";
import { Link } from "react-router-dom";

export default function Index() {
  const [showCreateFamily, setShowCreateFamily] = useState(false);

  return (
    <div className="page-container">
      {/* Main Hero Section - Agencs Simplified Style */}
      <section className="min-h-[90vh] flex items-center justify-center bg-white">
        <div className="container mx-auto px-4 text-center staggered-fade-in">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-medium mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Preserve,
          </motion.h1>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-medium mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Connect,
          </motion.h1>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Remember.
          </motion.h1>
          
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link to="/share-stories" className="agencs-btn">
              Start Recording
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Voice Recording Demo */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium mb-10 text-center">Simple Voice Recording</h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-sm p-6 relative z-10"
          >
            <VoiceRecordingDemo />
          </motion.div>
        </div>
      </section>
      
      {/* Key Features */}
      <div className="bg-gray-50">
        <Features />
      </div>
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* FAQ */}
      <div className="bg-gray-50">
        <FAQ />
      </div>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-floating">
        <Button 
          size="lg"
          onClick={() => setShowCreateFamily(true)}
          className="bg-black hover:bg-gray-800 text-white rounded-full shadow-sm"
        >
          <Users className="h-5 w-5 mr-2" />
          Create Family
        </Button>
      </div>
      
      {/* Create Family Wizard */}
      {showCreateFamily && <CreateFamilyWizard onOpenChange={setShowCreateFamily} open={showCreateFamily} />}
    </div>
  );
};
