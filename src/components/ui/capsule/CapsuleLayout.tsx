import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileCapsuleList } from "./MobileCapsuleList";
import { DesktopParallax } from "./DesktopParallax";
import { LucideIcon } from "lucide-react";

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
    <div className="w-full bg-white">
      {isMobile ? (
        <MobileCapsuleList capsules={capsules} />
      ) : (
        <DesktopParallax capsules={capsules} />
      )}
    </div>
  );
};