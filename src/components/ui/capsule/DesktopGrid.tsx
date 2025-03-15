
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";

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
  const itemsPerRow = Math.ceil(capsules.length / 3);
  const rows = Array.from({ length: 3 }, (_, i) =>
    capsules.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  );

  return (
    <div 
      className="w-screen relative overflow-hidden -mx-[50vw] left-[50%] right-[50%] bg-white dark:bg-black py-24"
      style={{
        transform: "perspective(1000px) rotateX(2deg)",
      }}
    >
      {rows.map((row, rowIndex) => {
        const isEven = rowIndex % 2 === 0;
        const duration = 30 + rowIndex * 5;

        return (
          <motion.div
            key={rowIndex}
            className="flex py-8"
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
              {[...row, ...row, ...row].map((capsule, index) => (
                <motion.div
                  key={`${capsule.title}-${index}`}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className="relative group border border-black dark:border-white rounded-none p-8 min-w-[400px] bg-white dark:bg-black"
                >
                  <div className="absolute inset-0 bg-black/5 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="p-3 border border-black dark:border-white bg-white dark:bg-black">
                      <capsule.icon className="w-6 h-6 text-black dark:text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-2 tracking-tight">{capsule.title}</h3>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center justify-between">
                          <span>{capsule.metadata?.itemCount} items</span>
                          <span className="px-2 py-1 text-xs font-medium border border-black dark:border-white">
                            {capsule.metadata?.status}
                          </span>
                        </div>
                        <div className="text-xs">
                          {capsule.metadata?.status === "upcoming" && (
                            <span>Opens {formatDistanceToNow(new Date(capsule.metadata.date))} from now</span>
                          )}
                          {capsule.metadata?.status === "active" && (
                            <span>Closes {format(new Date(capsule.metadata.date), 'MMM d, yyyy')}</span>
                          )}
                          {capsule.metadata?.status === "locked" && (
                            <span>Reveals {formatDistanceToNow(new Date(capsule.metadata.date))} from now</span>
                          )}
                          {capsule.metadata?.status === "revealed" && (
                            <span>Revealed on {format(new Date(capsule.metadata.date), 'MMM d, yyyy')}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
