import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
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
  ImageIcon
} from "lucide-react";

const capsules = [
  {
    title: "Summer Memories 2023",
    link: "/capsule/summer-2023",
    icon: ImageIcon,
  },
  {
    title: "Family Reunion",
    link: "/capsule/reunion",
    icon: Users,
  },
  {
    title: "Grandma's Stories",
    link: "/capsule/grandma",
    icon: BookOpen,
  },
  {
    title: "Holiday Collection",
    link: "/capsule/holidays",
    icon: Heart,
  },
  {
    title: "Wedding Day",
    link: "/capsule/wedding",
    icon: HeartPulse,
  },
  {
    title: "Baby's First Year",
    link: "/capsule/baby",
    icon: Calendar,
  },
  {
    title: "Family Recipes",
    link: "/capsule/recipes",
    icon: Book,
  },
  {
    title: "Vacation Adventures",
    link: "/capsule/vacation",
    icon: Camera,
  },
  {
    title: "School Memories",
    link: "/capsule/school",
    icon: Library,
  },
  {
    title: "Family Videos",
    link: "/capsule/videos",
    icon: Video,
  },
  {
    title: "Heritage Album",
    link: "/capsule/heritage",
    icon: Image,
  },
  {
    title: "Birthday Celebrations",
    link: "/capsule/birthdays",
    icon: Heart,
  },
  {
    title: "Family Movies",
    link: "/capsule/movies",
    icon: Film,
  },
  {
    title: "Legacy Stories",
    link: "/capsule/legacy",
    icon: BookOpen,
  },
  {
    title: "Family Traditions",
    link: "/capsule/traditions",
    icon: Users,
  }
];

const FamilyCapsules = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      <div className="absolute top-0 left-0 w-full">
        <HeroParallax products={capsules} />
      </div>
    </div>
  );
};

export default FamilyCapsules;