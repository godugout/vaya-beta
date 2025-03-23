
import { InitialSetupForm } from "./InitialSetupForm";
import { VayaCard } from "@/components/ui/vaya-card";

export function FamilySetupWizard() {
  return (
    <div className="space-y-8">
      <VayaCard 
        variant="coral" 
        elevation={4} 
        padding="lg" 
        className="backdrop-blur-md bg-gradient-to-br from-hanuman-primary/30 via-amber-800/20 to-green-900/20 border-none shadow-[0_8px_30px_rgba(255,126,0,0.2)] overflow-hidden"
      >
        <div className="relative z-10">
          <InitialSetupForm showCard={false} />
        </div>
        
        {/* Hanuman decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-hanuman-primary/10 blur-2xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-hanuman-accent/10 blur-2xl rounded-full"></div>
      </VayaCard>
    </div>
  );
}
