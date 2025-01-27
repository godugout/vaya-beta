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

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 600]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -600]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(scrollYProgress, [0, 1], [15, 0]),
    springConfig
  );
  const perspective = useSpring(
    useTransform(scrollYProgress, [0, 1], [1000, 2000]),
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
      className="w-full max-w-[90vw] 2xl:max-w-7xl mx-auto space-y-24 px-4"
      style={{
        perspective: perspective,
        transformStyle: "preserve-3d",
      }}
    >
      {rows.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          className={`flex ${rowIndex % 2 === 0 ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-8 md:space-x-12`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {row.map((capsule, index) => (
            <motion.div
              key={capsule.title}
              style={{
                x: rowIndex % 2 === 0 ? translateX : translateXReverse,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
              }}
              className="flex-shrink-0"
            >
              <CapsuleCard {...capsule} isDesktop />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};