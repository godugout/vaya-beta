import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

const capsules = [
  {
    title: "Summer Memories 2023",
    link: "/capsule/summer-2023",
    thumbnail: "/lovable-uploads/33c609d9-9189-49d2-b9c1-106d8257557c.png",
  },
  {
    title: "Family Reunion",
    link: "/capsule/reunion",
    thumbnail: "/lovable-uploads/4425ec86-56fe-44c4-9f47-75e59d3cb287.png",
  },
  {
    title: "Grandma's Stories",
    link: "/capsule/grandma",
    thumbnail: "/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png",
  },
  // Add more capsules to fill the rows
  // ... Repeat similar objects to have at least 15 items
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