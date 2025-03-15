
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MessageCircle, Phone, Star, Calendar, Clock } from "lucide-react";

interface FamilyMemberDetailCardProps {
  id: string;
  name: string;
  avatar?: string;
  relationship: string;
  storyCount: number;
  totalStoryGoal?: number;
  lastStoryDate?: string;
  upcomingEvent?: {
    title: string;
    date: string;
  };
  onMessageClick?: () => void;
  onCallClick?: () => void;
  onViewStories?: () => void;
}

export const FamilyMemberDetailCard = ({
  id,
  name,
  avatar,
  relationship,
  storyCount,
  totalStoryGoal = 10,
  lastStoryDate,
  upcomingEvent,
  onMessageClick,
  onCallClick,
  onViewStories,
}: FamilyMemberDetailCardProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const storyProgress = (storyCount / totalStoryGoal) * 100;

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-lovable-blue to-lovable-teal p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-lovable-magenta text-white text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-white">
            <h3 className="font-semibold text-xl">{name}</h3>
            <p className="text-white/80">{relationship}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Story Collection Progress</p>
            <span className="text-sm font-medium">{storyCount}/{totalStoryGoal}</span>
          </div>
          <Progress value={storyProgress} className="h-2" />
          
          {lastStoryDate && (
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              Last story recorded on {lastStoryDate}
            </p>
          )}
        </div>
        
        {upcomingEvent && (
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-lovable-teal shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">{upcomingEvent.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{upcomingEvent.date}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          {onMessageClick && (
            <Button variant="outline" size="sm" className="flex-1" onClick={onMessageClick}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
          )}
          
          {onCallClick && (
            <Button variant="outline" size="sm" className="flex-1" onClick={onCallClick}>
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
          )}
          
          {onViewStories && (
            <Button className="flex-1" onClick={onViewStories}>
              <Star className="h-4 w-4 mr-2" />
              View Stories
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
