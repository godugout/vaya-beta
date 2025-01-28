import { Camera, Users, Heart, Music, Book, Calendar, MapPin, Image as ImageIcon, GraduationCap, MessageCircle, HelpCircle, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { CapsuleRow } from "./layout/CapsuleRow";
import { Capsule } from "@/types/capsule";

const detailedCapsules: Capsule[] = [
  {
    title: "Beach Day Memories",
    description: "Summer family beach trip collection",
    icon: Camera,
    colorKey: "memories",
    prompts: [],
    metadata: {
      creatorInitials: "ES",
      itemCount: 24,
      status: "active",
      date: "2024-11-01"
    }
  },
  {
    title: "Share Your Story",
    description: "Join the conversation",
    icon: MessageCircle,
    colorKey: "stories",
    backgroundImage: "/lovable-uploads/family-dinner.jpg",
    prompts: ["Let's Connect"],
    metadata: {
      creatorInitials: "JD",
      itemCount: 18,
      status: "upcoming",
      date: "2024-12-31"
    }
  },
  {
    title: "Costa Rican Heritage",
    description: "Cultural traditions and stories",
    icon: Heart,
    colorKey: "capsules",
    prompts: [],
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
    title: "Share Ideas",
    icon: Lightbulb,
    colorKey: "memories",
    prompts: ["Got a bright idea?"],
    isPlaceholder: true
  },
  {
    title: "Ask Questions",
    icon: HelpCircle,
    colorKey: "stories",
    backgroundImage: "/lovable-uploads/family-gathering.jpg",
    prompts: ["Join Us"],
    isPlaceholder: true
  },
  {
    title: "Start Talking",
    icon: MessageCircle,
    colorKey: "capsules",
    prompts: ["Share your voice"],
    isPlaceholder: true
  },
  {
    title: "Got Questions?",
    icon: HelpCircle,
    colorKey: "memories",
    prompts: ["We're here to help"],
    isPlaceholder: true
  },
  {
    title: "Share Stories",
    icon: MessageCircle,
    colorKey: "stories",
    backgroundImage: "/lovable-uploads/family-picnic.jpg",
    prompts: ["Connect Now"],
    isPlaceholder: true
  },
  {
    title: "New Ideas",
    icon: Lightbulb,
    colorKey: "capsules",
    prompts: ["Light the way"],
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