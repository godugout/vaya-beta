import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CapsulePillProps {
  title: string;
  icon: LucideIcon;
  colorKey: string;
  description?: string;
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
  metadata,
  isPlaceholder
}: CapsulePillProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={cn(
        "group flex-shrink-0 transition-all duration-200",
        "hover:shadow-xl shadow-md",
        isPlaceholder ? "opacity-80 hover:opacity-100" : ""
      )}
    >
      <div className={cn(
        "relative overflow-hidden rounded-[90px] border-2",
        `border-vaya-${colorKey} bg-vaya-accent-${colorKey} bg-opacity-30`,
        "hover:border-opacity-100 border-opacity-50",
        "min-h-[160px] w-[500px]"
      )}>
        <div className="p-8 h-full">
          {isPlaceholder ? (
            <div className="flex items-center gap-4 h-full">
              <div className={cn(
                "inline-flex items-center justify-center w-14 h-14 rounded-3xl",
                `bg-vaya-${colorKey} bg-opacity-20`
              )}>
                <Icon className={`w-7 h-7 text-vaya-${colorKey}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 font-outfit">
                {title}
              </h3>
            </div>
          ) : (
            <div className="flex justify-between items-start h-full">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "inline-flex items-center justify-center w-14 h-14 rounded-3xl",
                  `bg-vaya-${colorKey} bg-opacity-20`
                )}>
                  <Icon className={`w-7 h-7 text-vaya-${colorKey}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 font-outfit">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-sm text-gray-600 line-clamp-2 font-inter">
                      {description}
                    </p>
                  )}
                  {metadata && (
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{metadata.itemCount} items</span>
                      <span className="capitalize px-2 py-1 rounded-full text-xs font-medium bg-white/50">
                        {metadata.status}
                      </span>
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