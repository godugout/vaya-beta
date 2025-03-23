
import { FamilySetupWizard } from "@/components/setup/FamilySetupWizard";

export default function CreateFamily() {
  return (
    <div className="relative min-h-screen">
      {/* Background image - fixed and faded with overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/lovable-uploads/20d8e559-f25c-417f-83be-9e9a6ce2e2c4.png" 
          alt="Family background" 
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="container max-w-4xl mx-auto py-12 px-4 relative z-10">
        <div className="backdrop-blur-md bg-black/20 border border-white/10 rounded-xl p-8 shadow-xl overflow-hidden">
          {/* Decorative elements and patterns */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-blue-900/20 to-orange-800/20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-500/10 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-teal-500/10 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg stroke=\"%2338B2AC\" stroke-width=\"1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"20\"%3E%3C/circle%3E%3Cpath d=\"M30 10 L30 50 M10 30 L50 30\"%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] pointer-events-none"></div>
          
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
