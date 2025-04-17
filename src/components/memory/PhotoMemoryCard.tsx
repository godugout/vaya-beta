
import { PhotoMemory } from "./types";
import { Calendar, Bookmark, MessageSquare, Share2 } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface PhotoMemoryCardProps {
  memory: PhotoMemory;
  isPlaceholder?: boolean;
}

export const PhotoMemoryCard = ({ memory, isPlaceholder = true }: PhotoMemoryCardProps) => {
  return (
    <Link to={`/memory/${memory.id}`}>
      <Card className={`bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 relative ${isPlaceholder ? 'opacity-70' : ''}`}>
        {isPlaceholder && (
          <Badge 
            variant="outline" 
            className="absolute top-2 right-2 z-10 bg-gray-200 text-gray-700 text-xs border-gray-300"
          >
            Demo
          </Badge>
        )}
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>FM</AvatarFallback>
            </Avatar>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <Calendar className="w-4 h-4" />
                {format(new Date(memory.created_at), "MMM d, yyyy")}
              </div>

              <div className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={memory.photo_url || memory.content_url}
                    alt="Memory"
                    className="object-cover w-full h-full"
                  />
                </div>

                {memory.caption && (
                  <p className="text-gray-600 text-sm">
                    {memory.caption}
                  </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-vaya-primary"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Bookmark
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-vaya-primary"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Comment
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-vaya-primary"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
