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
    metadata?: {
      creatorAvatar?: string;
      creatorInitials: string;
      itemCount: number;
      status: "upcoming" | "active" | "locked" | "revealed";
      date: string;
    };
  }[];
}

export const DesktopGrid = ({ capsules }: DesktopGridProps) => {
  // Split capsules into 3 rows
  const itemsPerRow = Math.ceil(capsules.length / 3);
  const rows = Array.from({ length: 3 }, (_, i) =>
    capsules.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  );

  return (
    <div 
      className="w-screen overflow-hidden"
      style={{
        transform: "perspective(1000px) rotateX(2deg)",
        marginLeft: "-2rem",
        marginRight: "-2rem",
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      {rows.map((row, rowIndex) => {
        const isEven = rowIndex % 2 === 0;
        const duration = 30 + rowIndex * 5; // Varying speeds for each row

        return (
          <motion.div
            key={rowIndex}
            className="flex py-6"
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
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <div className="flex gap-8 animate-none">
              {[...row, ...row].map((capsule, index) => (
                <motion.div
                  key={`${capsule.title}-${index}`}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <CapsuleCard {...capsule} isDesktop metadata={capsule.metadata} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};