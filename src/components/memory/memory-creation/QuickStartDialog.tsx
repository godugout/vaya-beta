
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AudioRecorder } from "@/components/voice-recording/AudioRecorder";
import { LoadingIndicator } from "@/components/animation/LoadingIndicator";
import { NotificationBanner } from "@/components/content/NotificationBanner";
import { Image, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface QuickStartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  activeMethod: "voice" | "text" | "photo";
  onComplete: () => void;
}

const QuickStartDialog = ({
  isOpen,
  onClose,
  activeMethod,
  onComplete,
}: QuickStartDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Memory saved",
        description: "Your memory has been saved successfully.",
      });
      onComplete();
    } catch (err) {
      setError("Failed to save memory. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {activeMethod === "voice" ? "Quick Voice Recording" : 
             activeMethod === "text" ? "Quick Text Memory" : 
             "Quick Photo Upload"}
          </DialogTitle>
        </DialogHeader>
        
        {error && (
          <NotificationBanner
            type="error"
            title="Error"
            message={error}
            onDismiss={() => setError(null)}
          />
        )}
        
        <div className="py-4">
          {activeMethod === "voice" && (
            <div className="flex flex-col items-center space-y-4">
              <AudioRecorder 
                onRecordingComplete={(blob, url) => {
                  console.log("Recording completed", {blob, url});
                  handleSave();
                }}
                className="w-full" 
              />
            </div>
          )}
          
          {activeMethod === "text" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="quick-memory-title">Title</Label>
                <Input id="quick-memory-title" placeholder="Give your memory a title" />
              </div>
              <div>
                <Label htmlFor="quick-memory-text">Memory</Label>
                <Textarea 
                  id="quick-memory-text" 
                  placeholder="Write your memory here..." 
                  rows={5}
                />
              </div>
              <Button 
                className="w-full bg-forest hover:bg-forest/90"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Memory...
                  </>
                ) : (
                  "Save Memory"
                )}
              </Button>
            </div>
          )}
          
          {activeMethod === "photo" && (
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                {isLoading ? (
                  <LoadingIndicator 
                    variant="spinner" 
                    size="md" 
                    className="mx-auto" 
                  />
                ) : (
                  <>
                    <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      JPG, PNG or GIF (max. 10MB)
                    </p>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={() => handleSave()}
                    />
                  </>
                )}
              </div>
              <Button 
                className="w-full bg-forest hover:bg-forest/90"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload & Save"
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickStartDialog;
