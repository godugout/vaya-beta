
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Mic, Camera, ChevronRight, Calendar, Gift, Heart, Music, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import NarraChat from "@/components/NarraChat";
import { StoryCard } from "@/components/content/StoryCard";
import { heroConfigs } from "@/config/heroConfigs";
import { CapsuleScrollSection } from "@/components/capsule/sections/CapsuleScrollSection";
import { detailedCapsules } from "@/components/capsule/ExampleCapsules";

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
      status: "upcoming",
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
      status: "active",
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
      status: "upcoming",
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
      status: "locked",
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
      status: "upcoming",
      date: "2024-08-19"
    }
  }
];

// Example stories data
const exampleStories = [
  {
    id: "story-1",
    title: "My Grandmother's Recipes",
    content: "I remember how she would wake up early to prepare fresh rotis and sabzi...",
    type: "audio" as const,
    audioUrl: "/lovable-uploads/example-audio.mp3",
    date: "2024-06-10",
    author: { name: "Anita Patel" }
  },
  {
    id: "story-2",
    title: "Our First Diwali in America",
    content: "It was difficult finding all the materials for the puja, but we managed to...",
    type: "transcript" as const,
    date: "2024-05-22",
    author: { name: "Rajesh Patel" }
  },
  {
    id: "story-3",
    title: "Family Trip to Gujarat",
    content: "Visiting our ancestral village after 15 years was emotional...",
    type: "photo" as const,
    imageUrl: "/lovable-uploads/family-gathering.jpg",
    date: "2024-04-15",
    author: { name: "Meera Patel" }
  },
  {
    id: "story-4",
    title: "Learning to Make Dad's Special Chai",
    content: "The secret was the fresh ginger and cardamom he'd grind himself...",
    type: "audio" as const,
    audioUrl: "/lovable-uploads/example-audio.mp3",
    date: "2024-03-30",
    author: { name: "Kiran Patel" }
  }
];

const ShareStories = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<"record" | "chat">("record");
  const [heroConfig] = useState(heroConfigs["/share-stories"]);
  
  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    console.log("Memory saved:", data);
    // Here you would typically do something with the saved memory
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Patel Family Capsules */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {heroConfig.title_en}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {heroConfig.subtitle_en}
            </p>
          </div>
          
          {/* Patel Family Capsules Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Patel Family Events & Celebrations
            </h2>
            <CapsuleScrollSection capsules={patelFamilyEvents} />
          </div>
        </div>
      </div>
      
      {/* Dual Pane Recording & Chat Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Pane: Voice Recording Experience */}
          <div>
            <Card className="shadow-md border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Record Your Family Stories
                </h2>
                <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
              </CardContent>
            </Card>
          </div>
          
          {/* Right Pane: Narra Chat */}
          <div>
            <Card className="shadow-md border-gray-200 h-full">
              <CardContent className="p-0 h-full">
                <NarraChat />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Stories Grid Section */}
      <div className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Recent Family Stories
            </h2>
            <Button variant="outline" className="flex items-center gap-2">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exampleStories.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                content={story.content}
                type={story.type}
                audioUrl={story.audioUrl}
                imageUrl={story.imageUrl}
                date={story.date}
                author={story.author}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button
              onClick={() => navigate("/share-stories/new")}
              className="bg-lovable-blue hover:bg-lovable-blue-bright flex items-center gap-2"
            >
              <Mic className="h-4 w-4" />
              <span>Share a New Story</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareStories;
