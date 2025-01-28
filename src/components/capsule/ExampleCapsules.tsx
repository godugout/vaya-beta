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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const ExampleCapsules = () => {
  return (
    <div className="py-12 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-outfit font-semibold text-gray-900 mb-8">
          Example Family Capsules
        </h2>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {exampleCapsules.map((capsule, index) => {
            const Icon = capsule.icon;
            return (
              <motion.div
                key={`${capsule.title}-${index}`}
                variants={item}
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className={cn(
                  "relative overflow-hidden transition-all duration-300 rounded-[32px] border-0",
                  capsule.isPlaceholder ? "opacity-80 hover:opacity-100" : "hover:shadow-lg",
                  `bg-vaya-accent-${capsule.colorKey} bg-opacity-30`
                )}>
                  <div className="p-4">
                    <div className="relative mb-3 flex items-center gap-3">
                      <div className={cn(
                        "inline-flex items-center justify-center w-10 h-10 rounded-2xl",
                        `bg-vaya-${capsule.colorKey} bg-opacity-20`
                      )}>
                        <Icon className={`w-5 h-5 text-vaya-${capsule.colorKey}`} />
                      </div>
                      {!capsule.isPlaceholder && capsule.creator && (
                        <div className="flex-1 flex items-center justify-between">
                          <Avatar className="w-6 h-6 border-2 border-white">
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs font-medium">
                              {capsule.creator.initials}
                            </div>
                          </Avatar>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {capsule.title}
                      </h3>
                      {!capsule.isPlaceholder && (
                        <>
                          {capsule.description && (
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {capsule.description}
                            </p>
                          )}

                          {capsule.stats && (
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <ImageIcon className="w-3 h-3" />
                                {capsule.stats.memories}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {capsule.stats.contributors}
                              </span>
                            </div>
                          )}

                          {capsule.status && capsule.timeLeft && (
                            <div className="flex items-center justify-between pt-1">
                              <Badge variant="secondary" className={cn(
                                "rounded-full px-3 py-0.5 text-xs font-medium",
                                statusColors[capsule.status]
                              )}>
                                {capsule.status}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {capsule.timeLeft}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};