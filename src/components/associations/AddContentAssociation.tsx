
import { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContentType, RelationshipType } from './types';
import { useContentAssociations } from './useContentAssociations';
import { Plus } from "lucide-react";
import { useCapsules } from "@/components/capsule/useCapsules";
import { useStories } from "@/components/stories/useStories";

interface AddContentAssociationProps {
  sourceType: ContentType;
  sourceId: string;
  sourceTitle: string;
  buttonVariant?: "default" | "outline" | "ghost";
  buttonLabel?: string;
}

export const AddContentAssociation = ({
  sourceType,
  sourceId,
  sourceTitle,
  buttonVariant = "outline",
  buttonLabel = "Add Related Content"
}: AddContentAssociationProps) => {
  const [open, setOpen] = useState(false);
  const [targetType, setTargetType] = useState<ContentType>('capsule');
  const [targetId, setTargetId] = useState('');
  const [relationshipType, setRelationshipType] = useState<RelationshipType>('related');
  const [customRelationship, setCustomRelationship] = useState('');
  
  const { createAssociation } = useContentAssociations();
  
  // Fetch content options based on target type
  const { data: capsulesData } = useCapsules();
  const { data: storiesData } = useStories();
  
  const capsules = capsulesData?.pages.flatMap(page => page.capsules) || [];
  const stories = storiesData?.pages.flatMap(page => page.stories) || [];

  const getTargetOptions = () => {
    switch (targetType) {
      case 'capsule':
        return capsules.map(capsule => ({
          id: capsule.id,
          title: capsule.title
        }));
      case 'story':
        return stories.map(story => ({
          id: story.id,
          title: story.title
        }));
      // Add other content types as they become available
      default:
        return [];
    }
  };

  const targetOptions = getTargetOptions();

  const handleSubmit = () => {
    if (!targetId || !relationshipType) return;
    
    createAssociation.mutate({
      sourceType,
      sourceId,
      targetType,
      targetId,
      relationshipType,
      customRelationship: relationshipType === 'custom' ? customRelationship : undefined
    }, {
      onSuccess: () => {
        setOpen(false);
        resetForm();
      }
    });
  };

  const resetForm = () => {
    setTargetType('capsule');
    setTargetId('');
    setRelationshipType('related');
    setCustomRelationship('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
          <Plus className="h-4 w-4 mr-2" />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Related Content</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>From</Label>
            <div className="p-2 rounded-md bg-gray-50 text-sm">
              {sourceTitle} ({sourceType})
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="targetType">Content Type</Label>
            <Select 
              value={targetType} 
              onValueChange={(value) => {
                setTargetType(value as ContentType);
                setTargetId('');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="capsule">Capsule</SelectItem>
                <SelectItem value="story">Story</SelectItem>
                <SelectItem value="memory">Memory</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="family_member">Family Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="targetId">Content Item</Label>
            <Select 
              value={targetId} 
              onValueChange={setTargetId}
              disabled={targetOptions.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder={
                  targetOptions.length === 0 
                    ? `No ${targetType}s available` 
                    : `Select a ${targetType}`
                } />
              </SelectTrigger>
              <SelectContent>
                {targetOptions.map(option => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="relationshipType">Relationship</Label>
            <Select 
              value={relationshipType} 
              onValueChange={(value) => setRelationshipType(value as RelationshipType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contains">Contains</SelectItem>
                <SelectItem value="references">References</SelectItem>
                <SelectItem value="inspiredBy">Inspired By</SelectItem>
                <SelectItem value="continuation">Continues</SelectItem>
                <SelectItem value="response">Response To</SelectItem>
                <SelectItem value="features">Features</SelectItem>
                <SelectItem value="related">Related</SelectItem>
                <SelectItem value="custom">Custom...</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {relationshipType === 'custom' && (
            <div className="grid gap-2">
              <Label htmlFor="customRelationship">Custom Relationship</Label>
              <Input
                id="customRelationship"
                value={customRelationship}
                onChange={(e) => setCustomRelationship(e.target.value)}
                placeholder="Describe the relationship..."
              />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!targetId || (relationshipType === 'custom' && !customRelationship)}
          >
            Create Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
