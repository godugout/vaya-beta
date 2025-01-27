import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CapsuleCard } from "./CapsuleCard";
import { CapsuleHeader } from "./CapsuleHeader";
import { LucideIcon, ArrowLeft, ArrowRight } from "lucide-react";
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
    offset: ["start start", "0.3 start"], // Shorter scroll range
  });

  const springConfig = { stiffness: 400, damping: 40, bounce: 0 }; // Faster animations

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0, 300]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0, -300]),
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
    useTransform(scrollYProgress, [0, 0.3], [-500, 0]),
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
      className="h-[60vh] py-10 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <CapsuleHeader />
      
      <motion.div
        style={{ opacity: navOpacity }}
        className="fixed top-20 left-0 right-0 z-10 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-vaya-gray-900 font-outfit mb-4">
            Explore Family Capsules
          </h2>
          <p className="text-lg text-vaya-gray-600 max-w-2xl">
            Each capsule represents a unique collection of memories, stories, and moments from your family's journey. Click on any capsule to dive deeper into your family's history.
          </p>
        </div>
      </motion.div>

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative"
      >
        {/* Navigation Controls */}
        <motion.div 
          style={{ opacity: navOpacity }}
          className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg"
        >
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('first', 'left')}
              disabled={rowIndices.first === 0}
              className="bg-white/90"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('first', 'right')}
              disabled={rowIndices.first === firstRow.length - 1}
              className="bg-white/90"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('second', 'left')}
              disabled={rowIndices.second === 0}
              className="bg-white/90"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('second', 'right')}
              disabled={rowIndices.second === secondRow.length - 1}
              className="bg-white/90"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('third', 'left')}
              disabled={rowIndices.third === 0}
              className="bg-white/90"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('third', 'right')}
              disabled={rowIndices.third === thirdRow.length - 1}
              className="bg-white/90"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* First Row */}
        <div className="relative mb-12">
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
        </div>

        {/* Second Row */}
        <div className="relative mb-12">
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
        </div>
      </motion.div>
    </div>
  );
};