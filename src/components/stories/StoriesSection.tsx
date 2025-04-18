
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LoadingIndicator } from "@/components/animation/LoadingIndicator";
import { StaggeredContainer } from "@/components/animation/StaggeredContainer";
import FamilyStoryCard from "@/components/stories/FamilyStoryCard";
import { type Story } from "@/components/stories/types";

interface StoriesSectionProps {
  stories: Story[];
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const StoriesSection = ({ 
  stories, 
  isLoading, 
  searchQuery, 
  onSearchChange 
}: StoriesSectionProps) => {
  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Family Stories</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search stories..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingIndicator size="lg" />
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchQuery ? "No stories found matching your search" : "No stories available yet. Share your first story!"}
            </p>
          </div>
        ) : (
          <StaggeredContainer animation="fade" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.slice(0, 6).map((story) => (
              <FamilyStoryCard 
                key={story.id}
                title={story.title}
                description={story.description || ""}
                author={story.author_id || "Family Member"}
                audioUrl={story.audio_url}
                storyId={story.id}
              />
            ))}
          </StaggeredContainer>
        )}
      </div>
    </div>
  );
};
