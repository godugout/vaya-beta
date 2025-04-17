
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddMemoryModal from "./AddMemoryModal";
import { motion } from "framer-motion";

interface AddMemoryButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg";
  capsuleId?: string;
  variant?: "primary" | "secondary";
}

const AddMemoryButton = ({ 
  className, 
  size = "default", 
  capsuleId,
  variant = "primary"
}: AddMemoryButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          size={size}
          className={`${variant === 'primary' ? 'bg-autumn hover:bg-autumn/90' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} shadow-lg hover:shadow-xl transition-all ${className}`}
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Memory
        </Button>
      </motion.div>
      
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
