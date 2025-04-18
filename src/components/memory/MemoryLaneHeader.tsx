
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MemoryLaneHeaderProps {
  onNewMemory: () => void;
}

const MemoryLaneHeader = ({ onNewMemory }: MemoryLaneHeaderProps) => {
  return (
    <div className="w-full pt-16 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Memory Lane</h1>
            <p className="text-muted-foreground">Preserve and explore your family memories</p>
          </div>
          <Button 
            onClick={onNewMemory}
            className="bg-water hover:bg-water/90 shadow-md"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Memory
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemoryLaneHeader;
