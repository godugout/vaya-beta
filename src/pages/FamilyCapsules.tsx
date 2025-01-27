import React from "react";
import { CapsuleLayout } from "@/components/ui/capsule/CapsuleLayout";
import CreateCapsuleForm from "@/components/capsule/CreateCapsuleForm";
import { Camera, Book, BookOpen, Image, Map, Music2, Users, Heart, Library, Calendar, HeartHandshake, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const capsules = [
  {
    title: "Costa Rican Heritage",
    link: "/capsule/costa-rica",
    icon: Camera,
    colorKey: "Nature Green",
    metadata: {
      creatorInitials: "JD",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      itemCount: 12,
      status: "active" as const,
      date: "Updated today",
    }
  },
  {
    title: "Family Recipes & Traditions",
    link: "/capsule/recipes",
    icon: Book,
    colorKey: "Primary Orange",
    metadata: {
      creatorInitials: "MA",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      itemCount: 8,
      status: "upcoming" as const,
      date: "Opens Dec 25",
    }
  },
  {
    title: "Grandparents' Stories",
    link: "/capsule/grandparents",
    icon: BookOpen,
    colorKey: "Ocean Blue",
    metadata: {
      creatorInitials: "RL",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      itemCount: 15,
      status: "locked" as const,
      date: "Locked until Jan",
    }
  },
  {
    title: "Beach Day Memories",
    link: "/capsule/beach",
    icon: Image,
    colorKey: "Nature Green",
    metadata: {
      creatorInitials: "ES",
      itemCount: 24,
      status: "revealed" as const,
      date: "Opened Nov 1",
    }
  },
  {
    title: "Our Journey Here",
    link: "/capsule/journey",
    icon: Map,
    colorKey: "Ocean Blue",
    metadata: {
      creatorInitials: "JD",
      itemCount: 18,
      status: "active" as const,
      date: "Closes Dec 31",
    }
  },
  {
    title: "Festival Celebrations",
    link: "/capsule/festivals",
    icon: Music2,
    colorKey: "Primary Orange",
  },
  {
    title: "Wildlife Encounters",
    link: "/capsule/wildlife",
    icon: Camera,
    colorKey: "Nature Green",
  },
  {
    title: "Family Reunions",
    link: "/capsule/reunions",
    icon: Users,
    colorKey: "Primary Orange",
  },
  {
    title: "Local Adventures",
    link: "/capsule/adventures",
    icon: Film,
    colorKey: "Nature Green",
  },
  {
    title: "Holiday Traditions",
    link: "/capsule/holidays",
    icon: Heart,
    colorKey: "Primary Orange",
  },
  {
    title: "School Memories",
    link: "/capsule/school",
    icon: Library,
    colorKey: "Ocean Blue",
  },
  {
    title: "Year in Review 2023",
    link: "/capsule/2023",
    icon: Calendar,
    colorKey: "Ocean Blue",
  },
  {
    title: "Wedding Stories",
    link: "/capsule/weddings",
    icon: HeartHandshake,
    colorKey: "Primary Orange",
  },
  {
    title: "Travel Diaries",
    link: "/capsule/travel",
    icon: Film,
    colorKey: "Nature Green",
  },
  {
    title: "Photo Albums",
    link: "/capsule/albums",
    icon: Image,
    colorKey: "Ocean Blue",
  }
];

const FamilyCapsules = () => {
  return (
    <div className="relative min-h-screen">
      <CapsuleLayout capsules={capsules} />
      <div className="fixed bottom-24 md:bottom-8 right-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
              size="lg"
            >
              Create a Capsule <Camera className="ml-2 h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <CreateCapsuleForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FamilyCapsules;
