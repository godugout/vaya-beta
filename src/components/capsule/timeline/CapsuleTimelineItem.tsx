
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Lock, 
  Unlock, 
  Calendar, 
  Clock, 
  Users,
  FileText,
  Image,
  Mic
} from "lucide-react";
import { MemoryCapsule } from "../types/capsuleTypes";

interface CapsuleTimelineItemProps {
  capsule: MemoryCapsule;
  onViewCapsule?: (id: string) => void;
}

export const CapsuleTimelineItem = ({ 
  capsule,
  onViewCapsule 
}: CapsuleTimelineItemProps) => {
  const revealDate = new Date(capsule.revealDate);
  const createdDate = new Date(capsule.createdAt);

  const getStatusColor = (status: string) => {
    return status === "unlocked" ? "bg-green-500" : "bg-amber-500";
  };
  
  const getContentTypeIcon = (type: string) => {
    switch(type) {
      case "text":
        return <FileText className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      case "audio":
        return <Mic className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className="absolute -left-9 top-4 h-5 w-5 rounded-full bg-lovable-blue border-4 border-white dark:border-gray-900"></div>
      
      {/* Date label */}
      <div className="absolute -left-40 top-4 w-28 text-right">
        <p className="font-medium">{revealDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
        <p className="text-xs text-gray-500">{revealDate.toLocaleDateString('en-US', { year: 'numeric' })}</p>
      </div>
      
      <Card className="hover:shadow-md transition-all duration-300">
        <CardContent className="p-0">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Package className={`h-5 w-5 ${capsule.status === "unlocked" ? "text-green-500" : "text-amber-500"}`} />
                  <h3 className="font-medium text-lg">{capsule.title}</h3>
                </div>
                
                {capsule.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{capsule.description}</p>
                )}
              </div>
              
              <Badge className={`${getStatusColor(capsule.status)} text-white`}>
                {capsule.status === "unlocked" ? (
                  <><Unlock className="h-3 w-3 mr-1" /> Unlocked</>
                ) : (
                  <><Lock className="h-3 w-3 mr-1" /> Locked</>
                )}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Created: {createdDate.toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>
                  {revealDate > new Date() 
                    ? `Unlocks in ${Math.ceil((revealDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days`
                    : `Unlocked ${Math.floor((Date.now() - revealDate.getTime()) / (1000 * 60 * 60 * 24))} days ago`
                  }
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{capsule.contributors.length} contributors</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getContentTypeIcon(capsule.contentType)}
                <span className="text-sm font-medium capitalize">{capsule.contentType}</span>
                <Badge variant="outline" className="ml-2">
                  {capsule.contentCount} items
                </Badge>
              </div>
              
              <Button 
                variant={capsule.status === "unlocked" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewCapsule && onViewCapsule(capsule.id)}
              >
                {capsule.status === "unlocked" ? "View Contents" : "View Details"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
