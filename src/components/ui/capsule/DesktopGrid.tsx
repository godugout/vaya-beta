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
  // Split capsules into 3 rows and duplicate them for seamless looping
  const itemsPerRow = Math.ceil(capsules.length / 3);
  const rows = Array.from({ length: 3 }, (_, i) =>
    capsules.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  );

  return (
    <div 
      className="w-screen relative overflow-hidden -mx-[50vw] left-[50%] right-[50%]"
      style={{
        transform: "perspective(1000px) rotateX(2deg)",
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
            }}
          >
            <div className="flex gap-8 animate-none">
              {/* Duplicate the row twice for seamless looping */}
              {[...row, ...row, ...row].map((capsule, index) => (
                <motion.div
                  key={`${capsule.title}-${index}`}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
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