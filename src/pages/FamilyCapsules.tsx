import React from "react";
import { CapsuleLayout } from "@/components/ui/capsule/CapsuleLayout";
import { 
  Users, 
  Heart, 
  Camera, 
  BookOpen, 
  Image, 
  Video,
  Library,
  Calendar,
  HeartPulse,
  Book,
  Film,
  ImageIcon,
  Palmtree,
  Map,
  Music
} from "lucide-react";

const capsules = [
  {
    title: "Costa Rican Heritage",
    link: "/capsule/costa-rica",
    icon: Palmtree,
  },
  {
    title: "Family Recipes & Traditions",
    link: "/capsule/recipes",
    icon: Book,
  },
  {
    title: "Grandparents' Stories",
    link: "/capsule/grandparents",
    icon: BookOpen,
  },
  {
    title: "Beach Day Memories",
    link: "/capsule/beach",
    icon: Image,
  },
  {
    title: "Our Journey Here",
    link: "/capsule/journey",
    icon: Map,
  },
  {
    title: "Festival Celebrations",
    link: "/capsule/festivals",
    icon: Music,
  },
  {
    title: "Wildlife Encounters",
    link: "/capsule/wildlife",
    icon: Camera,
  },
  {
    title: "Family Reunions",
    link: "/capsule/reunions",
    icon: Users,
  },
  {
    title: "Local Adventures",
    link: "/capsule/adventures",
    icon: Video,
  },
  {
    title: "Holiday Traditions",
    link: "/capsule/holidays",
    icon: Heart,
  },
  {
    title: "School Memories",
    link: "/capsule/school",
    icon: Library,
  },
  {
    title: "Year in Review 2023",
    link: "/capsule/2023",
    icon: Calendar,
  },
  {
    title: "Wedding Stories",
    link: "/capsule/weddings",
    icon: HeartPulse,
  },
  {
    title: "Travel Diaries",
    link: "/capsule/travel",
    icon: Film,
  },
  {
    title: "Photo Albums",
    link: "/capsule/albums",
    icon: ImageIcon,
  }
];

const FamilyCapsules = () => {
  return <CapsuleLayout capsules={capsules} />;
};

export default FamilyCapsules;