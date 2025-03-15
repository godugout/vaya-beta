
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CapsuleBasicInfo } from "./sections/CapsuleBasicInfo";
import { CapsuleRevealDate } from "./sections/CapsuleRevealDate";
import { CapsuleMediaSelector } from "./sections/CapsuleMediaSelector";
import { CapsuleCollaborators } from "./sections/CapsuleCollaborators";

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
          <CapsuleBasicInfo 
            register={register}
            errors={errors}
          />
          
          <CapsuleRevealDate 
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          
          <CapsuleMediaSelector
            selectedMediaType={selectedMediaType}
            onMediaTypeChange={(value) => setSelectedMediaType(value as "text" | "audio" | "image")}
          />
          
          <CapsuleCollaborators
            collaborators={collaborators}
            onAddCollaborator={addCollaborator}
            onRemoveCollaborator={removeCollaborator}
          />
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2 pt-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Create Capsule</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
