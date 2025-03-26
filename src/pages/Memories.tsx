
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import MemoryGallery from '@/components/memory/MemoryGallery';
import StoryRecorder from '@/components/memory/StoryRecorder';

export default function MemoriesPage() {
  const [activeTab, setActiveTab] = useState<string>("view");
  const [simpleMode, setSimpleMode] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSaveStory = (data: { audio?: Blob; transcript?: string; title?: string }) => {
    // In a real implementation, we would save this data to the database
    console.log('Saving story:', data);
    
    toast({
      title: "Story Saved",
      description: "Your story has been saved and shared with your family!",
    });
    
    // Switch back to view tab
    setActiveTab("view");
  };
  
  const handleRecordStory = () => {
    setActiveTab("record");
  };
  
  const toggleSimpleMode = () => {
    setSimpleMode(!simpleMode);
    
    toast({
      title: simpleMode ? "Standard Mode Activated" : "Simple Mode Activated",
      description: simpleMode 
        ? "Showing standard interface with all features" 
        : "Showing simplified interface for easier navigation",
    });
  };

  return (
    <MainLayout>
      <div className={`container max-w-6xl mx-auto px-4 py-8 ${simpleMode ? 'hanuman-theme simple-mode' : 'hanuman-theme'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Memories</h1>
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-hanuman-primary/10"
            onClick={toggleSimpleMode}
          >
            {simpleMode ? 'Simple Mode: ON' : 'Simple Mode: OFF'}
          </Badge>
        </div>
        
        <Card className="p-4 mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="view" className="flex-1 py-4">
                View Memories
              </TabsTrigger>
              <TabsTrigger value="record" className="flex-1 py-4">
                Record Story
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="view" className="pt-6">
              <MemoryGallery 
                simpleMode={simpleMode} 
                onRecordStory={handleRecordStory} 
              />
            </TabsContent>
            
            <TabsContent value="record" className="pt-6">
              <StoryRecorder 
                onSave={handleSaveStory}
                onCancel={() => setActiveTab("view")}
                initialPrompt="Share a story or memory that's special to you..."
                simpleMode={simpleMode}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
}
