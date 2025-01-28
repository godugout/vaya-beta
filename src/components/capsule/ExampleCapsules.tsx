import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, Users, Gift, Heart, Camera, Music, Star, Image as ImageIcon, Book, Circle, Square, Diamond, Triangle } from "lucide-react";
import { motion } from "framer-motion";

const exampleCapsules = [
  {
    title: "Family Reunion 2024",
    description: "Capturing memories from our annual family gathering",
    icon: Users,
    colorKey: "orange",
    creator: {
      initials: "JD",
      avatar: "/placeholder.svg"
    },
    stats: {
      memories: 12,
      contributors: 5
    },
    status: "upcoming",
    timeLeft: "2 months"
  },
  {
    title: "Holiday Traditions",
    description: "Our favorite family recipes and holiday moments",
    icon: Gift,
    colorKey: "green",
    creator: {
      initials: "MC",
      avatar: "/placeholder.svg"
    },
    stats: {
      memories: 8,
      contributors: 3
    },
    status: "active",
    timeLeft: "15 days"
  },
  {
    title: "Summer Adventures",
    description: "Beach trips and outdoor activities with the family",
    icon: Camera,
    colorKey: "blue",
    creator: {
      initials: "AS",
      avatar: "/placeholder.svg"
    },
    stats: {
      memories: 24,
      contributors: 6
    },
    status: "active",
    timeLeft: "1 month"
  },
  // Theme placeholder capsules
  ...Array.from({ length: 18 }, (_, i) => ({
    title: `Theme ${i + 1}`,
    icon: [Circle, Square, Diamond, Triangle, Star, Heart][i % 6],
    colorKey: ["orange", "green", "blue", "yellow"][i % 4],
    isPlaceholder: true
  }))
];

const statusColors = {
  upcoming: "bg-blue-100 text-blue-800",
  active: "bg-green-100 text-green-800",
  locked: "bg-orange-100 text-orange-800",
  revealed: "bg-purple-100 text-purple-700"
};

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
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-outfit font-semibold text-gray-900 mb-8">
          Example Family Capsules
        </h2>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
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
                  "relative overflow-hidden transition-all duration-300",
                  capsule.isPlaceholder ? "opacity-60 hover:opacity-100" : "hover:shadow-lg"
                )}>
                  <div className={`p-6 bg-vaya-${capsule.colorKey} bg-opacity-10`}>
                    {/* Icon and Avatar Section */}
                    <div className="relative mb-4">
                      <div className={cn(
                        "inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm",
                        capsule.isPlaceholder && "animate-pulse"
                      )}>
                        <Icon className={`w-8 h-8 text-vaya-${capsule.colorKey}`} />
                      </div>
                      {!capsule.isPlaceholder && capsule.creator && (
                        <Avatar className="absolute -right-2 -top-2 w-8 h-8 border-2 border-white">
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs font-medium">
                            {capsule.creator.initials}
                          </div>
                        </Avatar>
                      )}
                    </div>

                    {/* Content Section */}
                    {!capsule.isPlaceholder ? (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {capsule.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {capsule.description}
                        </p>

                        {/* Stats Section */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <ImageIcon className="w-4 h-4" />
                            {capsule.stats.memories}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {capsule.stats.contributors}
                          </span>
                        </div>

                        {/* Status and Time Section */}
                        <div className="flex items-center justify-between pt-2">
                          <Badge variant="secondary" className={statusColors[capsule.status as keyof typeof statusColors]}>
                            {capsule.status}
                          </Badge>
                          <span className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {capsule.timeLeft}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 opacity-75">
                          Theme Capsule
                        </h3>
                        <p className="text-sm text-gray-500">
                          Click to create a new capsule
                        </p>
                      </div>
                    )}
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