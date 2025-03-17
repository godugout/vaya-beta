
import { useState, useRef, useEffect } from "react";
import { Annotation } from "./annotation/types";
import { AnnotationMarker } from "./annotation/AnnotationMarker";
import { AnnotationTooltip } from "./annotation/AnnotationTooltip";
import { AddAnnotationDialog } from "./annotation/AddAnnotationDialog";
import { useAnnotations } from "./annotation/useAnnotations";

export type { Annotation } from "./annotation/types";

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
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    annotations,
    dialogOpen,
    setDialogOpen,
    activeAnnotation,
    handleImageClick,
    saveAnnotation,
    handleAnnotationHover,
    handleAnnotationLeave
  } = useAnnotations(imageId, initialAnnotations, readOnly);

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
      {annotations.map((annotation, index) => (
        <AnnotationMarker
          key={annotation.id}
          annotation={annotation}
          index={index}
          isActive={activeAnnotation === annotation.id}
          onMouseEnter={handleAnnotationHover}
          onMouseLeave={handleAnnotationLeave}
        />
      ))}
      
      {/* Annotation tooltips */}
      {annotations.map((annotation) => (
        activeAnnotation === annotation.id && (
          <AnnotationTooltip 
            key={`tooltip-${annotation.id}`} 
            annotation={annotation} 
          />
        )
      ))}
      
      {/* Add annotation dialog */}
      <AddAnnotationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={saveAnnotation}
      />
    </div>
  );
};
