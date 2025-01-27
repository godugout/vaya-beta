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
      <div className="group/product h-96 w-[30rem] relative flex-shrink-0">
        <Link to={link} className="block group-hover/product:shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-lg border border-vaya-gray-200">
            <Icon size={120} className="text-vaya-primary" />
          </div>
        </Link>
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-vaya-gray-900 pointer-events-none rounded-lg transition-opacity duration-300"></div>
        <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-outfit text-xl transition-opacity duration-300">
          {title}
        </h2>
      </div>
    );
  }

  return (
    <Link
      to={link}
      className="block bg-white/90 rounded-lg p-6 transition-all duration-300 hover:bg-vaya-gray-100 border border-vaya-gray-200"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-vaya-accent-orange rounded-lg">
          <Icon size={24} className="text-vaya-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-vaya-gray-900 font-outfit">{title}</h3>
        </div>
      </div>
    </Link>
  );
};