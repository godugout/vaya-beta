
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  title: string;
  description: string;
  isCompleted?: boolean;
  themeStyle: {
    accent: string;
    border: string;
  };
}

export const AchievementCard = ({
  title,
  description,
  isCompleted = false,
  themeStyle,
}: AchievementCardProps) => {
  return (
    <div className={cn(
      "p-3 rounded-lg border flex items-center",
      isCompleted ? themeStyle.border : "border-dashed"
    )}>
      <Award size={24} className={isCompleted ? themeStyle.accent : "text-gray-400"} />
      <div className="ml-3">
        <h4 className={cn(
          "font-medium",
          isCompleted ? "" : "text-gray-600"
        )}>{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};
