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
      <div className="group relative w-[360px] h-[120px]">
        <Link to={link} className="block h-full">
          <div className="absolute inset-0 flex items-center justify-between px-8 bg-white rounded-full border-2 border-vaya-gray-200 shadow-lg overflow-hidden hover:bg-vaya-accent-orange/20 transition-colors duration-300">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-vaya-accent-orange/20 rounded-full">
                <Icon className="w-10 h-10 text-vaya-primary" />
              </div>
              <h2 className="font-outfit text-2xl font-semibold text-vaya-gray-900 truncate max-w-[200px]">
                {title}
              </h2>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <Link
      to={link}
      className="block bg-white rounded-full p-6 transition-all duration-300 hover:bg-vaya-accent-orange/20 border-2 border-vaya-gray-200 shadow-md"
    >
      <div className="flex items-center gap-6">
        <div className="p-4 bg-vaya-accent-orange/20 rounded-full">
          <Icon className="w-10 h-10 text-vaya-primary" />
        </div>
        <h3 className="text-2xl font-semibold text-vaya-gray-900 font-outfit truncate">
          {title}
        </h3>
      </div>
    </Link>
  );
};