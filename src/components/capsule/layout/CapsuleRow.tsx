import { motion } from "framer-motion";
import { CapsulePill } from "./CapsulePill";
import { Capsule } from "@/types/capsule";

interface CapsuleRowProps {
  capsules: Capsule[];
  rowIndex: number;
  duration?: number;
  isDetailed?: boolean;
}

export const CapsuleRow = ({ capsules, rowIndex, duration = 20, isDetailed }: CapsuleRowProps) => {
  const isEven = rowIndex % 2 === 0;
  
  // Calculate vertical offset based on row position
  const verticalOffset = rowIndex % 3 === 0 ? "0px" : 
                        rowIndex % 3 === 1 ? "-60px" : "-120px";

  // Vary animation speed based on row position
  const rowDuration = rowIndex % 3 === 0 ? duration : 
                     rowIndex % 3 === 1 ? duration * 1.5 : 
                     duration * 0.75;

  return (
    <motion.div
      className="flex py-4"
      initial={{ x: isEven ? "0%" : "-100%" }}
      animate={{ 
        x: isEven ? "-100%" : "0%",
      }}
      transition={{
        duration: rowDuration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transform: `translateX(${isEven ? '-25%' : '25%'}) translateY(${verticalOffset})`,
      }}
    >
      <div className="flex gap-10 animate-none">
        {[...capsules, ...capsules, ...capsules].map((capsule, index) => (
          <CapsulePill
            key={`${capsule.title}-${index}`}
            {...capsule}
          />
        ))}
      </div>
    </motion.div>
  );
};