import React from "react";
import { CapsuleCard } from "./CapsuleCard";
import { LucideIcon } from "lucide-react";

interface DesktopGridProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
  }[];
}

export const DesktopGrid = ({ capsules }: DesktopGridProps) => {
  const rows = [
    capsules.slice(0, 5),
    capsules.slice(5, 10),
    capsules.slice(10, 15)
  ];

  return (
    <div className="w-full max-w-[90vw] 2xl:max-w-7xl mx-auto space-y-12 px-4">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex ${rowIndex % 2 === 0 ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-8 md:space-x-12`}
        >
          {row.map((capsule) => (
            <div key={capsule.title} className="flex-shrink-0">
              <CapsuleCard {...capsule} isDesktop />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};