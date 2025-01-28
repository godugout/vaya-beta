import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";

// Emoji mapping for different capsule types
const getEmojiForIcon = (icon: LucideIcon): string => {
  const emojiMap = {
    Camera: "👨‍👩‍👧‍👦",    // Family
    MessageCircle: "🗣️",   // Conversation
    Heart: "💝",          // Love/Family bond
    HelpCircle: "🤗",     // Support
    Users: "👥",          // Group/Friends
    Music: "🎵",          // Music memories
    Book: "📔",           // Family stories
    Calendar: "🎊",       // Celebrations
    MapPin: "🏡",         // Home/Location
    Image: "🎞️",          // Family photos
    Star: "🌟",           // Special moments
    Gift: "🎁",           // Special occasions
    GraduationCap: "👨‍🎓", // Achievements
  };
  
  return emojiMap[icon.name as keyof typeof emojiMap] || "👨‍👩‍👧";
};

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
  icon,
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d");
  };

  const getCountdown = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

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
        
        {/* Content */}
        <div className="flex items-center justify-between h-full relative z-10 px-12 py-8">
          {isPlaceholder ? (
            <div className="flex items-center gap-6 w-full">
              <span className="text-4xl">{getEmojiForIcon(icon)}</span>
              <div className="flex flex-col justify-start">
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
            <>
              <div className="flex items-start">
                <span className="text-4xl mr-6">{getEmojiForIcon(icon)}</span>
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
              {metadata?.date && (
                <div className="flex flex-col items-end justify-center ml-4">
                  <div className="text-lg font-semibold text-vaya-gray-700">
                    {formatDate(metadata.date)}
                  </div>
                  <div className="text-sm text-vaya-gray-500">
                    {getCountdown(metadata.date)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};