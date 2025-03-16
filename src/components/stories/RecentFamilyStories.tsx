
import { Button } from "@/components/ui/button";
import { StoryCard } from "@/components/content/StoryCard";
import { ChevronRight, Mic, Music, FileText, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/animation/PageTransition";
import { FadeIn } from "@/components/animation/FadeIn";
import { StaggeredContainer } from "@/components/animation/StaggeredContainer";
import { Badge } from "@/components/ui/badge";

// Example stories data with improved content
const exampleStories = [
  {
    id: "story-1",
    title: "My Grandmother's Secret Recipes",
    content: "I remember how my grandmother would wake up early to prepare fresh rotis and sabzi. Her kitchen always smelled of cardamom and cumin. Here she shares the family recipe that's been passed down for generations.",
    type: "audio" as const,
    audioUrl: "/lovable-uploads/example-audio.mp3",
    date: "2024-06-10",
    author: { name: "Anita Patel" }
  },
  {
    id: "story-2",
    title: "Our First Diwali in America",
    content: "It was difficult finding all the materials for the puja, but we managed to create beautiful rangoli and light diyas around our new home. The neighbors were so curious and supportive!",
    type: "transcript" as const,
    date: "2024-05-22",
    author: { name: "Rajesh Patel" }
  },
  {
    id: "story-3",
    title: "Family Trip to Gujarat",
    content: "Visiting our ancestral village after 15 years was emotional and eye-opening. The children got to see where their grandparents grew up and connect with distant relatives.",
    type: "photo" as const,
    imageUrl: "/lovable-uploads/family-gathering.jpg",
    date: "2024-04-15",
    author: { name: "Meera Patel" }
  },
  {
    id: "story-4",
    title: "Learning to Make Dad's Special Chai",
    content: "The secret was the fresh ginger and cardamom he'd grind himself. After years of watching him, I finally learned how to make it just right. Now I continue this morning ritual with my own children.",
    type: "audio" as const,
    audioUrl: "/lovable-uploads/example-audio.mp3",
    date: "2024-03-30",
    author: { name: "Kiran Patel" }
  }
];

const getStoryTypeIcon = (type: string) => {
  switch (type) {
    case 'audio':
      return <Music className="h-4 w-4" />;
    case 'transcript':
      return <FileText className="h-4 w-4" />;
    case 'photo':
      return <ImageIcon className="h-4 w-4" />;
    default:
      return <Mic className="h-4 w-4" />;
  }
};

const RecentFamilyStories = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Recent Family Stories
            </h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-gray-100">
                Demo Content
              </Badge>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate("/memory-lane")}>
                <span>View All</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </FadeIn>
        
        <StaggeredContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              isPlaceholder={true}
            />
          ))}
        </StaggeredContainer>
        
        <PageTransition location="share-stories-new-button" mode="fade">
          <div className="mt-10 text-center">
            <Button
              onClick={() => navigate("/memory-lane")}
              className="bg-lovable-blue hover:bg-lovable-blue-bright flex items-center gap-2"
            >
              <Mic className="h-4 w-4" />
              <span>Share a New Story</span>
            </Button>
          </div>
        </PageTransition>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {getStoryTypeIcon('audio')}
              <h3 className="font-medium">Audio Stories</h3>
            </div>
            <p className="text-sm text-gray-600">
              Record your voice to capture stories with emotion and personality.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {getStoryTypeIcon('transcript')}
              <h3 className="font-medium">Written Stories</h3>
            </div>
            <p className="text-sm text-gray-600">
              Type detailed memories that can be easily searched and referenced.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {getStoryTypeIcon('photo')}
              <h3 className="font-medium">Photo Stories</h3>
            </div>
            <p className="text-sm text-gray-600">
              Attach images to your stories to bring visual context to memories.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentFamilyStories;
