
import { MainNav } from "@/components/MainNav";
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
    <div className="page-container bg-gray-50 dark:bg-gray-900">
      <MainNav />
      
      {/* Hero section */}
      <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <StorytellingHero />
      </div>
      
      {/* Value proposition with better background */}
      <div className="bg-gray-100 dark:bg-gray-800 shadow-inner">
        <ValueProposition />
      </div>
      
      {/* Voice recording section with gradient background */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-200 to-white dark:from-gray-800 dark:to-gray-900 shadow-inner">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium mb-10 text-center text-gray-800 dark:text-gray-100">
            Capture Memories with Your Voice
          </h2>
          <div className="w-full max-w-xl mx-auto bg-white/80 dark:bg-gray-800/50 p-6 rounded-xl shadow-lg">
            <VoiceRecordingDemo />
          </div>
        </div>
      </section>
      
      {/* Features section with proper background */}
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <Features />
      </div>
      
      {/* Testimonials with better contrast */}
      <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Testimonials />
      </div>
      
      {/* FAQ with improved background */}
      <div className="bg-gray-100 dark:bg-gray-800 shadow-inner">
        <FAQ />
      </div>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-[50]">
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
