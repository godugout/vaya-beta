import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileCapsuleList } from "./MobileCapsuleList";
import { DesktopGrid } from "./DesktopGrid";
import { LucideIcon } from "lucide-react";
import { CapsuleHeader } from "./CapsuleHeader";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface CapsuleLayoutProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
  }[];
}

export const CapsuleLayout = ({ capsules }: CapsuleLayoutProps) => {
  const isMobile = useIsMobile();
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 200, damping: 40, bounce: 0 };

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [5, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.8, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [2, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-20, 0]),
    springConfig
  );

  return (
    <div 
      ref={ref}
      className="min-h-[200vh] bg-gradient-to-b from-white to-vaya-gray-50 relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="sticky top-0 pt-24 pb-12"
      >
        <CapsuleHeader />
        {isMobile ? (
          <MobileCapsuleList capsules={capsules} />
        ) : (
          <div className="container mx-auto">
            <DesktopGrid capsules={capsules} />
            <div className="max-w-3xl mx-auto text-center mt-16 px-4">
              <h2 className="text-3xl font-bold text-vaya-gray-900 font-outfit mb-4">
                Explore Family Capsules
              </h2>
              <p className="text-lg text-vaya-gray-600">
                Each capsule represents a unique collection of memories, stories, and moments from your family's journey. 
                Click on any capsule to dive deeper into your family's history.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};