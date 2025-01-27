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
  <div className="flex flex-col items-center text-center space-y-4">
    <div className="relative">
      <div className="w-20 h-20 bg-vaya-accent-orange rounded-full flex items-center justify-center">
        <Icon className="w-10 h-10 text-vaya-primary" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-vaya-primary rounded-full flex items-center justify-center text-white font-bold">
        {step}
      </div>
    </div>
    <h3 className="text-xl font-bold text-vaya-gray-900 font-outfit">{title}</h3>
    <p className="text-vaya-gray-600 max-w-sm">{description}</p>
  </div>
);

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
          <p className="text-lg text-vaya-gray-600 mb-16">
            Each capsule represents a unique collection of memories, stories, and moments from your family's journey. 
            Click on any capsule to dive deeper into your family's history.
          </p>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <StepCard
              step={1}
              icon={PlusCircle}
              title="Create a Capsule"
              description="Give your capsule a theme and set a date for when it should be opened. It could be for a special occasion, anniversary, or any future milestone."
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