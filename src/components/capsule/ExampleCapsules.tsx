import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Camera, Users, Heart, Music, Book, Calendar, MapPin, Image as ImageIcon, GraduationCap, Film, Video } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ExampleCapsule = {
  title: string;
  description?: string;
  icon: any;
  colorKey: string;
  isPlaceholder?: boolean;
  creator?: {
    initials: string;
    avatar: string;
  };
  stats?: {
    memories: number;
    contributors: number;
  };
  status?: "upcoming" | "active" | "locked" | "revealed";
  timeLeft?: string;
};

const exampleCapsules: ExampleCapsule[] = [
  {
    title: "Beach Day Memories",
    description: "Summer family beach trip collection",
    icon: Camera,
    colorKey: "green",
    creator: {
      initials: "ES",
      avatar: "/placeholder.svg"
    },
    stats: {
      memories: 24,
      contributors: 6
    },
    status: "active",
    timeLeft: "Opened Nov 1"
  },
  {
    title: "Our Journey Here",
    description: "Immigration stories and memories",
    icon: MapPin,
    colorKey: "blue",
    creator: {
      initials: "JD",
      avatar: "/placeholder.svg"
    },
    stats: {
      memories: 18,
      contributors: 8
    },
    status: "locked",
    timeLeft: "Opens Dec 31"
  },
  {
    title: "Costa Rican Heritage",
    description: "Cultural traditions and stories",
    icon: Heart,
    colorKey: "green",
    creator: {
      initials: "LE",
      avatar: "/placeholder.svg"
    },
    stats: {
      memories: 12,
      contributors: 4
    },
    status: "upcoming",
    timeLeft: "Unlocks today"
  },
  {
    title: "Local Adventures",
    icon: Video,
    colorKey: "green",
    isPlaceholder: true
  },
  {
    title: "Holiday Traditions",
    icon: Heart,
    colorKey: "orange",
    isPlaceholder: true
  },
  {
    title: "Festival Celebrations",
    icon: Music,
    colorKey: "orange",
    isPlaceholder: true
  },
  {
    title: "Wildlife Encounters",
    icon: Camera,
    colorKey: "green",
    isPlaceholder: true
  },
  {
    title: "Family Reunions",
    icon: Users,
    colorKey: "blue",
    isPlaceholder: true
  },
  {
    title: "Travel Diaries",
    icon: Book,
    colorKey: "green",
    isPlaceholder: true
  },
  {
    title: "Photo Albums",
    icon: ImageIcon,
    colorKey: "blue",
    isPlaceholder: true
  },
  {
    title: "School Memories",
    icon: GraduationCap,
    colorKey: "blue",
    isPlaceholder: true
  },
  {
    title: "Year in Review 2023",
    icon: Calendar,
    colorKey: "orange",
    isPlaceholder: true
  }
];

const statusColors = {
  upcoming: "bg-blue-100 text-blue-800",
  active: "bg-green-100 text-green-800",
  locked: "bg-orange-100 text-orange-800",
  revealed: "bg-purple-100 text-purple-700"
} as const;

const snakeAnimation = (index: number, rowIndex: number) => {
  const duration = 20; // Faster animation
  const direction = rowIndex % 2 === 0 ? 1 : -1;
  const xOffset = direction === 1 ? -100 : 100;
  
  return {
    x: [xOffset, -xOffset],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: duration,
        ease: "linear",
        delay: index * 0.1
      }
    }
  };
};

export const ExampleCapsules = () => {
  const rows = [
    exampleCapsules.slice(0, 4),
    exampleCapsules.slice(4, 8),
    exampleCapsules.slice(8)
  ];

  return (
    <div className="py-12 bg-gray-50/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-outfit font-semibold text-gray-900 mb-8">
          Example Family Capsules
        </h2>
        <div className="space-y-16">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: rowIndex * 0.2 }}
            >
              {row.map((capsule, index) => {
                const Icon = capsule.icon;
                return (
                  <motion.div
                    key={`${capsule.title}-${index}`}
                    className="group flex-shrink-0"
                    animate={snakeAnimation(index, rowIndex)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Card className={cn(
                      "relative overflow-hidden transition-all duration-200",
                      "rounded-[90px] border-2 min-h-[160px] w-[500px]",
                      "hover:shadow-xl shadow-md",
                      capsule.isPlaceholder ? "opacity-80 hover:opacity-100" : "",
                      `border-vaya-${capsule.colorKey} bg-vaya-accent-${capsule.colorKey} bg-opacity-30`,
                      "hover:border-opacity-100 border-opacity-50"
                    )}>
                      <div className="p-8 h-full">
                        {capsule.isPlaceholder ? (
                          // Vertically centered layout for placeholder capsules
                          <div className="flex items-center gap-4 h-full">
                            <div className={cn(
                              "inline-flex items-center justify-center w-14 h-14 rounded-3xl",
                              `bg-vaya-${capsule.colorKey} bg-opacity-20`
                            )}>
                              <Icon className={`w-7 h-7 text-vaya-${capsule.colorKey}`} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 font-outfit">
                              {capsule.title}
                            </h3>
                          </div>
                        ) : (
                          // Horizontal layout for capsules with details
                          <div className="flex justify-between items-start h-full">
                            <div className="flex items-start gap-4">
                              <div className={cn(
                                "inline-flex items-center justify-center w-14 h-14 rounded-3xl",
                                `bg-vaya-${capsule.colorKey} bg-opacity-20`
                              )}>
                                <Icon className={`w-7 h-7 text-vaya-${capsule.colorKey}`} />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-gray-900 font-outfit">
                                  {capsule.title}
                                </h3>
                                {capsule.description && (
                                  <p className="text-sm text-gray-600 line-clamp-2 font-inter">
                                    {capsule.description}
                                  </p>
                                )}
                                {capsule.stats && (
                                  <div className="flex items-center gap-4 text-sm text-gray-500 font-inter">
                                    <span className="flex items-center gap-1.5">
                                      <ImageIcon className="w-4 h-4" />
                                      {capsule.stats.memories}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                      <Users className="w-4 h-4" />
                                      {capsule.stats.contributors}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            {capsule.creator && (
                              <div className="flex flex-col items-end gap-2">
                                <Avatar className="w-8 h-8 border-2 border-white">
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-sm font-medium">
                                    {capsule.creator.initials}
                                  </div>
                                </Avatar>
                                {capsule.status && capsule.timeLeft && (
                                  <div className="flex flex-col items-end gap-1">
                                    <Badge variant="secondary" className={cn(
                                      "rounded-full px-4 py-1 text-sm font-medium",
                                      statusColors[capsule.status]
                                    )}>
                                      {capsule.status}
                                    </Badge>
                                    <span className="text-sm text-gray-500 font-inter">
                                      {capsule.timeLeft}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};