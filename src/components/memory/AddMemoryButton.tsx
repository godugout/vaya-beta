
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddMemoryButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg";
}

const AddMemoryButton = ({ className, size = "default" }: AddMemoryButtonProps) => {
  return (
    <Button
      size={size}
      className={`bg-autumn hover:bg-autumn/90 text-white shadow-lg hover:shadow-xl transition-all ${className}`}
    >
      <Plus className="h-5 w-5 mr-2" />
      Add Memory
    </Button>
  );
};

export default AddMemoryButton;
