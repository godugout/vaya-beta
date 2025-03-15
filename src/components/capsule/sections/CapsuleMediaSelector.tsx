
import { FileText, Image, Mic, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface CapsuleMediaSelectorProps {
  selectedMediaType: "text" | "audio" | "image";
  onMediaTypeChange: (value: string) => void;
}

export const CapsuleMediaSelector = ({
  selectedMediaType,
  onMediaTypeChange,
}: CapsuleMediaSelectorProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Content Type</h3>
      <p className="text-sm text-gray-500">What type of memories will this capsule contain?</p>
      
      <Tabs defaultValue="text" value={selectedMediaType} onValueChange={onMediaTypeChange}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Text
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Photos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="pt-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-2">Text Memories</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create written memories, stories, letters, or notes to be revealed in the future.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="audio" className="pt-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-2">Audio Memories</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Record voice messages, songs, or sounds to be heard in the future.
            </p>
            <Button variant="outline" className="w-full py-8 border-dashed">
              <Upload className="h-6 w-6 mr-2" />
              Upload Audio or Record
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="image" className="pt-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-2">Photo Memories</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Collect photos and images to be viewed in the future.
            </p>
            <Button variant="outline" className="w-full py-8 border-dashed">
              <Upload className="h-6 w-6 mr-2" />
              Upload Photos
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
