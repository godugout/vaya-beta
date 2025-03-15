
import { useNavigate } from "react-router-dom";
import { CapsuleScrollSection } from "@/components/capsule/sections/CapsuleScrollSection";
import { CapsulePills } from "@/components/capsule/sections/CapsulePills";
import { detailedCapsules, simpleCapsules, ExampleCapsules } from "@/components/capsule/ExampleCapsules";

const FamilyCapsules = () => {
  const navigate = useNavigate();

  // Transform example capsules into the format expected by the table
  const allExampleCapsules = [...detailedCapsules, ...simpleCapsules].map(capsule => ({
    ...capsule,
    link: `/capsule/${capsule.id}`,
    metadata: capsule.metadata || {
      creatorInitials: "JD",
      itemCount: Math.floor(Math.random() * 20) + 1,
      status: ["upcoming", "active", "locked", "revealed"][Math.floor(Math.random() * 4)] as "upcoming" | "active" | "locked" | "revealed",
      date: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
    }
  }));

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Family Capsules Section with title */}
      <div className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium mb-10 text-center">Family Capsules</h2>
          <ExampleCapsules />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Removed the title section to be consistent with other pages */}
      </div>
      
      <CapsulePills />
      <CapsuleScrollSection capsules={allExampleCapsules} />
    </div>
  );
};

export default FamilyCapsules;
