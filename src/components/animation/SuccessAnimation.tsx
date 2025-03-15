
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { useAnimation } from './AnimationProvider';
import { cn } from '@/lib/utils';

interface SuccessAnimationProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  message?: string;
  onComplete?: () => void;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  size = 'md',
  color = '#10B981', // Default green color
  className,
  message,
  onComplete,
}) => {
  const { isReduced } = useAnimation();

  // Size configurations
  const sizeConfig = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4', strokeWidth: 3 },
    md: { container: 'w-12 h-12', icon: 'w-6 h-6', strokeWidth: 2.5 },
    lg: { container: 'w-16 h-16', icon: 'w-8 h-8', strokeWidth: 2 },
  };

  // Check animation variants
  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: 0.5, bounce: 0 },
        opacity: { duration: 0.2 },
      },
    },
  };

  // Circle animation variants
  const circleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        scale: { type: 'spring', stiffness: 300, damping: 15 },
        opacity: { duration: 0.2 },
      },
    },
  };

  if (isReduced) {
    return (
      <div className={cn('flex flex-col items-center', className)}>
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-green-100',
            sizeConfig[size].container
          )}
        >
          <CheckIcon className={cn('text-green-500', sizeConfig[size].icon)} />
        </div>
        {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <motion.div
        className={cn(
          'flex items-center justify-center rounded-full',
          sizeConfig[size].container
        )}
        initial="hidden"
        animate="visible"
        variants={circleVariants}
        style={{ backgroundColor: `${color}20` }} // 20% opacity version of the color
        onAnimationComplete={() => onComplete && onComplete()}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 15,
            delay: 0.2,
          }}
        >
          <svg
            className={sizeConfig[size].icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M6 12L10 16L18 8"
              stroke={color}
              strokeWidth={sizeConfig[size].strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={checkVariants}
            />
          </svg>
        </motion.div>
      </motion.div>
      {message && (
        <motion.p
          className="mt-2 text-sm text-gray-600"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};
