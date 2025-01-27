import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
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
        className={`bg-vaya-primary hover:bg-vaya-primary/90 text-white ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
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