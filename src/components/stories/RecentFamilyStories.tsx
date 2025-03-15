
import { Button } from "@/components/ui/button";
import { StoryCard } from "@/components/content/StoryCard";
import { ChevronRight, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/animation/PageTransition";
import { FadeIn } from "@/components/animation/FadeIn";
import { StaggeredContainer } from "@/components/animation/StaggeredContainer";

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
            <Button variant="outline" className="flex items-center gap-2">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
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
            />
          ))}
        </StaggeredContainer>
        
        <PageTransition location="share-stories-new-button" mode="fade">
          <div className="mt-10 text-center">
            <Button
              onClick={() => navigate("/share-stories/new")}
              className="bg-lovable-blue hover:bg-lovable-blue-bright flex items-center gap-2"
            >
              <Mic className="h-4 w-4" />
              <span>Share a New Story</span>
            </Button>
          </div>
        </PageTransition>
      </div>
    </div>
  );
};

export default RecentFamilyStories;
