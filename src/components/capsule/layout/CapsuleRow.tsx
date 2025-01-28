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

  return (
    <motion.div
      className="flex py-4"
      initial={{ x: isEven ? "0%" : "-100%" }}
      animate={{ 
        x: isEven ? "-100%" : "0%",
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transform: `translateX(${isEven ? '-25%' : '25%'})`,
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