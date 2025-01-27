import React from "react";
import { CapsuleCard } from "./CapsuleCard";
import { CapsuleHeader } from "./CapsuleHeader";
import { LucideIcon } from "lucide-react";

interface MobileCapsuleListProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
  }[];
}

export const MobileCapsuleList = ({ capsules }: MobileCapsuleListProps) => {
  return (
    <div className="min-h-screen py-8 px-4">
      <CapsuleHeader />
      <div className="grid grid-cols-1 gap-4 mt-8">
        {capsules.map((capsule) => (
          <CapsuleCard key={capsule.title} {...capsule} />
        ))}
      </div>
    </div>
  );
};