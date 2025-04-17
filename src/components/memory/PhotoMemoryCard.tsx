
import MemoryCard from "./MemoryCard";
import { PhotoMemory } from "./types";
import { CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface PhotoMemoryCardProps {
  memory: PhotoMemory;
  isPlaceholder?: boolean;
}

export const PhotoMemoryCard = ({ memory, isPlaceholder = false }: PhotoMemoryCardProps) => {
  return (
    <MemoryCard>
      {memory.photo_url && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={memory.photo_url}
            alt={memory.caption || "Memory"}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-6">
        {isPlaceholder && (
          <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded absolute top-2 right-2">
            Demo
          </div>
        )}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>{new Date(memory.created_at).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-700 font-medium">{memory.caption || "Untitled Photo Memory"}</p>
      </CardContent>
    </MemoryCard>
  );
};
