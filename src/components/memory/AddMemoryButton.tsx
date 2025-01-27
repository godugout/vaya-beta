import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddMemoryModal from "./AddMemoryModal";

interface AddMemoryButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

const AddMemoryButton = ({ className = "", size = "default" }: AddMemoryButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        id="add-memory-modal-trigger"
        className={`bg-vaya-primary hover:bg-vaya-primary/90 text-white ${className}`}
        size={size}
        onClick={() => setIsModalOpen(true)}
      >
        Add Memory
      </Button>

      <AddMemoryModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  );
};

export default AddMemoryButton;