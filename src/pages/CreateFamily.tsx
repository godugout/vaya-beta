
import { FamilySetupWizard } from "@/components/setup/FamilySetupWizard";

export default function CreateFamily() {
  return (
    <div className="relative min-h-screen">
      {/* Background image - fixed and faded with overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/lovable-uploads/20d8e559-f25c-417f-83be-9e9a6ce2e2c4.png" 
          alt="Family background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="container max-w-4xl mx-auto py-12 px-4 relative z-10">
        <div className="backdrop-blur-lg bg-black/30 border border-white/10 rounded-xl p-8 shadow-xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-amber-800/20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-hanuman-primary/5 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <h1 className="text-3xl font-bold text-center mb-4 text-white relative z-10">
            Create Your Family Space
          </h1>
          <p className="text-white/70 text-center mb-8 max-w-xl mx-auto">
            Start building your family's digital sanctuary - a place to preserve memories, share stories, and connect across generations.
          </p>
          
          <FamilySetupWizard />
        </div>
      </div>
    </div>
  );
}
