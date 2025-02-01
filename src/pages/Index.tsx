import { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { CreateFamilyWizard } from "@/components/family/CreateFamilyWizard";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function Index() {
  const [showCreateFamily, setShowCreateFamily] = useState(false);

  return (
    <div className="relative">
      <Hero />
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          size="lg"
          onClick={() => setShowCreateFamily(true)}
          className="shadow-lg hover:shadow-xl transition-shadow duration-200 gap-2"
        >
          <Users className="h-5 w-5" />
          Create Family
        </Button>
      </div>
      <Features />
      <Testimonials />
      <FAQ />
      <CreateFamilyWizard 
        open={showCreateFamily} 
        onOpenChange={setShowCreateFamily}
      />
    </div>
  );
}