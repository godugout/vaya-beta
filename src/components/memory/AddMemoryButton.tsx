
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddMemoryModal from "./AddMemoryModal";

interface AddMemoryButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg";
  capsuleId?: string; // Add this optional prop to support capsule-specific memories
}

const AddMemoryButton = ({ className, size = "default", capsuleId }: AddMemoryButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <Button
        size={size}
        className={`bg-autumn hover:bg-autumn/90 text-white shadow-lg hover:shadow-xl transition-all ${className}`}
        onClick={() => setShowModal(true)}
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Memory
      </Button>
      
      {showModal && (
        <AddMemoryModal 
          open={showModal} 
          onOpenChange={setShowModal}
          capsuleId={capsuleId}
        />
      )}
    </>
  );
};

export default AddMemoryButton;
