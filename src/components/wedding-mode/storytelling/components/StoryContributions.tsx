
import React from 'react';
import { Clock, ArrowRight, InfoCircle } from 'lucide-react';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

export interface StoryContribution {
  id: string;
  contributorName: string;
  contributorAvatar?: string;
  content: string;
  timestamp: Date;
  isPlaceholder?: boolean;
}

interface StoryContributionsProps {
  contributions: StoryContribution[];
  themeStyles: {
    bgAccent: string;
  };
}

export const StoryContributions: React.FC<StoryContributionsProps> = ({
  contributions,
  themeStyles
}) => {
  const allPlaceholder = contributions.every(c => c.isPlaceholder !== false);

  return (
    <div className="space-y-4">
      {allPlaceholder && (
        <Alert variant="default" className="bg-gray-100 border-gray-200 mb-4">
          <AlertDescription className="flex items-center text-sm text-gray-600">
            <InfoCircle className="h-4 w-4 mr-2" />
            Demo content shown below. Real contributions will appear here when shared.
          </AlertDescription>
        </Alert>
      )}
      
      {contributions.map((contribution) => (
        <AnimatedContainer 
          key={contribution.id} 
          variant="fade" 
          className={cn(
            "border rounded-lg p-4 relative",
            contribution.isPlaceholder && "opacity-70"
          )}
        >
          {contribution.isPlaceholder && (
            <div className="absolute top-2 right-2 bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
              Demo
            </div>
          )}
          
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src={contribution.contributorAvatar} />
              <AvatarFallback className={cn("text-white", themeStyles.bgAccent)}>
                {contribution.contributorName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium">{contribution.contributorName}</h4>
                <div className="flex items-center text-gray-500 text-xs">
                  <Clock size={12} className="mr-1" />
                  {contribution.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{contribution.content}</p>
            </div>
          </div>
        </AnimatedContainer>
      ))}
      
      <div className="text-center pt-4">
        <Button variant="outline" className="gap-2">
          View More Stories <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};
