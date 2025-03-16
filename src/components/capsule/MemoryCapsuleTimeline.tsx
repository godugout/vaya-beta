
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { YearNavigation } from "./timeline/YearNavigation";
import { TimelineContent } from "./timeline/TimelineContent";
import { MemoryCapsuleTimelineProps, MemoryCapsule } from "./types/capsuleTypes";

// Example data for when no capsules are provided
const exampleCapsules: MemoryCapsule[] = [
  {
    id: "1",
    title: "Family Reunion 2023",
    description: "Memories from our summer family reunion",
    createdAt: "2023-07-15T00:00:00.000Z",
    revealDate: "2024-07-15T00:00:00.000Z",
    status: "locked",
    contributors: [
      { name: "John Doe" },
      { name: "Jane Doe" },
      { name: "Emily Smith" }
    ],
    contentType: "mixed",
    contentCount: 12
  },
  {
    id: "2",
    title: "Graduation Memories",
    description: "Messages for the graduate to read after college",
    createdAt: "2023-05-20T00:00:00.000Z",
    revealDate: "2027-05-20T00:00:00.000Z",
    status: "locked",
    contributors: [
      { name: "John Doe" },
      { name: "Mary Johnson" }
    ],
    contentType: "text",
    contentCount: 8
  },
  {
    id: "3",
    title: "Wedding Time Capsule",
    createdAt: "2020-09-12T00:00:00.000Z",
    revealDate: "2022-09-12T00:00:00.000Z",
    status: "unlocked",
    contributors: [
      { name: "John Doe" },
      { name: "Jane Doe" }
    ],
    contentType: "image",
    contentCount: 45
  }
];

export const MemoryCapsuleTimeline = ({ 
  capsules = [], 
  onViewCapsule,
  onCreateCapsule
}: MemoryCapsuleTimelineProps) => {
  const [timeView, setTimeView] = useState<"upcoming" | "past" | "all">("all");
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  
  const displayCapsules = capsules.length > 0 ? capsules : exampleCapsules;
  
  // Filter capsules based on selected view
  const filteredCapsules = displayCapsules.filter(capsule => {
    const revealDate = new Date(capsule.revealDate);
    const now = new Date();
    
    if (timeView === "upcoming") {
      return revealDate > now;
    } else if (timeView === "past") {
      return revealDate <= now;
    }
    
    return true;
  });
  
  // Filter capsules based on the current year
  const yearFilteredCapsules = filteredCapsules.filter(capsule => {
    const revealDate = new Date(capsule.revealDate);
    return revealDate.getFullYear() === currentYear;
  });
  
  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Memory Capsules Timeline</h2>
          <p className="text-gray-500 dark:text-gray-400">
            View your memory capsules organized by reveal date
          </p>
        </div>
        
        <Button onClick={onCreateCapsule}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Capsule
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={timeView} onValueChange={(v) => setTimeView(v as any)}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Capsules</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <YearNavigation
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
          />
        </div>
        
        <TimelineContent
          yearFilteredCapsules={yearFilteredCapsules}
          timeView={timeView}
          currentYear={currentYear}
          onCreateCapsule={onCreateCapsule}
          onViewCapsule={onViewCapsule}
        />
      </Tabs>
    </div>
  );
};
