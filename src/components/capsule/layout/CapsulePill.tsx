import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  const pillBaseClasses = cn(
    "relative overflow-hidden rounded-[90px]",
    "min-h-[120px] w-[500px]",
    `border-[3px] border-vaya-${colorKey}`,
    "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)]",
    "transition-all duration-300 group"
  );

  const placeholderPillClasses = cn(
    pillBaseClasses,
    "bg-white"
  );

  const detailedPillClasses = cn(
    pillBaseClasses,
    "bg-white"
  );

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={cn(
        "flex-shrink-0 transition-all duration-200",
        isPlaceholder ? "opacity-90 hover:opacity-100" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={isPlaceholder ? placeholderPillClasses : detailedPillClasses}>
        {/* Background and hover effects */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        
        {/* Animated gradient background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(120deg, transparent, rgba(var(--vaya-${colorKey}-rgb), 0.1), transparent)`,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
          style={{
            backgroundSize: '200% 100%',
            animation: isHovered ? 'shimmer 2s infinite' : 'none',
          }}
        />

        {/* Animated particles */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className={cn(
              "absolute inset-0",
              `bg-vaya-${colorKey}`,
              "pointer-events-none"
            )}
            style={{
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              animation: 'particles 20s linear infinite',
            }}
          />
        )}

        {/* Content */}
        <div className="flex items-center justify-center h-full relative z-10">
          {isPlaceholder ? (
            <div className="flex items-center gap-6 w-full">
              <div className={cn(
                "inline-flex items-center justify-center w-16 h-16 rounded-2xl shrink-0",
                `bg-vaya-${colorKey} bg-opacity-20`
              )}>
                <Icon className="w-10 h-10 text-gray-600" />
              </div>
              <div className="flex flex-col justify-start pt-2">
                <h3 className="text-2xl font-semibold text-vaya-gray-900 font-outfit text-left">
                  {title}
                </h3>
                {prompts && prompts.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-vaya-gray-600 mt-1">
                    <span>{prompts[0]}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between w-full">
              <div className="flex items-start gap-6">
                <div className={cn(
                  "inline-flex items-center justify-center w-16 h-16 rounded-2xl shrink-0 mt-1",
                  `bg-vaya-${colorKey} bg-opacity-20`
                )}>
                  <Icon className="w-10 h-10 text-gray-600" />
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
                        <span>{metadata.itemCount} items</span>
                      </div>
                      <span className={cn(
                        "capitalize px-3 py-1 rounded-full text-xs font-medium",
                        `bg-vaya-${colorKey} bg-opacity-20 text-vaya-${colorKey}`
                      )}>
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