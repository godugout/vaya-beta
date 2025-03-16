
import React from 'react';
import { Button } from "@/components/ui/button";
import { StoryCard, StoryType } from "@/components/content/StoryCard";
import { FadeIn } from '@/components/animation/FadeIn';

const sampleStories = [
  {
    id: "1",
    title: "My Grandmother's Recipes",
    content: "I remember how she would wake up early to prepare fresh rotis and...",
    type: "audio" as StoryType,
    date: "2024-04-06",
    author: {
      name: "Priya Patel"
    },
    audioUrl: "/audio/sample-story-1.mp3",
    isPlaceholder: true
  },
  {
    id: "2",
    title: "Our First Diwali in America",
    content: "It was difficult finding all the materials for the puja, but we managed to...",
    type: "audio" as StoryType,
    date: "2024-04-02",
    author: {
      name: "Raj Patel"
    },
    audioUrl: "/audio/sample-story-2.mp3",
    isPlaceholder: true
  },
  {
    id: "3",
    title: "Learning to Make Dad's Special Chai",
    content: "The secret was the fresh ginger and cardamom he'd grind himself...",
    type: "audio" as StoryType,
    date: "2024-04-01",
    author: {
      name: "Ananya Patel"
    },
    audioUrl: "/audio/sample-story-3.mp3",
    isPlaceholder: true
  }
];

export const RecentFamilyStories = () => {
  return (
    <FadeIn className="mt-16 mb-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Recent Family Stories</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleStories.map(story => (
          <StoryCard
            key={story.id}
            id={story.id}
            title={story.title}
            content={story.content}
            type={story.type}
            audioUrl={story.audioUrl}
            date={story.date}
            author={story.author}
            isPlaceholder={story.isPlaceholder}
          />
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button className="flex items-center bg-autumn hover:bg-autumn/90 text-white">
          Share a New Story
        </Button>
      </div>
    </FadeIn>
  );
};

export default RecentFamilyStories;
