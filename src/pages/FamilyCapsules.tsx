import React from "react";
import { CapsuleLayout } from "@/components/ui/capsule/CapsuleLayout";
import CreateCapsuleForm from "@/components/capsule/CreateCapsuleForm";
import { PlusCircle, Leaf, Book, BookOpen, Image, Map, Music2, Camera, Users, Video, Heart, Library, Calendar, HeartHandshake, Film, ImageIcon } from "lucide-react";
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
    icon: Leaf, // Replaced Palmtree with Leaf
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
    icon: Music2, // Replaced Music with Music2
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
    icon: HeartHandshake, // Replaced HeartPulse with HeartHandshake
  },
  {
    title: "Travel Diaries",
    link: "/capsule/travel",
    icon: Film,
  },
  {
    title: "Photo Albums",
    link: "/capsule/albums",
    icon: Image, // Replaced ImageIcon with Image since ImageIcon isn't available
  }
];

const FamilyCapsules = () => {
  return (
    <div className="relative min-h-screen">
      <CapsuleLayout capsules={capsules} />
      <div className="fixed bottom-8 right-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="bg-vaya-secondary hover:bg-vaya-secondary/90 text-white shadow-lg"
              size="lg"
            >
              <PlusCircle className="mr-2" />
              Create a Capsule
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