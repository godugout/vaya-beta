import React from "react";
import { Button } from "@/components/ui/button";
import { Hourglass } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCapsuleForm from "@/components/capsule/CreateCapsuleForm";

interface CapsuleHeaderProps {
  title?: string;
  description?: string;
}

const CapsuleHeader = ({ title, description }: CapsuleHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-white text-emerald-600 hover:bg-white/90"
              size="lg"
            >
              <span>Create a Capsule</span>
              <Hourglass className="ml-2 h-5 w-5 capsule-icon" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Time Capsule</DialogTitle>
              <DialogDescription>
                Create a digital time capsule to preserve and share your family's precious memories.
              </DialogDescription>
            </DialogHeader>
            <CreateCapsuleForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CapsuleHeader;