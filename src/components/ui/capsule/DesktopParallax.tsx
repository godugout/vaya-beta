import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CapsuleHeader } from "./CapsuleHeader";
import { CapsuleGrid } from "./CapsuleGrid";
import { CapsuleContent } from "./CapsuleContent";
import { CapsuleNavigation } from "./CapsuleNavigation";
import { LucideIcon } from "lucide-react";

interface DesktopParallaxProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
  }[];
}

export const DesktopParallax = ({ capsules }: DesktopParallaxProps) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Card animations with adjusted ranges for better visibility in hero
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [5, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [0.9, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [5, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [-200, 100]),
    springConfig
  );

  // Content animations with adjusted timing for end-of-scroll appearance
  const contentTranslateY = useSpring(
    useTransform(scrollYProgress, [0.7, 0.9], [100, 0]),
    springConfig
  );
  const contentOpacity = useSpring(
    useTransform(scrollYProgress, [0.7, 0.9], [0, 1]),
    springConfig
  );

  const scrollToGrid = () => {
    const element = document.getElementById('capsule-grid');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={ref}
      className="h-[130vh] pt-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <CapsuleHeader />
      
      <CapsuleContent 
        contentOpacity={contentOpacity}
        contentTranslateY={contentTranslateY}
      />

      <CapsuleGrid
        capsules={capsules}
        translateX={translateX}
        translateXReverse={translateXReverse}
        rotateX={rotateX}
        rotateZ={rotateZ}
        translateY={translateY}
        opacity={opacity}
      />

      <CapsuleNavigation 
        contentOpacity={contentOpacity}
        onNavigate={scrollToGrid}
      />
    </div>
  );
};