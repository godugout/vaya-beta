import { LucideIcon, Clock, Lock, Eye, Timer, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, isPast, isToday, addDays } from "date-fns";

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

const getStatusInfo = (status: string, date: string) => {
  const statusDate = new Date(date);
  const isClosingSoon = !isPast(statusDate) && isToday(statusDate);
  const isOpeningSoon = !isPast(statusDate) && isToday(addDays(statusDate, -1));

  const statusConfig = {
    upcoming: {
      icon: Timer,
      color: "text-blue-500",
      bgColor: "bg-blue-50 border-blue-200",
      variant: "outline"
    },
    active: {
      icon: Unlock,
      color: "text-green-500",
      bgColor: "bg-green-50 border-green-200",
      variant: "subtle"
    },
    locked: {
      icon: Lock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 border-yellow-200",
      variant: "subtle"
    },
    revealed: {
      icon: Eye,
      color: "text-gray-500",
      bgColor: "bg-gray-50 border-gray-200",
      variant: "subtle"
    }
  };

  // Override for special cases
  if (isClosingSoon) {
    return {
      icon: Clock,
      color: "text-red-500",
      bgColor: "bg-red-50 border-red-200",
      variant: "solid"
    };
  }

  if (isOpeningSoon) {
    return {
      icon: Timer,
      color: "text-green-500",
      bgColor: "bg-green-50 border-green-200",
      variant: "solid"
    };
  }

  return statusConfig[status as keyof typeof statusConfig];
};

export const CapsuleCard = ({
  title,
  icon: Icon,
  colorKey,
  metadata,
  isDesktop,
}: CapsuleCardProps) => {
  const statusInfo = metadata ? getStatusInfo(metadata.status, metadata.date) : null;
  const StatusIcon = statusInfo?.icon;

  return (
    <div 
      className={cn(
        "group relative bg-white/90 rounded-xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300",
        "hover:transform hover:-translate-y-1",
        isDesktop ? "w-[360px]" : "w-full" // Increased from 280px to 360px
      )}
    >
      <div className="flex items-start space-x-5"> {/* Increased spacing */}
        <div className={cn(
          "p-3.5 rounded-xl", // Increased padding
          getBackgroundColor(colorKey),
          "transition-colors duration-300"
        )}>
          <Icon className={cn(
            "w-8 h-8", // Increased from w-6 h-6
            getIconColor(colorKey)
          )} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-vaya-gray-900 mb-2 font-outfit"> {/* Increased from text-lg */}
            {title}
          </h3>
          {metadata && (
            <div className="flex flex-col space-y-3"> {/* Increased spacing */}
              <div className="flex items-center space-x-2 text-base text-vaya-gray-500 font-inter"> {/* Increased from text-sm */}
                <span>{metadata.itemCount} items</span>
                <span>•</span>
                <span>{format(new Date(metadata.date), 'MMM d, yyyy')}</span>
              </div>
              {StatusIcon && (
                <div className={cn(
                  "inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium border",
                  statusInfo.bgColor,
                  statusInfo.variant === "outline" ? "bg-white" : "",
                  statusInfo.variant === "solid" ? "border-none" : "border-opacity-50"
                )}>
                  <StatusIcon className={cn("w-4 h-4", statusInfo.color)} />
                  <span className={statusInfo.color}>
                    {metadata.status.charAt(0).toUpperCase() + metadata.status.slice(1)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};