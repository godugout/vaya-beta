
import { Package } from "lucide-react";
import { AnimatedContainer } from "@/components/animation/AnimatedContainer";
import { MemoryCapsuleCreator } from "@/components/capsule/MemoryCapsuleCreator";
import { MemoryCapsuleTimeline } from "@/components/capsule/MemoryCapsuleTimeline";

export const MemoryCapsuleSection = () => {
  return (
    <AnimatedContainer variant="fade" className="relative">
      <div className="flex items-center mb-8">
        <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
          <Package className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Memory Capsule Components</h2>
          <p className="text-gray-400">Time capsule components for preserving and sharing memories</p>
        </div>
      </div>

      <div className="space-y-12">
        <div className="space-y-4">
          <div className="flex items-center">
            <h3 className="text-2xl font-semibold text-purple-300">Memory Capsule Creator</h3>
            <div className="h-px flex-grow bg-gradient-to-r from-purple-500/50 to-transparent ml-4"></div>
          </div>
          <p className="text-gray-400 mb-6">
            Interface for creating and configuring memory time capsules.
          </p>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 backdrop-blur-sm shadow-xl">
            <MemoryCapsuleCreator onComplete={(data) => console.log(data)} />
          </div>
        </div>

        <div className="space-y-4 mt-16">
          <div className="flex items-center">
            <h3 className="text-2xl font-semibold text-purple-300">Memory Capsule Timeline</h3>
            <div className="h-px flex-grow bg-gradient-to-r from-purple-500/50 to-transparent ml-4"></div>
          </div>
          <p className="text-gray-400 mb-6">
            Timeline view of memory capsules organized by reveal date.
          </p>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 backdrop-blur-sm shadow-xl">
            <MemoryCapsuleTimeline 
              onViewCapsule={(id) => console.log(`View capsule ${id}`)}
              onCreateCapsule={() => console.log("Create new capsule")}
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};
