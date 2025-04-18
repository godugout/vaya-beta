
import { useState } from "react";
import { Story } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StoryCard } from "@/components/content/StoryCard";
import { Search, Mic, ArrowUpDown, FileText, AudioLines, Image } from "lucide-react";
import { LoadingIndicator } from "@/components/animation/LoadingIndicator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface StoriesSectionProps {
  stories: Story[];
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const StoriesSection = ({
  stories,
  isLoading,
  searchQuery,
  onSearchChange,
}: StoriesSectionProps) => {
  const [storyTypeFilter, setStoryTypeFilter] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<"newest" | "oldest">("newest");

  // Filter stories by type
  const filteredStories = stories.filter(story => {
    if (storyTypeFilter.length === 0) return true;
    return storyTypeFilter.includes(story.story_type || "");
  });

  // Sort stories
  const sortedStories = [...filteredStories].sort((a, b) => {
    const dateA = new Date(a.created_at || 0).getTime();
    const dateB = new Date(b.created_at || 0).getTime();
    return sortOption === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Recent Family Stories</h2>
            <p className="text-muted-foreground">
              Browse and listen to stories shared by your family members
            </p>
          </div>
          
          <div className="flex items-center w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stories..."
                className="pl-9 pr-4"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <ToggleGroup type="multiple" value={storyTypeFilter} onValueChange={setStoryTypeFilter}>
                <ToggleGroupItem value="audio" aria-label="Audio Stories" className="gap-1">
                  <AudioLines className="h-4 w-4" />
                  <span className="hidden sm:inline">Audio</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="text" aria-label="Text Stories" className="gap-1">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Text</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="photo" aria-label="Photo Stories" className="gap-1">
                  <Image className="h-4 w-4" />
                  <span className="hidden sm:inline">Photos</span>
                </ToggleGroupItem>
              </ToggleGroup>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSortOption(sortOption === "newest" ? "oldest" : "newest")}
                className="gap-1"
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortOption === "newest" ? "Newest First" : "Oldest First"}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingIndicator size="lg" />
          </div>
        ) : sortedStories.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg border border-border">
            <Mic className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No stories found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery 
                ? "No stories match your search criteria" 
                : "Be the first to share a family story"}
            </p>
            <Button variant="autumn">
              <Mic className="mr-2 h-4 w-4" />
              Record Your Story
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedStories.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title || "Untitled Story"}
                content={story.description || ""}
                type={story.story_type as "audio" | "photo" | "transcript" || "text"}
                audioUrl={story.audio_url}
                imageUrl={story.image_url}
                date={story.created_at || new Date().toISOString()}
                author={story.author ? {
                  name: story.author.name || "Unknown",
                  avatar: story.author.avatar_url
                } : undefined}
                isPlaceholder={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
