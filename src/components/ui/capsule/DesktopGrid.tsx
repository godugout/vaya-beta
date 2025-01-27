import React from "react";
import { CapsuleCard } from "./CapsuleCard";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface DesktopGridProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
    colorKey: string;
  }[];
}

export const DesktopGrid = ({ capsules }: DesktopGridProps) => {
  // Split capsules into 5 rows maximum
  const itemsPerRow = Math.ceil(capsules.length / 5);
  const rows = Array.from({ length: Math.min(5, Math.ceil(capsules.length / itemsPerRow)) }, (_, i) =>
    capsules.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  );

  return (
    <div className="w-full max-w-[90vw] 2xl:max-w-7xl mx-auto space-y-16 px-4 py-8">
      {rows.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          initial="hidden"
          animate="visible"
          className={`flex ${
            rowIndex % 2 === 0 ? "flex-row" : "flex-row-reverse"
          } justify-center items-center space-x-8 md:space-x-12`}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          {row.map((capsule, index) => (
            <motion.div
              key={capsule.title}
              className="flex-shrink-0"
              custom={{ index, isEven: rowIndex % 2 === 0 }}
              variants={{
                hidden: ({ isEven }) => ({
                  x: isEven ? -100 : 100,
                  y: 20,
                  rotateY: isEven ? -15 : 15,
                  opacity: 0,
                }),
                visible: ({ index }) => ({
                  x: 0,
                  y: 0,
                  rotateY: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                }),
              }}
              whileHover={{
                scale: 1.05,
                rotateY: rowIndex % 2 === 0 ? 5 : -5,
                transition: { duration: 0.2 },
              }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.2,
                },
              }}
            >
              <CapsuleCard {...capsule} isDesktop />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};