
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormState, UseFormRegister } from "react-hook-form";

interface CapsuleBasicInfoProps {
  register: UseFormRegister<any>;
  errors: FormState<any>["errors"];
}

export const CapsuleBasicInfo = ({
  register,
  errors,
}: CapsuleBasicInfoProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Capsule Title</Label>
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
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="What is this memory capsule about?"
          className="min-h-[100px]"
          {...register("description")}
        />
      </div>
    </>
  );
};
