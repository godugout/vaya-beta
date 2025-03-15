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
import { HeroPattern } from "@/components/hero/HeroPattern";
import { ExampleCapsules } from "@/components/capsule/ExampleCapsules";

export default function Index() {
  const [showCreateFamily, setShowCreateFamily] = useState(false);

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Main Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <HeroPattern />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Preserve Your Family's Voice<br />
              <span className="text-ui-orange">Share Your Story</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Vaya helps you capture, organize, and share meaningful family memories that persist for generations through voice-first storytelling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/share-stories">
                <Button 
                  size="lg" 
                  className="bg-ui-orange hover:bg-ui-orange/90 text-white font-medium w-full sm:w-auto"
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Start Recording
                </Button>
              </Link>
              
              <Link to="/family-capsules">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 w-full sm:w-auto"
                >
                  <Archive className="mr-2 h-5 w-5" />
                  Create Capsules
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Voice Recording Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 w-full max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 relative z-10"
          >
            <VoiceRecordingDemo />
          </motion.div>
        </div>
      </section>
      
      {/* Example Capsules Section with parallax effect */}
      <div className="relative -mt-20 mb-20">
        <div className="absolute inset-0 bg-pattern-grid opacity-20"></div>
        <ExampleCapsules />
      </div>
      
      {/* Key Features */}
      <Features />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* FAQ */}
      <FAQ />
      
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-floating">
        <Button 
          size="lg"
          onClick={() => setShowCreateFamily(true)}
          className="shadow-lg hover:shadow-xl transition-shadow duration-200 gap-2 bg-ui-orange text-white rounded-full"
        >
          <Users className="h-5 w-5" />
          Create Family
        </Button>
      </div>
      
      {/* Create Family Wizard */}
      {showCreateFamily && <CreateFamilyWizard onOpenChange={setShowCreateFamily} open={showCreateFamily} />}
    </div>
  );
}
