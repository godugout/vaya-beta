import { Camera, Users, Heart, Music, Book, Calendar, MapPin, Image as ImageIcon, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { CapsuleRow } from "./layout/CapsuleRow";
import { Capsule } from "@/types/capsule";

const exampleCapsules: Capsule[] = [
  {
    title: "Beach Day Memories",
    description: "Summer family beach trip collection",
    icon: Camera,
    colorKey: "green",
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
    colorKey: "blue",
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
    colorKey: "green",
    prompts: ["Share a family recipe passed down generations"],
    metadata: {
      creatorInitials: "LE",
      itemCount: 12,
      status: "upcoming",
      date: "2024-03-15"
    }
  },
  {
    title: "Local Adventures",
    icon: Camera,
    colorKey: "green",
    prompts: ["What's your favorite hidden gem in the city?"],
    isPlaceholder: true
  },
  {
    title: "Holiday Traditions",
    icon: Heart,
    colorKey: "orange",
    prompts: ["Tell us about a unique family tradition"],
    isPlaceholder: true
  },
  {
    title: "Festival Celebrations",
    icon: Music,
    colorKey: "orange",
    prompts: ["Share a memorable festival moment"],
    isPlaceholder: true
  },
  {
    title: "Wildlife Encounters",
    icon: Camera,
    colorKey: "green",
    prompts: ["What's the most amazing animal you've seen?"],
    isPlaceholder: true
  },
  {
    title: "Family Reunions",
    icon: Users,
    colorKey: "blue",
    prompts: ["Your favorite reunion memory?"],
    isPlaceholder: true
  },
  {
    title: "Travel Diaries",
    icon: Book,
    colorKey: "green",
    prompts: ["Share an unexpected travel story"],
    isPlaceholder: true
  },
  {
    title: "Photo Albums",
    icon: ImageIcon,
    colorKey: "blue",
    prompts: ["What's the story behind your favorite photo?"],
    isPlaceholder: true
  },
  {
    title: "School Memories",
    icon: GraduationCap,
    colorKey: "blue",
    prompts: ["Your most memorable school day?"],
    isPlaceholder: true
  },
  {
    title: "Year in Review 2023",
    icon: Calendar,
    colorKey: "orange",
    prompts: ["What was your biggest achievement?"],
    isPlaceholder: true
  }
];

export const ExampleCapsules = () => {
  const itemsPerRow = Math.ceil(exampleCapsules.length / 3);
  const rows = Array.from({ length: 3 }, (_, i) =>
    exampleCapsules.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  );

  return (
    <div 
      className="w-screen relative overflow-hidden -mx-[50vw] left-[50%] right-[50%] bg-gradient-to-b from-white to-gray-50/50 py-24"
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
        <div className="space-y-16">
          {rows.map((row, index) => (
            <CapsuleRow
              key={index}
              capsules={row}
              rowIndex={index}
              duration={15 + index * 5}
            />
          ))}
        </div>
      </div>
    </div>
  );
};