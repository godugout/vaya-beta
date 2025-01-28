import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format, formatDistanceToNow, isPast, isToday, addDays } from "date-fns";

// Enhanced emoji mapping for different capsule types and content
const getEmojiForIcon = (icon: LucideIcon, title?: string, description?: string): string => {
  // First check for specific content matches in title or description
  const contentLower = `${title} ${description}`.toLowerCase();
  
  if (contentLower.includes('beach')) return '🏖️';
  if (contentLower.includes('heritage') || contentLower.includes('cultural')) return '🏺';
  if (contentLower.includes('story') || contentLower.includes('share')) return '📖';
  if (contentLower.includes('family') || contentLower.includes('reunion')) return '👨‍👩‍👧‍👦';
  if (contentLower.includes('dinner') || contentLower.includes('food')) return '🍽️';
  if (contentLower.includes('holiday') || contentLower.includes('celebration')) return '🎊';
  if (contentLower.includes('wedding')) return '💑';
  if (contentLower.includes('graduation')) return '🎓';
  if (contentLower.includes('birthday')) return '🎂';
  if (contentLower.includes('music') || contentLower.includes('concert')) return '🎵';
  if (contentLower.includes('travel') || contentLower.includes('vacation')) return '✈️';
  if (contentLower.includes('garden') || contentLower.includes('nature')) return '🌺';
  if (contentLower.includes('sport') || contentLower.includes('game')) return '⚽';
  if (contentLower.includes('cooking') || contentLower.includes('recipe')) return '👩‍🍳';
  if (contentLower.includes('art') || contentLower.includes('craft')) return '🎨';
  
  // Fallback to icon-based mapping
  const emojiMap = {
    Camera: '📸',
    MessageCircle: '💭',
    Heart: '💝',
    HelpCircle: '💡',
    Users: '👥',
    Music: '🎼',
    Book: '📚',
    Calendar: '📅',
    MapPin: '📍',
    Image: '🖼️',
    Star: '⭐',
    Gift: '🎁',
    GraduationCap: '🎓',
  };
  
  return emojiMap[icon.name as keyof typeof emojiMap] || '💫';
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

const getStatusColor = (status: string, date: string): string => {
  const statusDate = new Date(date);
  const isClosingSoon = !isPast(statusDate) && isToday(statusDate);
  const isOpeningSoon = !isPast(statusDate) && isToday(addDays(statusDate, -1));

  // Enhanced color palette for circle tracers
  const colors = {
    upcoming: "stroke-[#9b87f5]", // Primary Purple
    active: "stroke-[#F97316]",   // Bright Orange
    locked: "stroke-[#D946EF]",   // Magenta Pink
    revealed: "stroke-[#0EA5E9]", // Ocean Blue
    closing: "stroke-[#8B5CF6]",  // Vivid Purple
    opening: "stroke-[#1EAEDB]",  // Bright Blue
  };

  if (isClosingSoon) return colors.closing;
  if (isOpeningSoon) return colors.opening;
  if (status === "locked") return colors.locked;
  if (status === "active") return colors.active;
  if (status === "revealed") return colors.revealed;
  return colors.upcoming;
};

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
  const emoji = getEmojiForIcon(icon, title, description);

  const pillBaseClasses = cn(
    "relative overflow-hidden rounded-[90px]",
    "min-h-[100px] w-[400px]", // Reduced from 120px height and 500px width
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

  const orbitingProfiles = [
    { initials: "JD", angle: 0 },
    { initials: "AS", angle: 120 },
    { initials: "MK", angle: 240 },
  ];

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
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        
        <div className="flex items-center justify-between h-full relative z-10 px-8 py-6">
          {isPlaceholder ? (
            <div className="flex items-center gap-4 w-full">
              <span className="text-3xl">{emoji}</span>
              <div className="flex flex-col justify-start">
                <h3 className="text-xl font-semibold text-vaya-gray-900 font-outfit text-left">
                  {title}
                </h3>
                {prompts && prompts.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-vaya-gray-600 mt-1">
                    <span>{prompts[0]}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start">
                <span className="text-3xl mr-4">{emoji}</span>
                <div className="flex flex-col justify-start">
                  <h3 className="text-xl font-semibold text-vaya-gray-900 font-outfit mb-1 text-left">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-xs text-vaya-gray-600 line-clamp-2 font-inter text-left">
                      {description}
                    </p>
                  )}
                  {metadata && (
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-xs text-vaya-gray-500">
                        <span>{metadata.itemCount} items</span>
                      </div>
                      <span className={cn(
                        "capitalize px-2 py-0.5 rounded-full text-xs font-medium",
                        `bg-vaya-${colorKey} bg-opacity-20 text-vaya-${colorKey}`
                      )}>
                        {metadata.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {metadata?.date && (
                <div className="relative w-16 h-16">
                  {/* Circle background */}
                  <div className="absolute inset-0 rounded-full bg-gray-50 border-2 border-gray-100" />
                  
                  {/* Animated progress circle */}
                  <svg
                    className="absolute inset-0 w-full h-full -rotate-90 animate-[spin_3s_linear_infinite]"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      className={cn(
                        "transition-all duration-300",
                        getStatusColor(metadata.status, metadata.date)
                      )}
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      strokeWidth="2"
                      strokeDasharray="301.59"
                      strokeDashoffset="75"
                      strokeLinecap="round"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="301.59;75;301.59"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                  
                  {/* Orbiting profile pictures */}
                  {orbitingProfiles.map((profile, index) => (
                    <div
                      key={profile.initials}
                      className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${profile.angle}deg) translateY(-32px) rotate(-${profile.angle}deg)`,
                      }}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center",
                        `border-vaya-${colorKey}`,
                        "text-xs font-medium animate-pulse"
                      )}>
                        {profile.initials}
                      </div>
                    </div>
                  ))}
                  
                  {/* Date display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-vaya-gray-800">
                      {format(new Date(metadata.date), 'd')}
                    </span>
                    <span className="text-xs font-medium text-vaya-gray-600">
                      {format(new Date(metadata.date), 'MMM')}
                    </span>
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