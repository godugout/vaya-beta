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
    <div className="w-full max-w-[90vw] 2xl:max-w-7xl mx-auto space-y-8 px-4 py-8">
      {rows.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          initial="hidden"
          animate="visible"
          className={`flex ${
            rowIndex % 2 === 0 ? "flex-row" : "flex-row-reverse"
          } justify-center items-center gap-8`}
        >
          {row.map((capsule, index) => (
            <motion.div
              key={capsule.title}
              custom={{ index, isEven: rowIndex % 2 === 0 }}
              variants={{
                hidden: ({ isEven }) => ({
                  x: isEven ? -100 : 100,
                  opacity: 0,
                }),
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              animate={{
                y: [0, -8, 0],
                transition: {
                  duration: 4,
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