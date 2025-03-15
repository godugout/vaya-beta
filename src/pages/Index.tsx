
import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Heart, Camera, Music, Star, Book, ArrowRight } from "lucide-react";
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
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-[#F8F5FF] to-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-[15%] w-20 h-20 bg-vaya-accent-yellow rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-40 right-[10%] w-32 h-32 bg-vaya-accent-turquoise rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-vaya-accent-coral rounded-full blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center h-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-vaya-text-primary mb-6 leading-tight">
              Preserve Your Family's Voice<br />
              <span className="text-vaya-home">Share Your Story</span>
            </h1>
            
            <p className="text-vaya-text-secondary text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Vaya helps you capture, organize, and share meaningful family memories that persist for generations through voice-first storytelling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-vaya-stories hover:bg-vaya-stories/90 text-white group"
                onClick={() => window.location.href = "/share-stories"}
              >
                <Mic className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Start Recording
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-vaya-home text-vaya-home hover:bg-vaya-home/10"
                onClick={() => setShowCreateFamily(true)}
              >
                <Heart className="mr-2 h-5 w-5" />
                Create Family
              </Button>
            </div>
          </motion.div>
          
          {/* Voice Recording Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 w-full max-w-xl mx-auto"
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
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          size="lg"
          onClick={() => setShowCreateFamily(true)}
          className="shadow-lg hover:shadow-xl transition-shadow duration-200 gap-2 bg-vaya-home text-white"
        >
          <Heart className="h-5 w-5" />
          Create Family
        </Button>
      </div>
      
      {/* Create Family Wizard */}
      {showCreateFamily && <CreateFamilyWizard onOpenChange={setShowCreateFamily} open={showCreateFamily} />}
    </div>
  );
}
