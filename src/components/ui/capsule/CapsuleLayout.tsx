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
    <div className="min-h-screen w-full bg-[#222222]">
      <div className="absolute top-0 left-0 w-full">
        {isMobile ? (
          <MobileCapsuleList capsules={capsules} />
        ) : (
          <DesktopParallax capsules={capsules} />
        )}
      </div>
    </div>
  );
};