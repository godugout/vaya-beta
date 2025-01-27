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

// Brand color mapping based on Stories page categories
const brandColors = {
  "Primary Orange": "#F97316",  // Family Traditions
  "Ocean Blue": "#0EA5E9",     // Life Stories
  "Nature Green": "#84CC16"    // Cultural Heritage
};

export const CapsuleCard = ({ title, link, icon: Icon, colorKey, isDesktop = false }: CapsuleCardProps) => {
  const color = brandColors[colorKey as keyof typeof brandColors];
  
  if (isDesktop) {
    return (
      <div className="group relative w-[360px] h-[120px]">
        <Link to={link} className="block h-full">
          <div 
            className="absolute inset-0 flex items-center justify-between px-8 bg-white rounded-full border-2 shadow-lg overflow-hidden transition-all duration-300"
            style={{ 
              borderColor: `${color}30`,
              background: 'white',
            }}
          >
            <div className="flex items-center gap-6">
              <div 
                className="p-4 rounded-full transition-all duration-300"
                style={{ backgroundColor: `${color}20` }}
              >
                <Icon className="w-10 h-10" style={{ color: color }} />
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
      className="block bg-white rounded-full p-6 transition-all duration-300 shadow-md"
      style={{ 
        borderWidth: 2,
        borderColor: `${color}30`,
        background: 'white',
      }}
    >
      <div className="flex items-center gap-6">
        <div 
          className="p-4 rounded-full transition-all duration-300"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-10 h-10" style={{ color: color }} />
        </div>
        <h3 className="text-2xl font-semibold text-vaya-gray-900 font-outfit truncate">
          {title}
        </h3>
      </div>
    </Link>
  );
};