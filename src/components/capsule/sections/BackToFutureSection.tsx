import { Button } from "@/components/ui/button";

export const BackToFutureSection = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Go Back to the Future</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Each capsule represents a unique collection of memories, stories, and moments 
          from your family's journey. Click on any capsule to dive deeper into your family's 
          history.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-vaya-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-semibold text-vaya-capsules">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Create a Capsule</h3>
            <p className="text-gray-600">
              Give your capsule a theme and set a date for when it should be opened. It 
              could be for a special occasion, anniversary, or future milestone.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-vaya-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-semibold text-vaya-capsules">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Add Your Memories</h3>
            <p className="text-gray-600">
              Share stories through voice messages, photos, or written notes. Each 
              contribution is kept secret until the reveal date.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-vaya-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-semibold text-vaya-capsules">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Invite Family & Friends</h3>
            <p className="text-gray-600">
              Let others contribute their memories. Everyone's additions remain a 
              surprise until the capsule is opened together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};