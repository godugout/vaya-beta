import { LucideIcon, Lightbulb, Users } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CapsulePillProps {
  title: string;
  icon: LucideIcon;
  colorKey: string;
  description?: string;
  prompts?: string[];
  metadata?: {
    creatorInitials: string;
    itemCount: number;
    status: "upcoming" | "active" | "locked" | "revealed";
    date: string;
  };
  isPlaceholder?: boolean;
}

export const CapsulePill = ({
  title,
  icon: Icon,
  colorKey,
  description,
  prompts,
  metadata,
  isPlaceholder
}: CapsulePillProps) => {
  // Helper function to get background color based on colorKey
  const getBgColor = (key: string) => {
    const colors: { [key: string]: string } = {
      orange: "bg-vaya-accent-orange/40",
      green: "bg-vaya-accent-green/40",
      blue: "bg-vaya-accent-blue/40",
      yellow: "bg-vaya-accent-yellow/40"
    };
    return colors[key] || "bg-gray-50";
  };

  // Helper function to get icon background color based on colorKey
  const getIconBgColor = (key: string, isPlaceholder: boolean = false) => {
    const opacity = isPlaceholder ? "10" : "20";
    const colors: { [key: string]: string } = {
      orange: `bg-vaya-stories bg-opacity-${opacity}`,
      green: `bg-vaya-capsules bg-opacity-${opacity}`,
      blue: `bg-vaya-memories bg-opacity-${opacity}`,
      yellow: `bg-vaya-stories bg-opacity-${opacity}`
    };
    return colors[key] || `bg-gray-100 bg-opacity-${opacity}`;
  };

  // Helper function to get icon color based on colorKey
  const getIconColor = (key: string) => {
    const colors: { [key: string]: string } = {
      orange: "text-vaya-stories",
      green: "text-vaya-capsules",
      blue: "text-vaya-memories",
      yellow: "text-vaya-stories"
    };
    return colors[key] || "text-gray-600";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={cn(
        "group flex-shrink-0 transition-all duration-200",
        isPlaceholder ? "opacity-90 hover:opacity-100" : ""
      )}
    >
      <div className={cn(
        "relative overflow-hidden rounded-[90px]",
        "min-h-[160px] w-[500px]",
        `border-[3px] border-vaya-${colorKey}`,
        isPlaceholder 
          ? "bg-white hover:bg-gradient-to-br hover:from-white hover:to-vaya-accent-blue/20"
          : getBgColor(colorKey),
        "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)]",
        "transition-all duration-300"
      )}>
        <div className="p-8 h-full">
          {isPlaceholder ? (
            <div className="flex items-center gap-6 h-full">
              <div className={cn(
                "inline-flex items-center justify-center w-12 h-12 rounded-2xl shrink-0",
                getIconBgColor(colorKey, true),
                "group-hover:bg-opacity-20 transition-colors"
              )}>
                <Icon className={cn("w-6 h-6", getIconColor(colorKey))} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-vaya-gray-900 font-outfit">
                  {title}
                </h3>
                {prompts && prompts.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-vaya-gray-600">
                    <Lightbulb className="w-4 h-4" />
                    <span>{prompts[0]}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start h-full">
              <div className="flex items-center gap-6">
                <div className={cn(
                  "inline-flex items-center justify-center w-12 h-12 rounded-2xl shrink-0",
                  getIconBgColor(colorKey),
                  "group-hover:bg-opacity-30 transition-colors"
                )}>
                  <Icon className={cn("w-6 h-6", getIconColor(colorKey))} />
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-2xl font-semibold text-vaya-gray-900 font-outfit mb-1">
                      {title}
                    </h3>
                    {description && (
                      <p className="text-sm text-vaya-gray-600 line-clamp-2 font-inter">
                        {description}
                      </p>
                    )}
                  </div>
                  {metadata && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4 text-sm text-vaya-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{metadata.itemCount} items</span>
                        </div>
                        <span className={cn(
                          "capitalize px-3 py-1 rounded-full text-xs font-medium",
                          `bg-vaya-${colorKey} bg-opacity-10 text-vaya-${colorKey}`
                        )}>
                          {metadata.status}
                        </span>
                      </div>
                      {prompts && prompts.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-vaya-gray-600">
                          <Lightbulb className="w-4 h-4" />
                          <span>{prompts[0]}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};