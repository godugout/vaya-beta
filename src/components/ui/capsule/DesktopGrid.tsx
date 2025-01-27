import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CapsuleCard } from "./CapsuleCard";
import { LucideIcon } from "lucide-react";

interface DesktopGridProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
  }[];
}

export const DesktopGrid = ({ capsules }: DesktopGridProps) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 500]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -500]),
    springConfig
  );

  const rows = [
    capsules.slice(0, 5),
    capsules.slice(5, 10),
    capsules.slice(10, 15)
  ];

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto px-4 py-12 space-y-12"
    >
      {rows.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          className={`flex ${rowIndex % 2 === 0 ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-8`}
        >
          {row.map((capsule, index) => (
            <motion.div
              key={capsule.title}
              style={{
                x: rowIndex % 2 === 0 ? translateX : translateXReverse,
                transformStyle: "preserve-3d",
                transform: `translateZ(${Math.sin(index * 0.5) * 20}px)`,
              }}
            >
              <CapsuleCard {...capsule} isDesktop />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};