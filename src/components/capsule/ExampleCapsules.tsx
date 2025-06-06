
import { Camera, Users, Heart, Music, Book, Calendar, MapPin, Image as ImageIcon, GraduationCap, MessageCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { CapsuleRow } from "./layout/CapsuleRow";
import { Capsule } from "@/types/capsule";

export const detailedCapsules: Capsule[] = [
  {
    id: "capsule-1",
    title: "Beach Day Memories",
    description: "Summer family beach trip collection",
    icon: Camera,
    colorKey: "memories",
    metadata: {
      creatorInitials: "ES",
      itemCount: 24,
      status: "active",
      date: "2024-11-01"
    }
  },
  {
    id: "capsule-2",
    title: "Share Your Story",
    description: "Join the conversation",
    icon: MessageCircle,
    colorKey: "stories",
    backgroundImage: "/lovable-uploads/family-dinner.jpg",
    metadata: {
      creatorInitials: "JD",
      itemCount: 18,
      status: "upcoming",
      date: "2024-12-31"
    }
  },
  {
    id: "capsule-3",
    title: "Costa Rican Heritage",
    description: "Cultural traditions and stories",
    icon: Heart,
    colorKey: "capsules",
    metadata: {
      creatorInitials: "LE",
      itemCount: 12,
      status: "upcoming",
      date: "2024-03-15"
    }
  }
];

export const simpleCapsules: Capsule[] = [
  {
    id: "simple-1",
    title: "Share Ideas",
    icon: HelpCircle,
    colorKey: "memories",
    prompts: ["What's your most creative idea?"],
    isPlaceholder: true,
    metadata: {
      creatorInitials: "RJ",
      itemCount: 5,
      status: "active",
      date: "2024-06-15"
    }
  },
  {
    id: "simple-2",
    title: "Ask Questions",
    icon: HelpCircle,
    colorKey: "stories",
    backgroundImage: "/lovable-uploads/family-gathering.jpg",
    prompts: ["What would you like to know?"],
    isPlaceholder: true,
    metadata: {
      creatorInitials: "MK",
      itemCount: 8,
      status: "locked",
      date: "2024-08-20"
    }
  },
  {
    id: "simple-3",
    title: "Start Talking",
    icon: MessageCircle,
    colorKey: "capsules",
    prompts: ["Share your voice"],
    isPlaceholder: true,
    metadata: {
      creatorInitials: "AP",
      itemCount: 15,
      status: "revealed",
      date: "2024-07-01"
    }
  },
  {
    id: "simple-4",
    title: "Got Questions?",
    icon: HelpCircle,
    colorKey: "memories",
    prompts: ["What's on your mind?"],
    isPlaceholder: true,
    metadata: {
      creatorInitials: "DL",
      itemCount: 3,
      status: "upcoming",
      date: "2024-09-10"
    }
  },
  {
    id: "simple-5",
    title: "Share Stories",
    icon: MessageCircle,
    colorKey: "stories",
    backgroundImage: "/lovable-uploads/family-picnic.jpg",
    prompts: ["Connect Now"],
    isPlaceholder: true,
    metadata: {
      creatorInitials: "BK",
      itemCount: 20,
      status: "active",
      date: "2024-10-05"
    }
  },
  {
    id: "simple-6",
    title: "New Ideas",
    icon: HelpCircle,
    colorKey: "capsules",
    prompts: ["What inspires you?"],
    isPlaceholder: true,
    metadata: {
      creatorInitials: "CN",
      itemCount: 7,
      status: "locked",
      date: "2024-11-15"
    }
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
        <div className="space-y-4">
          <CapsuleRow
            capsules={detailedCapsules}
            rowIndex={0}
            duration={20}
            isDetailed
          />
          <div className="space-y-4">
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
  );
};
