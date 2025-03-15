
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import { CapsuleScrollSection } from "@/components/capsule/sections/CapsuleScrollSection";
import { ExampleCapsules } from "@/components/capsule/ExampleCapsules";
import { CapsulePills } from "@/components/capsule/sections/CapsulePills";
import { detailedCapsules, simpleCapsules } from "@/components/capsule/ExampleCapsules";

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
    <div className="relative min-h-screen">
      <Hero />
      <ExampleCapsules />
      <CapsulePills />
      <CapsuleScrollSection capsules={allExampleCapsules} />
    </div>
  );
};

export default FamilyCapsules;
