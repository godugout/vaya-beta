
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ImmersiveRecordingButtonProps {
  onClick: () => void;
  className?: string;
}

const ImmersiveRecordingButton = ({ 
  onClick, 
  className = "" 
}: ImmersiveRecordingButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative">
      {/* Pulsing background for emphasis */}
      {isHovered && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-blue-500 rounded-full"
        />
      )}
      
      <Button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        size="lg"
        className={`relative z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-600 text-white rounded-full px-6 py-3 shadow-lg transition-all duration-300 ${className}`}
      >
        <Mic className="mr-2 h-5 w-5" />
        <span>Immersive Recording</span>
      </Button>
    </div>
  );
};

export default ImmersiveRecordingButton;
