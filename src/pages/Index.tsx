
import { StorytellingHero } from "@/components/home/StorytellingHero";
import { ValueProposition } from "@/components/home/ValueProposition";
import { VoiceRecordingDemo } from "@/components/home/VoiceRecordingDemo";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CreateFamilyWizard } from "@/components/family/CreateFamilyWizard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function Index() {
  const [showCreateFamily, setShowCreateFamily] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero section without any margins or padding */}
      <div id="hero" className="w-full">
        <StorytellingHero />
      </div>
      
      {/* Value proposition with better background */}
      <div id="features" className="w-full bg-gray-100 dark:bg-gray-800 shadow-inner">
        <ValueProposition />
      </div>
      
      {/* Voice recording section with gradient background */}
      <section className="w-full py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-gray-200 to-white dark:from-gray-800 dark:to-gray-900 shadow-inner">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium mb-10 text-center text-gray-800 dark:text-gray-100">
            Capture Memories with Your Voice
          </h2>
          <div className="w-full max-w-xl mx-auto">
            <VoiceRecordingDemo />
          </div>
        </div>
      </section>
      
      {/* Features section with proper background */}
      <div className="w-full bg-gray-100 dark:bg-gray-800">
        <Features />
      </div>
      
      {/* Testimonials with better contrast */}
      <div className="w-full bg-gray-50 dark:bg-gray-900">
        <Testimonials />
      </div>
      
      {/* FAQ with improved background */}
      <div className="w-full bg-gray-100 dark:bg-gray-800 shadow-inner">
        <FAQ />
      </div>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-28 md:bottom-8 right-8 z-[40]">
        <Button 
          size="lg"
          onClick={() => setShowCreateFamily(true)}
          className="bg-autumn hover:bg-autumn/90 text-white rounded-full shadow-lg"
        >
          <Users className="h-5 w-5 mr-2" />
          Create Family
        </Button>
      </div>
      
      {/* Create Family Wizard */}
      {showCreateFamily && (
        <CreateFamilyWizard 
          onOpenChange={setShowCreateFamily} 
          open={showCreateFamily} 
        />
      )}
    </div>
  );
}
