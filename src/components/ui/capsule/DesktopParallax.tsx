import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CapsuleCard } from "./CapsuleCard";
import { CapsuleHeader } from "./CapsuleHeader";
import { LucideIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../button";

interface DesktopParallaxProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
  }[];
}

export const DesktopParallax = ({ capsules }: DesktopParallaxProps) => {
  const firstRow = capsules.slice(0, 5);
  const secondRow = capsules.slice(5, 10);
  const thirdRow = capsules.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-300, 0]),
    springConfig
  );

  const [rowIndices, setRowIndices] = React.useState({
    first: 0,
    second: 0,
    third: 0
  });

  const handleScroll = (row: 'first' | 'second' | 'third', direction: 'left' | 'right') => {
    setRowIndices(prev => {
      const maxIndex = row === 'first' ? firstRow.length - 1 : 
                      row === 'second' ? secondRow.length - 1 : 
                      thirdRow.length - 1;
      
      const currentIndex = prev[row];
      const newIndex = direction === 'left' ? 
        Math.max(0, currentIndex - 1) : 
        Math.min(maxIndex, currentIndex + 1);
      
      return { ...prev, [row]: newIndex };
    });
  };

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="flex flex-col gap-16 sticky top-0 pt-32"
      >
        {/* First Row */}
        <div className="relative">
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
            {firstRow.map((capsule, index) => (
              <motion.div
                style={{ x: translateX }}
                whileHover={{ y: -20 }}
                key={capsule.title}
                className={index < rowIndices.first ? 'opacity-0' : 'opacity-100'}
              >
                <CapsuleCard {...capsule} isDesktop />
              </motion.div>
            ))}
          </motion.div>
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('first', 'left')}
              disabled={rowIndices.first === 0}
              className="bg-white/90 backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('first', 'right')}
              disabled={rowIndices.first === firstRow.length - 1}
              className="bg-white/90 backdrop-blur-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Second Row */}
        <div className="relative">
          <motion.div className="flex flex-row space-x-20">
            {secondRow.map((capsule, index) => (
              <motion.div
                style={{ x: translateXReverse }}
                whileHover={{ y: -20 }}
                key={capsule.title}
                className={index < rowIndices.second ? 'opacity-0' : 'opacity-100'}
              >
                <CapsuleCard {...capsule} isDesktop />
              </motion.div>
            ))}
          </motion.div>
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('second', 'left')}
              disabled={rowIndices.second === 0}
              className="bg-white/90 backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('second', 'right')}
              disabled={rowIndices.second === secondRow.length - 1}
              className="bg-white/90 backdrop-blur-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Third Row */}
        <div className="relative">
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
            {thirdRow.map((capsule, index) => (
              <motion.div
                style={{ x: translateX }}
                whileHover={{ y: -20 }}
                key={capsule.title}
                className={index < rowIndices.third ? 'opacity-0' : 'opacity-100'}
              >
                <CapsuleCard {...capsule} isDesktop />
              </motion.div>
            ))}
          </motion.div>
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('third', 'left')}
              disabled={rowIndices.third === 0}
              className="bg-white/90 backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('third', 'right')}
              disabled={rowIndices.third === thirdRow.length - 1}
              className="bg-white/90 backdrop-blur-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};