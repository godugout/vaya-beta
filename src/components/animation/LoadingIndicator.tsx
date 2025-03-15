
import { motion } from 'framer-motion';
import { useAnimation } from './AnimationProvider';
import { cn } from '@/lib/utils';

export type LoadingVariant = 'dots' | 'spinner' | 'pulse' | 'progress';

interface LoadingIndicatorProps {
  variant?: LoadingVariant;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  variant = 'dots',
  size = 'md',
  color = 'currentColor',
  className,
  message,
}) => {
  const { isReduced } = useAnimation();

  // Size maps
  const sizeMap = {
    sm: {
      container: 'h-4',
      dot: 'w-1.5 h-1.5',
      spinner: 'w-4 h-4 border-2',
    },
    md: {
      container: 'h-8',
      dot: 'w-2 h-2',
      spinner: 'w-8 h-8 border-3',
    },
    lg: {
      container: 'h-12',
      dot: 'w-3 h-3',
      spinner: 'w-12 h-12 border-4',
    },
  };

  // Render different loading indicators based on variant
  const renderIndicator = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex items-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  'rounded-full bg-current',
                  sizeMap[size].dot
                )}
                style={{ backgroundColor: color }}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        );

      case 'spinner':
        return (
          <motion.div
            className={cn(
              'rounded-full border-current border-solid border-t-transparent',
              sizeMap[size].spinner
            )}
            style={{ borderColor: `${color} transparent transparent transparent` }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        );

      case 'pulse':
        return (
          <motion.div
            className={cn(
              'rounded-full bg-current',
              sizeMap[size].spinner
            )}
            style={{ backgroundColor: color }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );

      case 'progress':
        return (
          <div className={cn('w-full h-1 bg-gray-200 rounded overflow-hidden')}>
            <motion.div
              className="h-full"
              style={{ backgroundColor: color }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {!isReduced ? renderIndicator() : null}
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
};
