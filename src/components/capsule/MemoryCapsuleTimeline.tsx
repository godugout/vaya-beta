
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Lock, 
  Unlock, 
  Calendar, 
  Clock, 
  Users, 
  Image, 
  FileText, 
  Mic, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Hourglass
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Example capsule data type
interface MemoryCapsule {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  revealDate: string;
  status: "locked" | "unlocked";
  contributors: Array<{
    name: string;
    avatar?: string;
  }>;
  contentType: "text" | "image" | "audio" | "mixed";
  contentCount: number;
}

interface MemoryCapsuleTimelineProps {
  capsules?: MemoryCapsule[];
  onViewCapsule?: (id: string) => void;
  onCreateCapsule?: () => void;
}

export const MemoryCapsuleTimeline = ({ 
  capsules = [], 
  onViewCapsule,
  onCreateCapsule
}: MemoryCapsuleTimelineProps) => {
  const [timeView, setTimeView] = useState<"upcoming" | "past" | "all">("all");
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  
  // Example data if none provided
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

  const getStatusColor = (status: string) => {
    return status === "unlocked" ? "bg-green-500" : "bg-amber-500";
  };
  
  const getContentTypeIcon = (type: string) => {
    switch(type) {
      case "text":
        return <FileText className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      case "audio":
        return <Mic className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };
  
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
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentYear(currentYear - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm font-medium w-16 text-center">{currentYear}</span>
            
            <Button variant="outline" size="icon" onClick={() => setCurrentYear(currentYear + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-6 relative border-l-2 border-dashed border-gray-300 dark:border-gray-700 pl-6 ml-6">
          {yearFilteredCapsules.length === 0 ? (
            <div className="py-12 text-center">
              <Hourglass className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-1">No capsules found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No memory capsules {timeView === "upcoming" ? "scheduled to reveal" : timeView === "past" ? "revealed" : ""} in {currentYear}.
              </p>
              <Button variant="outline" onClick={onCreateCapsule}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Capsule
              </Button>
            </div>
          ) : (
            <div className="space-y-10">
              {yearFilteredCapsules.map((capsule) => {
                const revealDate = new Date(capsule.revealDate);
                const createdDate = new Date(capsule.createdAt);
                
                return (
                  <div key={capsule.id} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-9 top-4 h-5 w-5 rounded-full bg-lovable-blue border-4 border-white dark:border-gray-900"></div>
                    
                    {/* Date label */}
                    <div className="absolute -left-40 top-4 w-28 text-right">
                      <p className="font-medium">{revealDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      <p className="text-xs text-gray-500">{revealDate.toLocaleDateString('en-US', { year: 'numeric' })}</p>
                    </div>
                    
                    <Card className="hover:shadow-md transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Package className={`h-5 w-5 ${capsule.status === "unlocked" ? "text-green-500" : "text-amber-500"}`} />
                                <h3 className="font-medium text-lg">{capsule.title}</h3>
                              </div>
                              
                              {capsule.description && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{capsule.description}</p>
                              )}
                            </div>
                            
                            <Badge className={`${getStatusColor(capsule.status)} text-white`}>
                              {capsule.status === "unlocked" ? (
                                <><Unlock className="h-3 w-3 mr-1" /> Unlocked</>
                              ) : (
                                <><Lock className="h-3 w-3 mr-1" /> Locked</>
                              )}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>Created: {createdDate.toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>
                                {revealDate > new Date() 
                                  ? `Unlocks in ${Math.ceil((revealDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days`
                                  : `Unlocked ${Math.floor((Date.now() - revealDate.getTime()) / (1000 * 60 * 60 * 24))} days ago`
                                }
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>{capsule.contributors.length} contributors</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getContentTypeIcon(capsule.contentType)}
                              <span className="text-sm font-medium capitalize">{capsule.contentType}</span>
                              <Badge variant="outline" className="ml-2">
                                {capsule.contentCount} items
                              </Badge>
                            </div>
                            
                            <Button 
                              variant={capsule.status === "unlocked" ? "default" : "outline"}
                              size="sm"
                              onClick={() => onViewCapsule && onViewCapsule(capsule.id)}
                            >
                              {capsule.status === "unlocked" ? "View Contents" : "View Details"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};
