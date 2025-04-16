
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { ProgressBar } from './ProgressBar';

interface CompletionStatusProps {
  theme: 'classic' | 'modern' | 'rustic';
}

export const CompletionStatus = ({ theme }: CompletionStatusProps) => {
  return (
    <AnimatedContainer variant="fade" delay={0.3} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-medium mb-4">Tree Completion Status</h3>
      <div className="space-y-4">
        <ProgressBar label="Overall Completion" percentage={65} theme={theme} />
        <ProgressBar label="Paternal Side" percentage={80} theme={theme} />
        <ProgressBar label="Maternal Side" percentage={50} theme={theme} />
      </div>
    </AnimatedContainer>
  );
};
