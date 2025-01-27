import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileCapsuleList } from "./MobileCapsuleList";
import { DesktopGrid } from "./DesktopGrid";
import { CapsuleHeader } from "./CapsuleHeader";
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
    <div className="min-h-screen">
      <div className="relative">
        <CapsuleHeader />
        <div className="pt-16 pb-24">
          {isMobile ? (
            <MobileCapsuleList capsules={capsules} />
          ) : (
            <div className="container mx-auto px-4">
              <DesktopGrid capsules={capsules} />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-vaya-gray-900 font-outfit mb-4">
            Go Back to the Future
          </h2>
          <p className="text-lg text-vaya-gray-600">
            Each capsule represents a unique collection of memories, stories, and moments from your family's journey. 
            Click on any capsule to dive deeper into your family's history.
          </p>
        </div>
      </div>
    </div>
  );
};