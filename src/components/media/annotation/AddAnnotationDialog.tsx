
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { AnnotationType } from './types';

interface AddAnnotationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (text: string, type: AnnotationType) => void;
}

export const AddAnnotationDialog = ({ open, onOpenChange, onSave }: AddAnnotationDialogProps) => {
  const [annotationText, setAnnotationText] = useState("");
  const [annotationType, setAnnotationType] = useState<AnnotationType>("object");

  const handleSave = () => {
    if (!annotationText.trim()) return;
    onSave(annotationText, annotationType);
    setAnnotationText("");
    setAnnotationType("object");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Annotation</DialogTitle>
          <DialogDescription>
            Describe what you see at this point in the image
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <div className="flex flex-wrap gap-2">
              {(['object', 'person', 'location', 'building', 'other'] as const).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={annotationType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAnnotationType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="annotation-text" className="text-sm font-medium">
              Description
            </label>
            <Input
              id="annotation-text"
              value={annotationText}
              onChange={(e) => setAnnotationText(e.target.value)}
              placeholder="Describe what you see here..."
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!annotationText.trim()}>
            Save Annotation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
