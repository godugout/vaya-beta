
import { TreeDeciduous } from 'lucide-react';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { useWeddingMode } from '../WeddingModeProvider';
import { CompletionStatus } from './components/CompletionStatus';
import { AchievementsSection } from './components/AchievementsSection';

interface FamilyTreeCompletionProps {
  completionPercentage?: number;
  treeDepth?: number;
}

export const FamilyTreeCompletion: React.FC<FamilyTreeCompletionProps> = ({
  completionPercentage = 65,
  treeDepth = 3
}) => {
  const { theme } = useWeddingMode();
  
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      button: 'autumn' as const,
      border: 'border-autumn',
    },
    modern: {
      accent: 'text-water',
      button: 'water' as const,
      border: 'border-water',
    },
    rustic: {
      accent: 'text-forest',
      button: 'forest' as const,
      border: 'border-forest',
    }
  };
  
  const currentTheme = themeStyles[theme];
  
  return (
    <div className="p-6">
      <AnimatedContainer variant="fade" className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <TreeDeciduous size={40} className={currentTheme.accent + " mx-auto mb-2"} />
          <h2 className="text-3xl font-heading font-bold">Family Tree</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress in completing your family tree
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <CompletionStatus theme={theme} />
          <AchievementsSection theme={theme} themeStyles={currentTheme} />
        </div>
      </AnimatedContainer>
    </div>
  );
};
