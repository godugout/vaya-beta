
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, BookOpen, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { StoryGallery } from '@/components/stories/StoryGallery';
import { StoryEditor } from '@/components/stories/StoryEditor';
import { UserStory } from '@/services/storyService';

export function StoriesPage() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('my-stories');
  const [editingStory, setEditingStory] = useState<UserStory | undefined>(undefined);
  
  const handleCreateStory = () => {
    setEditingStory(undefined);
    setIsEditorOpen(true);
  };
  
  const handleEditStory = (story: UserStory) => {
    setEditingStory(story);
    setIsEditorOpen(true);
  };
  
  const handleSaveStory = () => {
    setIsEditorOpen(false);
    // Refresh stories list would be handled by useEffect in StoryGallery
  };
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Stories</h1>
        <Button onClick={handleCreateStory}>
          <Plus className="h-4 w-4 mr-2" />
          Create Story
        </Button>
      </div>
      
      <Tabs 
        defaultValue="my-stories" 
        value={currentTab}
        onValueChange={setCurrentTab}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="my-stories" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            My Stories
          </TabsTrigger>
          <TabsTrigger value="shared-stories" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Shared Stories
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-stories" className="space-y-6">
          <StoryGallery />
        </TabsContent>
        
        <TabsContent value="shared-stories" className="space-y-6">
          {/* This would be a variant of StoryGallery showing public stories */}
          <div className="text-center p-8 border border-dashed rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Coming soon</h3>
            <p className="text-sm text-gray-500">
              Public story sharing will be available in a future update.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingStory ? 'Edit Story' : 'Create New Story'}
            </DialogTitle>
            <DialogDescription>
              {editingStory 
                ? 'Make changes to your story.'
                : 'Add a new story to your collection.'}
            </DialogDescription>
          </DialogHeader>
          
          <StoryEditor 
            story={editingStory}
            onSave={handleSaveStory}
            onCancel={() => setIsEditorOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StoriesPage;
