
import { CapsuleScrollSection } from "@/components/capsule/sections/CapsuleScrollSection";
import { CapsuleStatus } from "@/types/capsule";
import { Calendar, Gift, Heart, Music, Star } from "lucide-react";

// Patel family cultural events data
const patelFamilyEvents = [
  {
    id: "capsule-1",
    title: "Diwali Celebration",
    description: "Annual family gathering for Diwali festival of lights",
    colorKey: "memories",
    icon: Gift,
    metadata: {
      creatorInitials: "NP",
      itemCount: 24,
      status: "upcoming" as CapsuleStatus,
      date: "2024-10-31"
    }
  },
  {
    id: "capsule-2",
    title: "Navratri Garba Night",
    description: "Family dance celebration during Navratri",
    colorKey: "stories",
    icon: Music,
    metadata: {
      creatorInitials: "RP",
      itemCount: 18,
      status: "active" as CapsuleStatus,
      date: "2024-10-03"
    }
  },
  {
    id: "capsule-3",
    title: "Riya's Graduation",
    description: "Celebrating Riya's medical school graduation",
    colorKey: "capsules",
    icon: Star,
    metadata: {
      creatorInitials: "AP",
      itemCount: 12,
      status: "upcoming" as CapsuleStatus,
      date: "2025-05-15"
    }
  },
  {
    id: "capsule-4",
    title: "Amit & Priya's Wedding",
    description: "Family wedding celebration memories",
    colorKey: "memories",
    icon: Heart,
    metadata: {
      creatorInitials: "MP",
      itemCount: 32,
      status: "locked" as CapsuleStatus,
      date: "2024-12-12"
    }
  },
  {
    id: "capsule-5",
    title: "Raksha Bandhan",
    description: "Brother-sister bond celebration",
    colorKey: "stories",
    icon: Calendar,
    metadata: {
      creatorInitials: "SP",
      itemCount: 8,
      status: "upcoming" as CapsuleStatus,
      date: "2024-08-19"
    }
  }
];

interface PatelFamilyEventsSectionProps {
  className?: string;
}

const PatelFamilyEventsSection = ({ className }: PatelFamilyEventsSectionProps) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Patel Family Events & Celebrations
      </h2>
      <CapsuleScrollSection capsules={patelFamilyEvents} />
    </div>
  );
};

export default PatelFamilyEventsSection;
