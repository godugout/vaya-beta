
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
      <div className="container mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-heading font-medium mb-8 text-center">Family Capsules</h1>
        <ExampleCapsules />
      </div>
      
      <CapsulePills />
      <CapsuleScrollSection capsules={allExampleCapsules} />
    </div>
  );
};

export default FamilyCapsules;
