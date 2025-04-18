
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemoryFeedLayout from "@/components/memory/MemoryFeedLayout";
import FamilyMemoryGallery from "@/components/memory/FamilyMemoryGallery";
import FamilyStoriesSection from "@/components/stories/FamilyStoriesSection";
import { Message } from "@/components/chat/types";
import { Memory } from "./types";

interface MemoryTabsProps {
  activeTab: 'feed' | 'gallery' | 'stories';
  onTabChange: (value: 'feed' | 'gallery' | 'stories') => void;
  memories: Memory[];
  chatMessages: Message[];
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const MemoryTabs = ({
  activeTab,
  onTabChange,
  memories,
  chatMessages,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: MemoryTabsProps) => {
  return (
    <>
      <Tabs 
        defaultValue="feed" 
        value={activeTab} 
        onValueChange={(value) => onTabChange(value as 'feed' | 'gallery' | 'stories')}
        className="mb-6"
      >
        <TabsList>
          <TabsTrigger value="feed">Timeline</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {activeTab === 'feed' && (
        <MemoryFeedLayout 
          memories={memories}
          chatMessages={chatMessages}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
      
      {activeTab === 'gallery' && (
        <FamilyMemoryGallery />
      )}
      
      {activeTab === 'stories' && (
        <FamilyStoriesSection limit={9} />
      )}
    </>
  );
};

export default MemoryTabs;
