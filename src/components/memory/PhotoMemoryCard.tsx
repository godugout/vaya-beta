import { PhotoMemory } from "./types";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

interface PhotoMemoryCardProps {
  memory: PhotoMemory;
}

export const PhotoMemoryCard = ({ memory }: PhotoMemoryCardProps) => {
  return (
    <Card className="bg-white border-vaya-purple/10 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {memory.photo_url && (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-vaya-purple/10">
              <img
                src={memory.photo_url}
                alt="Memory"
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="flex-grow">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(memory.created_at), "MMM d, yyyy")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};