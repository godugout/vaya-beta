
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

export interface Annotation {
  id: string;
  x: number;
  y: number;
  text: string;
  type: 'object' | 'person' | 'location' | 'building' | 'other';
}

interface ImageAnnotationProps {
  imageSrc: string;
  imageId: string;
  initialAnnotations?: Annotation[];
  readOnly?: boolean;
}

export const ImageAnnotation = ({
  imageSrc,
  imageId,
  initialAnnotations = [],
  readOnly = false
}: ImageAnnotationProps) => {
  const [annotations, setAnnotations] = useState<Annotation[]>(initialAnnotations);
  const [selectedPoint, setSelectedPoint] = useState<{x: number, y: number} | null>(null);
  const [annotationText, setAnnotationText] = useState("");
  const [annotationType, setAnnotationType] = useState<Annotation["type"]>("object");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set image dimensions once it loads
    if (imageRef.current && imageRef.current.complete) {
      updateImageSize();
    }
  }, []);

  const updateImageSize = () => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      });
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (readOnly) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setSelectedPoint({ x, y });
    setAnnotationText("");
    setDialogOpen(true);
  };

  const saveAnnotation = async () => {
    if (!selectedPoint || !annotationText.trim()) return;
    
    const newAnnotation: Annotation = {
      id: Math.random().toString(36).substring(2, 9),
      x: selectedPoint.x,
      y: selectedPoint.y,
      text: annotationText.trim(),
      type: annotationType
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

  return (
    <div className="relative" ref={containerRef}>
      <img 
        ref={imageRef}
        src={imageSrc} 
        alt="Annotatable image"
        className="w-full rounded-lg"
        onClick={handleImageClick}
        onLoad={updateImageSize}
      />
      
      {/* Annotation markers */}
      {annotations.map((annotation) => (
        <div 
          key={annotation.id}
          className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${
            activeAnnotation === annotation.id
              ? 'bg-primary border-white scale-125 z-20'
              : 'bg-primary/60 border-white/80 hover:scale-110 z-10'
          }`}
          style={{ 
            left: `${annotation.x * 100}%`, 
            top: `${annotation.y * 100}%`
          }}
          onMouseEnter={() => handleAnnotationHover(annotation.id)}
          onMouseLeave={handleAnnotationLeave}
        >
          <span className="text-xs text-white font-bold">
            {annotations.indexOf(annotation) + 1}
          </span>
        </div>
      ))}
      
      {/* Annotation tooltips */}
      {annotations.map((annotation) => (
        activeAnnotation === annotation.id && (
          <div 
            key={`tooltip-${annotation.id}`}
            className="absolute bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-30 max-w-xs"
            style={{ 
              left: `${annotation.x * 100}%`, 
              top: `${annotation.y * 100}% + 20px`,
              transform: 'translateX(-50%)',
              marginTop: '20px'
            }}
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {annotation.type.charAt(0).toUpperCase() + annotation.type.slice(1)}
            </div>
            <div className="text-sm">{annotation.text}</div>
          </div>
        )
      ))}
      
      {/* Add annotation dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveAnnotation} disabled={!annotationText.trim()}>
              Save Annotation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
