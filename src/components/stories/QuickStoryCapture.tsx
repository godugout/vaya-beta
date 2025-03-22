
import React, { useState, useEffect, useRef } from 'react';
import { Mic, Camera, Send, X, Loader, FileText, Image as ImageIcon } from 'lucide-react';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { Button } from '@/components/ui/button';
import { VayaButton } from '@/components/ui/vaya-button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { VoiceRecorderButton } from '@/components/input/VoiceRecorderButton';

interface QuickStoryCaptureProps {
  onSubmit: (data: {
    text: string;
    media?: File[];
    audio?: Blob;
  }) => void;
  onCancel?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function QuickStoryCapture({
  onSubmit,
  onCancel,
  placeholder = "Share your story or memory...",
  autoFocus = true
}: QuickStoryCaptureProps) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'processing'>('idle');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Record when component mounts for performance measurement
  const mountTimeRef = useRef<number>(Date.now());
  
  useEffect(() => {
    // Log time to interactive
    const timeToInteractive = Date.now() - mountTimeRef.current;
    console.log(`QuickStoryCapture time to interactive: ${timeToInteractive}ms`);
    
    // Auto focus the textarea if requested
    if (autoFocus && textAreaRef.current) {
      // Small delay to ensure component is fully rendered
      setTimeout(() => {
        textAreaRef.current?.focus();
      }, 100);
    }
  }, [autoFocus]);

  // Handle media file selection
  const handleMediaSelect = () => {
    mediaInputRef.current?.click();
  };

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setMediaFiles(prev => [...prev, ...newFiles]);
      setIsExpanded(true);
      
      // Show toast notification
      toast({
        title: `${newFiles.length} file${newFiles.length > 1 ? 's' : ''} selected`,
        description: "Media attached to your story"
      });
    }
  };

  // Remove media file
  const removeMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle voice recording
  const handleRecordToggle = () => {
    if (recordingState === 'idle') {
      setRecordingState('recording');
    } else if (recordingState === 'recording') {
      setRecordingState('processing');
      // Simulate audio processing (would be replaced with actual recording logic)
      setTimeout(() => {
        setRecordingState('idle');
        setAudioBlob(new Blob([])); // Placeholder blob
        toast({
          title: "Recording saved",
          description: "Voice recording attached to your story"
        });
      }, 1000);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (isSubmitting) return;
    
    if (!text.trim() && mediaFiles.length === 0 && !audioBlob) {
      toast({
        title: "Empty story",
        description: "Please add some text, media, or a voice recording",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      onSubmit({
        text,
        media: mediaFiles.length > 0 ? mediaFiles : undefined,
        audio: audioBlob || undefined
      });
      
      // Reset form
      setText('');
      setMediaFiles([]);
      setAudioBlob(null);
      setIsExpanded(false);
      
      toast({
        title: "Story shared",
        description: "Your story has been shared successfully"
      });
    } catch (error) {
      console.error('Error submitting story:', error);
      toast({
        title: "Error sharing story",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedContainer 
      variant="fade" 
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          {/* Text Input Area */}
          <Textarea
            ref={textAreaRef}
            placeholder={placeholder}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value.length > 0 && !isExpanded) {
                setIsExpanded(true);
              }
            }}
            onFocus={() => setIsExpanded(true)}
            className={`border-0 focus-visible:ring-0 resize-none ${isExpanded ? 'min-h-[120px]' : 'min-h-[80px]'}`}
          />
          
          {/* Media Preview */}
          {mediaFiles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {mediaFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="w-20 h-20 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Media preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileText className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow group-hover:opacity-100 opacity-80"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t pt-3 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMediaSelect}
                type="button"
                className="rounded-full"
              >
                <ImageIcon size={20} />
              </Button>
              
              <VoiceRecorderButton
                state={recordingState}
                size="sm"
                onStart={() => setRecordingState('recording')}
                onStop={() => setRecordingState('processing')}
                disabled={isSubmitting}
              />
              
              <input
                type="file"
                ref={mediaInputRef}
                onChange={handleMediaChange}
                accept="image/*,video/*"
                multiple
                className="hidden"
              />
            </div>
            
            <div className="flex items-center gap-2">
              {onCancel && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              
              <VayaButton
                variant="default"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleSubmit}
                disabled={(!text.trim() && mediaFiles.length === 0 && !audioBlob) || isSubmitting}
                rightIcon={<Send size={16} />}
              >
                Share
              </VayaButton>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
}
