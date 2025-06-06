
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { DialogClose } from "@/components/ui/dialog";

interface CreateCapsuleFormData {
  title: string;
  instructions: string;
  lockDeadline: Date;
  revealDate: Date;
}

const CreateCapsuleForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CreateCapsuleFormData>();

  const onSubmit = async (data: CreateCapsuleFormData) => {
    setIsSubmitting(true);
    try {
      // Mock submission for now
      console.log("Would create capsule with data:", data);
      
      // Simulate success after short delay
      setTimeout(() => {
        toast({
          title: "Success!",
          description: "Your time capsule has been created.",
        });
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create time capsule. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Create a New Time Capsule</h2>
        <p className="text-gray-500">Set up a digital time capsule for your family to cherish.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Input
            placeholder="Capsule Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Textarea
            placeholder="Instructions for contributors..."
            {...register("instructions")}
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !watch("lockDeadline") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("lockDeadline") ? (
                    format(watch("lockDeadline"), "PPP")
                  ) : (
                    <span>Lock Deadline</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={watch("lockDeadline")}
                  onSelect={(date) => setValue("lockDeadline", date as Date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !watch("revealDate") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("revealDate") ? (
                    format(watch("revealDate"), "PPP")
                  ) : (
                    <span>Reveal Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={watch("revealDate")}
                  onSelect={(date) => setValue("revealDate", date as Date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            type="submit" 
            className="bg-vaya-secondary hover:bg-vaya-secondary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Time Capsule"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateCapsuleForm;
