
import { MessageCircle, Phone, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const MemberActions = () => {
  return (
    <div className="flex justify-center space-x-2 mt-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300">
              <MessageCircle className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send message</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300">
              <Phone className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Call</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300">
              <BookOpen className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View stories</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
