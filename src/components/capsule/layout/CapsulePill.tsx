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
  backgroundImage?: string;
}

export const CapsulePill = ({
  title,
  icon: Icon,
  colorKey,
  description,
  prompts,
  metadata,
  isPlaceholder,
  backgroundImage
}: CapsulePillProps) => {
  const getBgColor = (key: string) => {
    const colors: { [key: string]: string } = {
      orange: "bg-vaya-accent-orange/60",
      green: "bg-vaya-accent-green/60",
      blue: "bg-vaya-accent-blue/60",
      yellow: "bg-vaya-accent-yellow/60"
    };
    return colors[key] || "bg-gray-50";
  };

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

  const getIconColor = (key: string) => {
    const colors: { [key: string]: string } = {
      orange: "text-vaya-stories",
      green: "text-vaya-capsules",
      blue: "text-vaya-memories",
      yellow: "text-vaya-stories"
    };
    return colors[key] || "text-gray-600";
  };

  const pillBaseClasses = cn(
    "relative overflow-hidden rounded-[90px]",
    "min-h-[120px] w-[500px]",
    `border-[3px] border-vaya-${colorKey}`,
    "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)]",
    "transition-all duration-300"
  );

  const placeholderPillClasses = cn(
    pillBaseClasses,
    "bg-white hover:bg-gradient-to-br hover:from-white hover:to-vaya-accent-blue/20"
  );

  const detailedPillClasses = cn(
    pillBaseClasses,
    getBgColor(colorKey)
  );

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={cn(
        "flex-shrink-0 transition-all duration-200",
        isPlaceholder ? "opacity-90 hover:opacity-100" : ""
      )}
    >
      <div className={isPlaceholder ? placeholderPillClasses : detailedPillClasses}>
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="flex items-center justify-center h-full relative z-10">
          <div className={cn(
            "flex items-center w-full h-full",
            isPlaceholder ? "py-4 px-6" : "p-6"
          )}>
            {isPlaceholder ? (
              <div className="flex items-center gap-6 w-full">
                <div className={cn(
                  "inline-flex items-center justify-center w-14 h-14 rounded-2xl shrink-0",
                  getIconBgColor(colorKey, true),
                  "group-hover:bg-opacity-20 transition-colors"
                )}>
                  <Icon className={cn("w-8 h-8", getIconColor(colorKey))} />
                </div>
                <div className="flex flex-col justify-start pt-1">
                  <h3 className="text-2xl font-semibold text-vaya-gray-900 font-outfit text-left">
                    {title}
                  </h3>
                  {prompts && prompts.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-vaya-gray-600 mt-1">
                      <Lightbulb className="w-4 h-4" />
                      <span>{prompts[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between w-full">
                <div className="flex items-start gap-6">
                  <div className={cn(
                    "inline-flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 mt-1",
                    getIconBgColor(colorKey),
                    "group-hover:bg-opacity-30 transition-colors"
                  )}>
                    <Icon className={cn("w-8 h-8", getIconColor(colorKey))} />
                  </div>
                  <div className="flex flex-col justify-start">
                    <h3 className="text-2xl font-semibold text-vaya-gray-900 font-outfit mb-1 text-left">
                      {title}
                    </h3>
                    {description && (
                      <p className="text-sm text-vaya-gray-600 line-clamp-2 font-inter text-left">
                        {description}
                      </p>
                    )}
                    {metadata && (
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-vaya-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{metadata.itemCount} items</span>
                        </div>
                        <span className={cn(
                          "capitalize px-3 py-1 rounded-full text-xs font-medium",
                          `bg-vaya-${colorKey} bg-opacity-10 text-vaya-${colorKey}`
                        )}>
                          {metadata.status}
                        </span>
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
      </div>
    </motion.div>
  );
};