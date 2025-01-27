import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileCapsuleList } from "./MobileCapsuleList";
import { DesktopGrid } from "./DesktopGrid";
import { CapsuleHeader } from "./CapsuleHeader";
import { LucideIcon, PlusCircle, Upload, Share2 } from "lucide-react";

interface CapsuleLayoutProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
    colorKey: string;
  }[];
}

const StepCard = ({ 
  step, 
  title, 
  description, 
  icon: Icon 
}: { 
  step: number; 
  title: string; 
  description: string; 
  icon: LucideIcon;
}) => (
  <div className="flex flex-col items-center text-center space-y-4 p-4">
    <div className="relative">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-vaya-accent-orange rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-vaya-primary" />
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-vaya-primary rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
        {step}
      </div>
    </div>
    <h3 className="text-lg md:text-xl font-bold text-vaya-gray-900 font-outfit">{title}</h3>
    <p className="text-sm md:text-base text-vaya-gray-600 max-w-[280px] md:max-w-sm">{description}</p>
  </div>
);

export const CapsuleLayout = ({ capsules }: CapsuleLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <div className="relative">
        <CapsuleHeader />
        <div className="pt-8 md:pt-16 pb-16 md:pb-24">
          {isMobile ? (
            <MobileCapsuleList capsules={capsules} />
          ) : (
            <div className="container mx-auto px-4">
              <DesktopGrid capsules={capsules} />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-vaya-gray-900 font-outfit mb-3 md:mb-4">
            Go Back to the Future
          </h2>
          <p className="text-base md:text-lg text-vaya-gray-600 mb-12 md:mb-16 max-w-2xl mx-auto">
            Each capsule represents a unique collection of memories, stories, and moments from your family's journey. 
            Click on any capsule to dive deeper into your family's history.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            <StepCard
              step={1}
              icon={PlusCircle}
              title="Create a Capsule"
              description="Give your capsule a theme and set a date for when it should be opened. It could be for a special occasion, anniversary, or future milestone."
            />
            <StepCard
              step={2}
              icon={Upload}
              title="Add Your Memories"
              description="Share stories through voice messages, photos, or written notes. Each contribution is kept secret until the reveal date."
            />
            <StepCard
              step={3}
              icon={Share2}
              title="Invite Family & Friends"
              description="Let others contribute their memories. Everyone's additions remain a surprise until the capsule is opened together."
            />
          </div>
        </div>
      </div>
    </div>
  );
};