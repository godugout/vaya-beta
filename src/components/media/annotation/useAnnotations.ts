
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Annotation, AnnotationType } from './types';

export const useAnnotations = (
  imageId: string,
  initialAnnotations: Annotation[] = [],
  readOnly: boolean = false
) => {
  const [annotations, setAnnotations] = useState<Annotation[]>(initialAnnotations);
  const [selectedPoint, setSelectedPoint] = useState<{x: number, y: number} | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (readOnly) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setSelectedPoint({ x, y });
    setDialogOpen(true);
  };

  const saveAnnotation = async (text: string, type: AnnotationType) => {
    if (!selectedPoint || !text.trim()) return;
    
    const newAnnotation: Annotation = {
      id: Math.random().toString(36).substring(2, 9),
      x: selectedPoint.x,
      y: selectedPoint.y,
      text: text.trim(),
      type: type
    };

    const updatedAnnotations = [...annotations, newAnnotation];
    setAnnotations(updatedAnnotations);
    setDialogOpen(false);
    
    try {
      // Update the media_items record with the new annotations
      const { error } = await supabase
        .from('media_items')
        .update({ 
          annotations: updatedAnnotations,
          last_modified_at: new Date().toISOString()
        })
        .eq('id', imageId);
        
      if (error) throw error;
      
      toast({
        title: "Annotation saved",
        description: "Your annotation has been saved successfully",
      });
    } catch (error) {
      console.error('Error saving annotation:', error);
      toast({
        title: "Failed to save annotation",
        description: "There was an error saving your annotation",
        variant: "destructive"
      });
    }
  };

  const handleAnnotationHover = (id: string) => {
    setActiveAnnotation(id);
  };

  const handleAnnotationLeave = () => {
    setActiveAnnotation(null);
  };

  return {
    annotations,
    dialogOpen,
    setDialogOpen,
    activeAnnotation,
    handleImageClick,
    saveAnnotation,
    handleAnnotationHover,
    handleAnnotationLeave
  };
};
