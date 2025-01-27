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

  const springConfig = { stiffness: 60, damping: 15, mass: 0.5 };

  // First phase of animation (0-40% scroll)
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [0, 150]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [0, -150]),
    springConfig
  );

  // Extended animations for full visibility (40-100% scroll)
  const finalTranslateY = useSpring(
    useTransform(scrollYProgress, 
      [0.4, 0.6, 0.8, 1], 
      [-200, 0, 200, 400]  // Increased final value to move cards down further
    ),
    springConfig
  );

  const rowSpacing = useSpring(
    useTransform(scrollYProgress,
      [0.4, 0.6, 0.8, 1],
      [20, 40, 80, 120]  // Increased spacing between rows at the end
    ),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, 
      [0, 0.4, 0.6], 
      [15, 0, 0]
    ),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, 
      [0, 0.4, 0.6, 1], 
      [0.3, 1, 1, 1]
    ),
    springConfig
  );

  const rotateZ = useSpring(
    useTransform(scrollYProgress, 
      [0, 0.4, 0.6], 
      [10, 0, 0]
    ),
    springConfig
  );

  const scale = useSpring(
    useTransform(scrollYProgress,
      [0.4, 0.6, 0.8, 1],
      [1, 0.95, 0.9, 0.85]  // Slightly reduced final scale
    ),
    springConfig
  );

  const spacing = useSpring(
    useTransform(scrollYProgress,
      [0.4, 0.6, 0.8, 1],
      [20, 30, 40, 60]  // Increased final spacing
    ),
    springConfig
  );

  const navOpacity = useSpring(
    useTransform(scrollYProgress, [0.2, 0.3], [0, 1]),
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
      className="h-[180vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <div>
        <CapsuleHeader />
      </div>
      
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY: finalTranslateY,
          opacity,
          scale,
        }}
        className="relative -mt-16 mb-20"
      >
        <motion.div 
          style={{ gap: rowSpacing }}
          className="flex flex-col"
        >
          <CapsuleRow 
            capsules={firstRow} 
            translateX={translateX} 
            startIndex={rowIndices.first}
            scale={scale}
          />
          <CapsuleRow 
            capsules={secondRow} 
            translateX={translateXReverse} 
            reverse 
            startIndex={rowIndices.second}
            scale={scale}
          />
          <CapsuleRow 
            capsules={thirdRow} 
            translateX={translateX} 
            startIndex={rowIndices.third}
            scale={scale}
          />
        </motion.div>
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
      
      <ParallaxHeader opacity={navOpacity} />
    </div>
  );
};