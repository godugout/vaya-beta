import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import AddMemoryModal from "./AddMemoryModal";

interface AddMemoryButtonProps {
  className?: string;
}

const AddMemoryButton = ({ className = "" }: AddMemoryButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        id="add-memory-modal-trigger"
        className={`bg-vaya-primary hover:bg-vaya-primary/90 text-white ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        <span>Add Memory</span>
        <Camera className="ml-2 h-4 w-4 memory-icon" />
      </Button>

      <AddMemoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default AddMemoryButton;