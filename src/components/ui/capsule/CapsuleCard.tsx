import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CapsuleCardProps {
  title: string;
  link: string;
  icon: LucideIcon;
  isDesktop?: boolean;
}

export const CapsuleCard = ({ title, link, icon: Icon, isDesktop = false }: CapsuleCardProps) => {
  if (isDesktop) {
    return (
      <div className="group/product relative flex-shrink-0 w-[min(30rem,calc(33vw-2rem))] aspect-[4/3]">
        <Link to={link} className="block group-hover/product:shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg border-2 border-vaya-gray-200 shadow-lg">
            <Icon className="w-[min(120px,15vw)] h-[min(120px,15vw)] text-vaya-primary" />
          </div>
        </Link>
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-90 bg-vaya-primary pointer-events-none rounded-lg transition-opacity duration-300"></div>
        <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-outfit text-[min(2rem,4vw)] font-semibold transition-opacity duration-300">
          {title}
        </h2>
      </div>
    );
  }

  return (
    <Link
      to={link}
      className="block bg-white rounded-lg p-6 transition-all duration-300 hover:bg-vaya-accent-orange/20 border-2 border-vaya-gray-200 shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="p-4 bg-vaya-accent-orange rounded-lg shadow-sm">
          <Icon size={28} className="text-vaya-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-vaya-gray-900 font-outfit">{title}</h3>
        </div>
      </div>
    </Link>
  );
};