
import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Archive, Camera, Music, Users, Book, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateFamilyWizard } from "@/components/family/CreateFamilyWizard";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { VoiceRecordingDemo } from "@/components/home/VoiceRecordingDemo";

export default function Index() {
  const [showCreateFamily, setShowCreateFamily] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Global background pattern */}
      <div className="page-bg-pattern"></div>
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Nature background - blurred */}
        <div className="absolute inset-0 nature-bg-blur nature-stream-bg">
          <div className="absolute inset-0 bg-white/50 dark:bg-dark-background/50 z-patterns"></div>
        </div>
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-50 z-patterns"></div>
        
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center h-full relative z-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto backdrop-card p-8 dark:bg-dark-background/30"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-greystone-green dark:text-white mb-6 leading-tight z-text">
              Preserve Your Family's Voice<br />
              <span className="text-greystone-green-80 dark:text-dark-text-secondary">Share Your Story</span>
            </h1>
            
            <p className="text-greystone-green-50 dark:text-dark-text-secondary text-lg md:text-xl mb-10 max-w-2xl mx-auto z-text">
              Vaya helps you capture, organize, and share meaningful family memories that persist for generations through voice-first storytelling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center z-content">
              <Button 
                size="lg" 
                className="bg-lovable-magenta hover:bg-lovable-magenta-bright text-white group"
                onClick={() => window.location.href = "/share-stories"}
              >
                <Mic className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Start Recording
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-greystone-green text-greystone-green hover:bg-greystone-green-10 dark:border-white dark:text-white"
                onClick={() => setShowCreateFamily(true)}
              >
                <Archive className="mr-2 h-5 w-5" />
                Create Family
              </Button>
            </div>
          </motion.div>
          
          {/* Voice Recording Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 w-full max-w-xl mx-auto elevated-card p-6 z-cards"
          >
            <VoiceRecordingDemo />
          </motion.div>
        </div>
      </section>
      
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
          className="shadow-lg hover:shadow-xl transition-shadow duration-200 gap-2 bg-greystone-green text-white rounded-full"
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
