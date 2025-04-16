
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { Button } from '@/components/ui/button';
import { AchievementCard } from './AchievementCard';

interface AchievementsSectionProps {
  theme: 'classic' | 'modern' | 'rustic';
  themeStyles: {
    accent: string;
    button: 'classic' | 'modern' | 'rustic';
    border: string;
  };
}

export const AchievementsSection = ({ theme, themeStyles }: AchievementsSectionProps) => {
  return (
    <AnimatedContainer variant="fade" delay={0.4} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-medium mb-4">Achievements</h3>
      <div className="space-y-4">
        <AchievementCard
          title="Family Historian"
          description="Added 10+ family members"
          isCompleted={true}
          themeStyle={themeStyles}
        />
        <AchievementCard
          title="Ancestral Explorer"
          description="Complete 3 generations of ancestors"
          themeStyle={themeStyles}
        />
        <AchievementCard
          title="Legendary Lineage"
          description="Complete your entire family tree"
          themeStyle={themeStyles}
        />
      </div>
      <Button variant={themeStyles.button} className="w-full mt-4">
        Add Family Members
      </Button>
    </AnimatedContainer>
  );
};
