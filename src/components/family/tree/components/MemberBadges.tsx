
import { BookOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MemberBadgesProps {
  storyCount: number;
  hasNewStories: boolean;
}

export const MemberBadges = ({ storyCount, hasNewStories }: MemberBadgesProps) => {
  return (
    <div className="flex items-center gap-2 mt-1 mb-2">
      <TooltipProvider>
        {storyCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="secondary" className="bg-amber-500/30 text-amber-100 border border-amber-500/30">
                <BookOpen className="h-3 w-3 mr-1" />
                {storyCount}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{storyCount} {storyCount === 1 ? 'Story' : 'Stories'}</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {hasNewStories && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className="bg-orange-500 text-white flex items-center gap-1">
                <Star className="h-3 w-3" /> New
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>New stories added recently</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
};
