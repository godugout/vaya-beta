import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CapsuleCardProps {
  title: string;
  link: string;
  icon: LucideIcon;
  colorKey: string;
  isDesktop?: boolean;
}

const brandColors = {
  "Primary Orange": "#F97316",
  "Ocean Blue": "#0EA5E9",
  "Nature Green": "#84CC16"
};

export const CapsuleCard = ({ title, link, icon: Icon, colorKey, isDesktop = false }: CapsuleCardProps) => {
  const color = brandColors[colorKey as keyof typeof brandColors];
  
  if (isDesktop) {
    return (
      <div className="group relative w-[320px] h-[100px]">
        <Link to={link} className="block h-full">
          <div 
            className="absolute inset-0 flex items-center justify-between px-6 bg-white rounded-full border-2 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            style={{ 
              borderColor: `${color}30`,
              background: 'white',
              transform: 'perspective(1000px)',
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="p-3 rounded-full transition-all duration-300"
                style={{ backgroundColor: `${color}20` }}
              >
                <Icon className="w-8 h-8" style={{ color: color }} />
              </div>
              <h2 className="font-outfit text-xl font-semibold text-vaya-gray-900 truncate max-w-[180px]">
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
      className="block bg-white rounded-full p-4 transition-all duration-300 shadow-md hover:shadow-lg"
      style={{ 
        borderWidth: 2,
        borderColor: `${color}30`,
        background: 'white',
      }}
    >
      <div className="flex items-center gap-4">
        <div 
          className="p-3 rounded-full transition-all duration-300"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-8 h-8" style={{ color: color }} />
        </div>
        <h3 className="text-xl font-semibold text-vaya-gray-900 font-outfit truncate max-w-[180px]">
          {title}
        </h3>
      </div>
    </Link>
  );
};