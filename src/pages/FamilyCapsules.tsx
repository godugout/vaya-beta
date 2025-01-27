import React from "react";
import { CapsuleLayout } from "@/components/ui/capsule/CapsuleLayout";
import CreateCapsuleForm from "@/components/capsule/CreateCapsuleForm";
import { PlusCircle, Leaf, Book, BookOpen, Image, Map, Music2, Camera, Users, Heart, Library, Calendar, HeartHandshake, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

// Map capsule categories to prompt topics and their colors
const capsules = [
  {
    title: "Costa Rican Heritage",
    link: "/capsule/costa-rica",
    icon: Leaf,
    colorKey: "Nature Green", // Maps to Cultural Heritage category
  },
  {
    title: "Family Recipes & Traditions",
    link: "/capsule/recipes",
    icon: Book,
    colorKey: "Primary Orange", // Maps to Family Traditions category
  },
  {
    title: "Grandparents' Stories",
    link: "/capsule/grandparents",
    icon: BookOpen,
    colorKey: "Ocean Blue", // Maps to Life Stories category
  },
  {
    title: "Beach Day Memories",
    link: "/capsule/beach",
    icon: Image,
    colorKey: "Nature Green",
  },
  {
    title: "Our Journey Here",
    link: "/capsule/journey",
    icon: Map,
    colorKey: "Ocean Blue",
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
      <div className="fixed bottom-8 right-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
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