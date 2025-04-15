
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FamilyTreeMain } from "@/components/family/FamilyTreeMain";
import { FamilyMemberDetailCard } from "@/components/family/FamilyMemberDetailCard";
import { MemoryCapsuleCreator } from "@/components/capsule/MemoryCapsuleCreator";
import { MemoryCapsuleTimeline } from "@/components/capsule/MemoryCapsuleTimeline";
import { NarraConversation } from "@/components/narra/NarraConversation";

const ComponentsDemo = () => {
  const [activeTab, setActiveTab] = useState("family-tree");

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Vaya Component Demo</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-3xl mx-auto">
          <TabsTrigger value="family-tree">Family Tree</TabsTrigger>
          <TabsTrigger value="memory-capsules">Memory Capsules</TabsTrigger>
          <TabsTrigger value="narra-assistant">Narra Assistant</TabsTrigger>
        </TabsList>
        
        <TabsContent value="family-tree" className="space-y-8">
          <h2 className="text-2xl font-semibold">Family Tree Components</h2>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Family Tree Visualization</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Interactive family tree with relationship visualization, zooming, and editing capabilities.
            </p>
            <div className="h-[600px]">
              <FamilyTreeMain />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Family Member Detail Card</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Detailed card showing family member information and story progress.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FamilyMemberDetailCard 
                id="1"
                name="Grandma Rose"
                relationship="Grandmother"
                storyCount={8}
                totalStoryGoal={10}
                lastStoryDate="July 15, 2023"
                upcomingEvent={{
                  title: "Birthday Celebration",
                  date: "October 12, 2023"
                }}
                onMessageClick={() => {}}
                onCallClick={() => {}}
                onViewStories={() => {}}
              />
              
              <FamilyMemberDetailCard 
                id="2"
                name="Uncle Mike"
                relationship="Uncle"
                storyCount={3}
                totalStoryGoal={10}
                lastStoryDate="March 5, 2023"
                onMessageClick={() => {}}
                onCallClick={() => {}}
                onViewStories={() => {}}
              />
              
              <FamilyMemberDetailCard 
                id="3"
                name="Cousin Emma"
                relationship="Cousin"
                storyCount={5}
                totalStoryGoal={10}
                onMessageClick={() => {}}
                onCallClick={() => {}}
                onViewStories={() => {}}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="memory-capsules" className="space-y-8">
          <h2 className="text-2xl font-semibold">Memory Capsule Components</h2>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Memory Capsule Creator</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Interface for creating and configuring memory time capsules.
            </p>
            <MemoryCapsuleCreator onComplete={(data) => console.log(data)} />
          </div>
          
          <div className="space-y-2 mt-12">
            <h3 className="text-xl font-medium">Memory Capsule Timeline</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Timeline view of memory capsules organized by reveal date.
            </p>
            <MemoryCapsuleTimeline 
              onViewCapsule={(id) => console.log(`View capsule ${id}`)}
              onCreateCapsule={() => console.log("Create new capsule")}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="narra-assistant" className="space-y-8">
          <h2 className="text-2xl font-semibold">Narra AI Assistant</h2>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Narra Conversational Interface</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Interactive chat interface with Narra, the AI storytelling assistant.
            </p>
            <div className="border rounded-lg shadow-sm overflow-hidden h-[800px] max-w-4xl mx-auto">
              <NarraConversation />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComponentsDemo;
