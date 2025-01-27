import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon, Calendar, ListOrdered, CheckSquare, AlertOctagon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface CapsuleCardProps {
  title: string;
  link: string;
  icon: LucideIcon;
  colorKey: string;
  isDesktop?: boolean;
  metadata?: {
    creatorAvatar?: string;
    creatorInitials: string;
    itemCount: number;
    status: "upcoming" | "active" | "locked" | "revealed";
    date: string;
  };
}

const brandColors = {
  "Primary Orange": "#F97316",
  "Ocean Blue": "#0EA5E9",
  "Nature Green": "#84CC16"
};

const statusConfig = {
  upcoming: { color: "secondary", icon: Calendar },
  active: { color: "default", icon: CheckSquare },
  locked: { color: "destructive", icon: AlertOctagon },
  revealed: { color: "secondary", icon: CheckSquare }
} as const;

export const CapsuleCard = ({ title, link, icon: Icon, colorKey, isDesktop = false, metadata }: CapsuleCardProps) => {
  const color = brandColors[colorKey as keyof typeof brandColors];
  
  if (isDesktop) {
    return (
      <div className="group relative w-[480px] h-[140px]">
        <Link to={link} className="block h-full">
          <div 
            className="absolute inset-0 flex items-center justify-between px-8 bg-white rounded-2xl border-2 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            style={{ 
              borderColor: `${color}30`,
              background: 'white',
              transform: 'perspective(1000px)',
            }}
          >
            <div className="flex items-center gap-6">
              <div 
                className="p-4 rounded-xl transition-all duration-300"
                style={{ backgroundColor: `${color}20` }}
              >
                <Icon className="w-12 h-12" style={{ color: color }} />
              </div>
              <div className="space-y-2">
                <h2 className="font-outfit text-2xl font-semibold text-vaya-gray-900 truncate max-w-[220px]">
                  {title}
                </h2>
                {metadata && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={metadata.creatorAvatar} />
                        <AvatarFallback>{metadata.creatorInitials}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center text-sm text-gray-500">
                        <ListOrdered className="w-4 h-4 mr-1" />
                        {metadata.itemCount}
                      </div>
                    </div>
                    <Badge variant={statusConfig[metadata.status].color as any}>
                      <statusConfig[metadata.status].icon className="w-3 h-3 mr-1" />
                      {metadata.date}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <Link
      to={link}
      className="block bg-white rounded-2xl p-6 transition-all duration-300 shadow-md hover:shadow-lg"
      style={{ 
        borderWidth: 2,
        borderColor: `${color}30`,
        background: 'white',
      }}
    >
      <div className="flex items-center gap-6">
        <div 
          className="p-4 rounded-xl transition-all duration-300"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-10 h-10" style={{ color: color }} />
        </div>
        <h3 className="text-2xl font-semibold text-vaya-gray-900 font-outfit truncate max-w-[220px]">
          {title}
        </h3>
      </div>
    </Link>
  );
};