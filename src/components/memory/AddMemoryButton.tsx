import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Plus } from "lucide-react";
import AddMemoryModal from "./AddMemoryModal";

interface AddMemoryButtonProps {
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
}

const AddMemoryButton = ({ variant = "default", size = "default", className }: AddMemoryButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        variant={variant} 
        size={size} 
        id="add-memory-modal-trigger"
        className={`bg-vaya-primary hover:bg-vaya-primary/90 text-white ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        <span>Share Memory</span>
        <Mic className="ml-2 h-4 w-4" />
      </Button>

      <AddMemoryModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};

export default AddMemoryButton;