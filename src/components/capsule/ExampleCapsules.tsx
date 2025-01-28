import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, Users, Gift, Heart, Camera, Music, Star, Image as ImageIcon, Book } from "lucide-react";
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
  }
];

const statusColors = {
  upcoming: "bg-blue-100 text-blue-800",
  active: "bg-green-100 text-green-800",
  locked: "bg-orange-100 text-orange-800",
  revealed: "bg-purple-100 text-purple-700"
};

export const ExampleCapsules = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-outfit font-semibold text-gray-900 mb-8">
          Example Family Capsules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exampleCapsules.map((capsule, index) => {
            const Icon = capsule.icon;
            return (
              <motion.div
                key={capsule.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  <div className={`p-6 bg-vaya-${capsule.colorKey} bg-opacity-10`}>
                    {/* Icon and Avatar Section */}
                    <div className="relative mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm">
                        <Icon className={`w-8 h-8 text-vaya-${capsule.colorKey}`} />
                      </div>
                      <Avatar className="absolute -right-2 -top-2 w-8 h-8 border-2 border-white">
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs font-medium">
                          {capsule.creator.initials}
                        </div>
                      </Avatar>
                    </div>

                    {/* Content Section */}
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
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};