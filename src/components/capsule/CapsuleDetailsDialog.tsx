import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddMemoryButton from "@/components/memory/AddMemoryButton";

interface CapsuleDetailsDialogProps {
  capsule: {
    id: string;
    title: string;
    description: string;
    memoryCount: number;
    createdAt: string;
    thumbnail?: string;
  };
  children?: React.ReactNode;
}

const CapsuleDetailsDialog = ({ capsule, children }: CapsuleDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm">
            <Info className="h-4 w-4 mr-2" />
            View Details
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-outfit">{capsule.title}</DialogTitle>
          <DialogDescription>
            Created on {new Date(capsule.createdAt).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6">
            {capsule.thumbnail && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <img
                  src={capsule.thumbnail}
                  alt={capsule.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="space-y-4">
              <p className="text-gray-600">{capsule.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{capsule.memoryCount} memories</span>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Capsule
              </Button>
              <AddMemoryButton />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CapsuleDetailsDialog;