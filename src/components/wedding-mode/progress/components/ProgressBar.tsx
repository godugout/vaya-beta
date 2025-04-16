
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  label: string;
  percentage: number;
  theme: 'classic' | 'modern' | 'rustic';
}

export const ProgressBar = ({ label, percentage, theme }: ProgressBarProps) => {
  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'classic': return 'bg-autumn';
      case 'modern': return 'bg-water';
      case 'rustic': return 'bg-forest';
      default: return 'bg-autumn';
    }
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="font-medium">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full", getThemeColor(theme))}
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  );
};
