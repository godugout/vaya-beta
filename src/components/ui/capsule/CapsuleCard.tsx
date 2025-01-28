import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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

const getBackgroundColor = (colorKey: string) => {
  const colors = {
    orange: "bg-vaya-accent-orange",
    green: "bg-vaya-accent-green",
    blue: "bg-vaya-accent-blue",
    yellow: "bg-vaya-accent-yellow",
  };
  return colors[colorKey as keyof typeof colors] || colors.orange;
};

const getIconColor = (colorKey: string) => {
  const colors = {
    orange: "text-vaya-stories",
    green: "text-vaya-capsules",
    blue: "text-vaya-memories",
    yellow: "text-vaya-stories",
  };
  return colors[colorKey as keyof typeof colors] || colors.orange;
};

const getStatusColor = (status: string) => {
  const colors = {
    upcoming: "bg-blue-100 text-blue-700",
    active: "bg-green-100 text-green-700",
    locked: "bg-yellow-100 text-yellow-700",
    revealed: "bg-gray-100 text-gray-700",
  };
  return colors[status as keyof typeof colors] || colors.upcoming;
};

export const CapsuleCard = ({
  title,
  icon: Icon,
  colorKey,
  metadata,
  isDesktop,
}: CapsuleCardProps) => {
  return (
    <div 
      className={cn(
        "group relative bg-white/90 rounded-xl shadow-sm border border-gray-100/50 p-4 hover:shadow-md transition-all duration-300",
        "hover:transform hover:-translate-y-1",
        isDesktop ? "w-[280px]" : "w-full"
      )}
    >
      <div className="flex items-start space-x-4">
        <div className={cn(
          "p-2.5 rounded-xl",
          getBackgroundColor(colorKey),
          "transition-colors duration-300"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            getIconColor(colorKey)
          )} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-vaya-gray-900 mb-1 font-outfit">
            {title}
          </h3>
          {metadata && (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-sm text-vaya-gray-500 font-inter">
                <span>{metadata.itemCount} items</span>
                <span>•</span>
                <span>{metadata.date}</span>
              </div>
              <div className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                getStatusColor(metadata.status)
              )}>
                {metadata.status.charAt(0).toUpperCase() + metadata.status.slice(1)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};