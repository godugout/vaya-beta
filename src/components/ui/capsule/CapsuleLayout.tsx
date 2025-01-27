import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileCapsuleList } from "./MobileCapsuleList";
import { DesktopGrid } from "./DesktopGrid";
import { LucideIcon } from "lucide-react";
import { CapsuleHeader } from "./CapsuleHeader";
import { motion } from "framer-motion";

interface CapsuleLayoutProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
  }[];
}

export const CapsuleLayout = ({ capsules }: CapsuleLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-vaya-gray-50">
      <CapsuleHeader />
      {isMobile ? (
        <MobileCapsuleList capsules={capsules} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-8"
        >
          <DesktopGrid capsules={capsules} />
          <div className="max-w-3xl mx-auto text-center mt-12 px-4">
            <h2 className="text-3xl font-bold text-vaya-gray-900 font-outfit mb-4">
              Explore Family Capsules
            </h2>
            <p className="text-lg text-vaya-gray-600">
              Each capsule represents a unique collection of memories, stories, and moments from your family's journey. 
              Click on any capsule to dive deeper into your family's history.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};