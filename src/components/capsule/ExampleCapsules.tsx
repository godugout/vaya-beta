import { Camera, Users, Heart, Music, Book, Calendar, MapPin, Image as ImageIcon, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { CapsuleRow } from "./layout/CapsuleRow";
import { Capsule } from "@/types/capsule";

const detailedCapsules: Capsule[] = [
  {
    title: "Beach Day Memories",
    description: "Summer family beach trip collection",
    icon: Camera,
    colorKey: "memories",
    prompts: ["Share your favorite beach activity with the family"],
    metadata: {
      creatorInitials: "ES",
      itemCount: 24,
      status: "active",
      date: "2024-11-01"
    }
  },
  {
    title: "Our Journey Here",
    description: "Immigration stories and memories",
    icon: MapPin,
    colorKey: "stories",
    prompts: ["Tell us about your first day in the new country"],
    metadata: {
      creatorInitials: "JD",
      itemCount: 18,
      status: "locked",
      date: "2024-12-31"
    }
  },
  {
    title: "Costa Rican Heritage",
    description: "Cultural traditions and stories",
    icon: Heart,
    colorKey: "capsules",
    prompts: ["Share a family recipe passed down generations"],
    metadata: {
      creatorInitials: "LE",
      itemCount: 12,
      status: "upcoming",
      date: "2024-03-15"
    }
  }
];

const simpleCapsules: Capsule[] = [
  {
    title: "Local Adventures",
    icon: Camera,
    colorKey: "memories",
    prompts: ["What's your favorite hidden gem in the city?"],
    isPlaceholder: true
  },
  {
    title: "Holiday Traditions",
    icon: Heart,
    colorKey: "stories",
    prompts: ["Tell us about a unique family tradition"],
    isPlaceholder: true
  },
  {
    title: "Festival Celebrations",
    icon: Music,
    colorKey: "capsules",
    prompts: ["Share a memorable festival moment"],
    isPlaceholder: true
  },
  {
    title: "Wildlife Encounters",
    icon: Camera,
    colorKey: "memories",
    prompts: ["What's the most amazing animal you've seen?"],
    isPlaceholder: true
  },
  {
    title: "Family Reunions",
    icon: Users,
    colorKey: "stories",
    prompts: ["Your favorite reunion memory?"],
    isPlaceholder: true
  },
  {
    title: "Travel Diaries",
    icon: Book,
    colorKey: "capsules",
    prompts: ["Share an unexpected travel story"],
    isPlaceholder: true
  }
];

export const ExampleCapsules = () => {
  return (
    <div 
      className="w-screen relative overflow-hidden -mx-[50vw] left-[50%] right-[50%] bg-gradient-to-b from-white to-gray-50/50 py-16"
      style={{
        transform: "perspective(1000px) rotateX(2deg)",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-outfit font-semibold text-gray-900 mb-8"
        >
          Example Family Capsules
        </motion.h2>
        <div className="space-y-8">
          <CapsuleRow
            capsules={detailedCapsules}
            rowIndex={0}
            duration={20}
            isDetailed
          />
          <div className="pt-4">
            <h3 className="text-lg font-outfit font-medium text-gray-700 mb-6">
              Potential Ideas
            </h3>
            <div className="space-y-8">
              {[0, 1].map((index) => (
                <CapsuleRow
                  key={index}
                  capsules={simpleCapsules.slice(index * 3, (index + 1) * 3)}
                  rowIndex={index + 1}
                  duration={15 + index * 5}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};