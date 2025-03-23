
import { FamilySetupWizard } from "@/components/setup/FamilySetupWizard";

export default function CreateFamily() {
  return (
    <div className="relative min-h-screen">
      {/* Background image - fixed and faded with overlay */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full overflow-hidden relative">
          <img 
            src="/lovable-uploads/20d8e559-f25c-417f-83be-9e9a6ce2e2c4.png" 
            alt="Family background" 
            className="w-full h-full object-cover opacity-30 md:object-contain md:object-bottom"
          />
          {/* Multiple gradient overlays to blend the image with the background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
          
          {/* Soft radial gradients to extend the image feel */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/15 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-transparent"></div>
          
          {/* Edge blending elements */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
          <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-indigo-900/30 to-transparent"></div>
          <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-purple-900/30 to-transparent"></div>
          
          {/* Corner blend elements */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-slate-900/40 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-indigo-900/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-900/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-900/30 to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container max-w-4xl mx-auto py-12 px-4 relative z-10">
        <div className="backdrop-blur-sm bg-black/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
          {/* Decorative elements and gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-blue-900/15 to-purple-800/20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-500/5 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-teal-500/5 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <h1 className="text-3xl font-bold text-center mb-4 text-white relative z-10">
            Create Your Family Space
          </h1>
          <p className="text-white/80 text-center mb-8 max-w-xl mx-auto">
            Start building your family's digital sanctuary - a place to preserve memories, share stories, and connect across generations.
          </p>
          
          <FamilySetupWizard />
        </div>
      </div>
    </div>
  );
}
