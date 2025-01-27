import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { CapsuleHeader } from "./CapsuleHeader";
import { ParallaxNavigation } from "./ParallaxNavigation";
import { CapsuleRow } from "./CapsuleRow";
import { ParallaxHeader } from "./ParallaxHeader";

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

  // Faster spring config for quicker animations
  const springConfig = { stiffness: 80, damping: 12, mass: 0.4 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0, 150]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0, -150]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [25, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [0.3, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [15, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [-200, 100]),
    springConfig
  );

  const navOpacity = useSpring(
    useTransform(scrollYProgress, [0.1, 0.2], [0, 1]),
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
      className="h-[120vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <CapsuleHeader />
      <ParallaxHeader opacity={navOpacity} />
      
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative mt-10 md:mt-20 mb-20 w-full max-w-[95%] sm:max-w-[85%] lg:max-w-[80%] mx-auto transform scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.9] xl:scale-100"
      >
        <div className="space-y-32 md:space-y-40">
          <CapsuleRow 
            capsules={firstRow} 
            translateX={translateX} 
            startIndex={rowIndices.first}
          />
          <CapsuleRow 
            capsules={secondRow} 
            translateX={translateXReverse} 
            reverse 
            startIndex={rowIndices.second}
          />
          <CapsuleRow 
            capsules={thirdRow} 
            translateX={translateX} 
            startIndex={rowIndices.third}
          />
        </div>
      </motion.div>

      <ParallaxNavigation 
        onScroll={handleScroll}
        rowIndices={rowIndices}
        maxIndices={{
          first: firstRow.length - 1,
          second: secondRow.length - 1,
          third: thirdRow.length - 1
        }}
      />
    </div>
  );
};