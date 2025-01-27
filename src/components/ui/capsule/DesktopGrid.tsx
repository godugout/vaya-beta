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
    <div className="w-full overflow-hidden py-8">
      {rows.map((row, rowIndex) => {
        const isEven = rowIndex % 2 === 0;
        const duration = 20 + rowIndex * 5; // Varying speeds for each row

        return (
          <motion.div
            key={rowIndex}
            className="flex py-4 mb-4"
            initial={{ x: isEven ? "0%" : "-100%" }}
            animate={{ 
              x: isEven ? "-100%" : "0%",
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Double the row to create seamless loop */}
            <div className="flex gap-8 animate-none">
              {[...row, ...row].map((capsule, index) => (
                <motion.div
                  key={`${capsule.title}-${index}`}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <CapsuleCard {...capsule} isDesktop />
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};