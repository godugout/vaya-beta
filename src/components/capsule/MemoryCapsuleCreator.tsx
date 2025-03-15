
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Users, Upload, Image, Mic, FileText, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface MemoryCapsuleCreatorProps {
  onComplete?: (data: any) => void;
}

export const MemoryCapsuleCreator = ({ onComplete }: MemoryCapsuleCreatorProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // Default to one year from now
  );
  const [selectedMediaType, setSelectedMediaType] = useState<"text" | "audio" | "image">("text");
  const [collaborators, setCollaborators] = useState<Array<{id: string, name: string, avatar?: string}>>([
    { id: "1", name: "John Doe", avatar: "/placeholder.svg" }
  ]);
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { toast } = useToast();

  const addCollaborator = () => {
    const newCollaborator = { 
      id: `${collaborators.length + 1}`,
      name: "New Collaborator" 
    };
    setCollaborators([...collaborators, newCollaborator]);
  };

  const removeCollaborator = (id: string) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
  };

  const onSubmit = (data: any) => {
    const capsuleData = {
      ...data,
      revealDate: selectedDate,
      mediaType: selectedMediaType,
      collaborators,
      createdAt: new Date().toISOString()
    };
    
    toast({
      title: "Memory Capsule Created",
      description: "Your memory capsule has been created successfully.",
    });
    
    if (onComplete) {
      onComplete(capsuleData);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create a Memory Capsule</CardTitle>
        <CardDescription>
          Collect and preserve memories that can be revealed at a future date.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Capsule Title</label>
            <Input
              id="title"
              placeholder="e.g., Our Family Summer Vacation 2023"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              placeholder="What is this memory capsule about?"
              className="min-h-[100px]"
              {...register("description")}
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Reveal Date</h3>
            <p className="text-sm text-gray-500">Select when this capsule should be available to open.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal w-full sm:w-[240px]",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                {selectedDate 
                  ? `Time until reveal: ${Math.ceil((selectedDate.getTime() - Date.now()) / (1000 * 60 * A60 * 24))} days`
                  : "Please select a date"
                }
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Content Type</h3>
            <p className="text-sm text-gray-500">What type of memories will this capsule contain?</p>
            
            <Tabs defaultValue="text" value={selectedMediaType} onValueChange={(v) => setSelectedMediaType(v as any)}>
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
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Collaborators</h3>
                <p className="text-sm text-gray-500">Invite family members to contribute to this capsule.</p>
              </div>
              
              <Button type="button" size="sm" variant="outline" onClick={addCollaborator}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium">{collaborators.length} Collaborator{collaborators.length !== 1 ? 's' : ''}</span>
                </div>
                
                <Badge variant="outline" className="text-xs">
                  {collaborators.length === 1 ? "Only You" : "Shared"}
                </Badge>
              </div>
              
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {collaborators.map(collaborator => (
                  <div key={collaborator.id} className="flex items-center justify-between bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                        <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{collaborator.name}</span>
                    </div>
                    
                    {collaborators.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                        onClick={() => removeCollaborator(collaborator.id)}
                      >
                        &times;
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2 pt-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Create Capsule</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
