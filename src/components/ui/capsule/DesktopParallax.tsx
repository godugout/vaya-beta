import React from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
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
    useTransform(scrollYProgress, [0, 0.2], [-300, 400]),
    springConfig
  );

  const navOpacity = useSpring(
    useTransform(scrollYProgress, [0.1, 0.2], [0, 1]),
    springConfig
  );

  const scrollToGrid = () => {
    const element = document.getElementById('capsule-grid');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={ref}
      className="h-[150vh] py-10 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <CapsuleHeader />
      
      <motion.div
        style={{ opacity: navOpacity }}
        className="fixed top-96 left-0 right-0 z-10 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-vaya-gray-900 font-outfit mb-6">
            Create Your Family Capsules
          </h2>
          <p className="text-xl text-vaya-gray-600 max-w-2xl leading-relaxed">
            Each capsule is a unique collection of memories, stories, and moments from your family's journey. 
            Choose a capsule type below to start preserving your precious memories for generations to come.
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
        id="capsule-grid"
        className="mb-10 mt-96"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-16 mb-12">
          {firstRow.map((capsule) => (
            <motion.div
              style={{ x: translateX }}
              whileHover={{ y: -20 }}
              key={capsule.title}
            >
              <CapsuleCard {...capsule} isDesktop />
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-12 space-x-16">
          {secondRow.map((capsule) => (
            <motion.div
              style={{ x: translateXReverse }}
              whileHover={{ y: -20 }}
              key={capsule.title}
            >
              <CapsuleCard {...capsule} isDesktop />
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-16">
          {thirdRow.map((capsule) => (
            <motion.div
              style={{ x: translateX }}
              whileHover={{ y: -20 }}
              key={capsule.title}
            >
              <CapsuleCard {...capsule} isDesktop />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: navOpacity }}
        className="fixed bottom-24 left-0 right-0 z-10 flex justify-center gap-4"
      >
        <Button
          variant="outline"
          size="lg"
          className="bg-white/90 backdrop-blur-sm"
          onClick={() => scrollToGrid()}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="bg-white/90 backdrop-blur-sm"
          onClick={() => scrollToGrid()}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
};