
import { useNavigate } from "react-router-dom";
import { CapsuleScrollSection } from "@/components/capsule/sections/CapsuleScrollSection";
import { CapsulePills } from "@/components/capsule/sections/CapsulePills";
import { detailedCapsules, simpleCapsules } from "@/components/capsule/ExampleCapsules";
import { Button } from "@/components/ui/button";
import { Hourglass, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateCapsuleForm from "@/components/capsule/CreateCapsuleForm";

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
    <div className="relative min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Family Time Capsules
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Create and curate meaningful collections of memories
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="capsules" size="sm" className="mt-4 md:mt-0 flex items-center gap-2">
                <Hourglass className="h-4 w-4" />
                <span>Create New Capsule</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <CreateCapsuleForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <CapsulePills />
      <CapsuleScrollSection capsules={allExampleCapsules} />
    </div>
  );
};

export default FamilyCapsules;
