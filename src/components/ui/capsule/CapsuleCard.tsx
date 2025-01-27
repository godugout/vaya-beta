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
          <div className="absolute inset-0 flex items-center justify-center bg-vaya-purple-light rounded-lg">
            <Icon size={120} className="text-vaya-purple" />
          </div>
        </Link>
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-lg"></div>
        <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-outfit">
          {title}
        </h2>
      </div>
    );
  }

  return (
    <Link
      to={link}
      className="block bg-vaya-purple-light/20 rounded-lg p-6 transition-all duration-300 hover:bg-vaya-purple-light/30"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-vaya-purple-light rounded-lg">
          <Icon size={24} className="text-vaya-purple" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-white font-outfit">{title}</h3>
        </div>
      </div>
    </Link>
  );
};