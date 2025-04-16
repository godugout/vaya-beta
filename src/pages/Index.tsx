
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
    <div className="page-container">
      <MainNav />
      <StorytellingHero />
      <ValueProposition />
      
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium mb-10 text-center">
            Capture Memories with Your Voice
          </h2>
          <div className="w-full max-w-xl mx-auto">
            <VoiceRecordingDemo />
          </div>
        </div>
      </section>
      
      <Features />
      <Testimonials />
      <FAQ />
      
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
