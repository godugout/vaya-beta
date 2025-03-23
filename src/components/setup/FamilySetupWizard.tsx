
import { InitialSetupForm } from "./InitialSetupForm";
import { VayaCard } from "@/components/ui/vaya-card";

export function FamilySetupWizard() {
  return (
    <div className="space-y-8">
      <VayaCard 
        variant="purple" 
        elevation={4} 
        padding="lg" 
        className="backdrop-blur-md bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-blue-900/30 border-none shadow-[0_8px_30px_rgba(139,92,246,0.2)] overflow-hidden"
      >
        <div className="relative z-10">
          <InitialSetupForm showCard={false} />
        </div>
        
        {/* Cosmic decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 blur-2xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/10 blur-2xl rounded-full"></div>
      </VayaCard>
    </div>
  );
}
