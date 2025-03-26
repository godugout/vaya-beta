import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mic, Camera, Filter } from 'lucide-react';
import Memory from './Memory';
import { Memory as MemoryType } from '@/components/memory/types';
import { useToast } from "@/components/ui/use-toast";
import { FadeIn } from '@/components/animation/FadeIn';
import { StaggeredContainer } from '@/components/animation/StaggeredContainer';

// Mock data for testing - updated to match our type definitions
const mockMemories: MemoryType[] = [
  {
    id: '1',
    type: 'photo',
    content_url: '/images/memory1.jpg',
    photo_url: '/lovable-uploads/f3f72986-bf8f-4015-a04d-9a35ae90d558.png',
    created_at: '2023-10-15',
    title: 'Family Picnic',
    description: 'Our family picnic at the lake last summer. Everyone had a wonderful time!'
  },
  {
    id: '2',
    type: 'story',
    content_url: '/audio/story1.mp3',
    created_at: '2023-09-22',
    title: 'Grandma\'s Garden Story',
    description: 'Remember when I told you about my favorite flowers in the garden?',
    duration: 120
  },
  {
    id: '3',
    type: 'photo',
    content_url: '/images/memory3.jpg',
    photo_url: '/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png',
    created_at: '2023-08-05',
    title: 'Birthday Celebration',
    description: 'Your 70th birthday party with all the grandchildren present!'
  }
];

interface MemoryGalleryProps {
  simpleMode?: boolean;
  onRecordStory?: () => void;
}

const MemoryGallery = ({ simpleMode = false, onRecordStory }: MemoryGalleryProps) => {
  const [memories, setMemories] = useState<MemoryType[]>(mockMemories);
  const [activeMemoryIndex, setActiveMemoryIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  // In a real implementation, we would fetch memories from an API
  useEffect(() => {
    // Filter memories based on search query
    if (searchQuery.trim() !== '') {
      const filtered = mockMemories.filter(
        memory => 
          memory.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
          memory.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMemories(filtered);
    } else {
      setMemories(mockMemories);
    }
  }, [searchQuery]);
  
  const handleMemorySelect = (index: number) => {
    setActiveMemoryIndex(index);
  };
  
  const handlePrevious = () => {
    if (activeMemoryIndex !== null && activeMemoryIndex > 0) {
      setActiveMemoryIndex(activeMemoryIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (activeMemoryIndex !== null && activeMemoryIndex < memories.length - 1) {
      setActiveMemoryIndex(activeMemoryIndex + 1);
    }
  };
  
  const handleReaction = (memoryId: string, reaction: 'like' | 'heart' | 'confused') => {
    // In a real implementation, we would send this to an API
    console.log(`Memory ${memoryId} reaction: ${reaction}`);
  };
  
  const handleRecordStory = () => {
    if (onRecordStory) {
      onRecordStory();
    } else {
      toast({
        title: "Record a Story",
        description: "This feature is coming soon!"
      });
    }
  };
  
  const handleRecordMemoryResponse = (memoryId: string) => {
    // In a real implementation, we would navigate to a recording screen
    toast({
      title: "Record Your Story",
      description: "Let's capture your memories about this photo!",
    });
    
    if (onRecordStory) {
      onRecordStory();
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Search and Actions Bar */}
      <div className={`flex flex-col sm:flex-row gap-4 ${simpleMode ? 'mb-8' : ''}`}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="default" 
            className="flex-1 sm:flex-none bg-hanuman-primary hover:bg-hanuman-primary/90"
            onClick={handleRecordStory}
          >
            <Mic className="h-5 w-5 mr-2" />
            Record Story
          </Button>
          
          {!simpleMode && (
            <Button variant="outline">
              <Filter className="h-5 w-5" />
              <span className="sr-only">Filter</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Active Memory View */}
      {activeMemoryIndex !== null && (
        <FadeIn>
          <Memory 
            memory={memories[activeMemoryIndex]} 
            onPrevious={activeMemoryIndex > 0 ? handlePrevious : undefined}
            onNext={activeMemoryIndex < memories.length - 1 ? handleNext : undefined}
            onReaction={handleReaction}
            onRecord={handleRecordMemoryResponse}
            simpleMode={simpleMode}
          />
          
          <Button 
            variant="ghost" 
            className="mt-4"
            onClick={() => setActiveMemoryIndex(null)}
          >
            View All Memories
          </Button>
        </FadeIn>
      )}
      
      {/* Memory Grid */}
      {activeMemoryIndex === null && (
        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, index) => (
            <div 
              key={memory.id} 
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => handleMemorySelect(index)}
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative mb-2">
                {memory.type === 'photo' && memory.photo_url && (
                  <img 
                    src={memory.photo_url} 
                    alt={memory.title || 'Memory'} 
                    className="w-full h-full object-cover"
                  />
                )}
                
                {memory.type === 'story' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-hanuman-primary/20">
                    <div className="rounded-full bg-white/20 backdrop-blur-sm p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <h3 className="font-medium text-lg truncate">{memory.title || 'Untitled Memory'}</h3>
              {memory.description && (
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm">{memory.description}</p>
              )}
            </div>
          ))}
        </StaggeredContainer>
      )}
      
      {/* Empty State */}
      {memories.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
            <Camera className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No memories found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchQuery ? 'Try a different search term' : 'Start by adding some memories'}
          </p>
          <Button 
            variant="default"
            className="bg-hanuman-primary hover:bg-hanuman-primary/90"
            onClick={handleRecordStory}
          >
            <Mic className="h-5 w-5 mr-2" />
            Record a Story
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemoryGallery;
