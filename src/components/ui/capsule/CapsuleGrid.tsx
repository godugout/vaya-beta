import React from "react";
import { motion, MotionValue } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { CapsuleCard } from "./CapsuleCard";

interface CapsuleGridProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
  }[];
  translateX: MotionValue;
  translateXReverse: MotionValue;
  rotateX: MotionValue;
  rotateZ: MotionValue;
  translateY: MotionValue;
  opacity: MotionValue;
}

export const CapsuleGrid = ({
  capsules,
  translateX,
  translateXReverse,
  rotateX,
  rotateZ,
  translateY,
  opacity,
}: CapsuleGridProps) => {
  const firstRow = capsules.slice(0, 5);
  const secondRow = capsules.slice(5, 10);
  const thirdRow = capsules.slice(10, 15);

  return (
    <motion.div
      style={{
        rotateX,
        rotateZ,
        translateY,
        opacity,
      }}
      id="capsule-grid"
      className="mt-0"
    >
      <motion.div className="flex flex-row-reverse space-x-reverse space-x-16 mb-16">
        {firstRow.map((capsule) => (
          <motion.div
            style={{ x: translateX }}
            whileHover={{ y: -20 }}
            key={capsule.title}
          >
            <CapsuleCard {...capsule} isDesktop />
          </motion.div>
        ))}
      </motion.div>
      <motion.div className="flex flex-row mb-16 space-x-16">
        {secondRow.map((capsule) => (
          <motion.div
            style={{ x: translateXReverse }}
            whileHover={{ y: -20 }}
            key={capsule.title}
          >
            <CapsuleCard {...capsule} isDesktop />
          </motion.div>
        ))}
      </motion.div>
      <motion.div className="flex flex-row-reverse space-x-reverse space-x-16">
        {thirdRow.map((capsule) => (
          <motion.div
            style={{ x: translateX }}
            whileHover={{ y: -20 }}
            key={capsule.title}
          >
            <CapsuleCard {...capsule} isDesktop />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};