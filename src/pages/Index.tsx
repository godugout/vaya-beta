
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
import { ExampleCapsules } from "@/components/capsule/ExampleCapsules";

export default function Index() {
  const [showCreateFamily, setShowCreateFamily] = useState(false);

  return (
    <div className="page-container">
      {/* Main Hero Section */}
      <section className="hero-section bg-forest-stream">
        <div className="hero-content staggered-fade-in">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Preserve,
          </motion.h1>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Connect,
          </motion.h1>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Remember.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Vaya helps you capture, organize, and share meaningful family memories that persist for generations.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
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
                className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                <Archive className="mr-2 h-5 w-5" />
                Create Capsules
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Voice Recording Demo */}
      <section className="py-20 px-4 bg-light-gray">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 relative z-10"
        >
          <VoiceRecordingDemo />
        </motion.div>
      </section>
      
      {/* Example Capsules Section */}
      <div className="py-20">
        <ExampleCapsules />
      </div>
      
      {/* Key Features */}
      <div className="bg-light-gray">
        <Features />
      </div>
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* FAQ */}
      <div className="bg-light-gray">
        <FAQ />
      </div>
      
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
};
