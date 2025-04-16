
import { motion } from 'framer-motion';
import { useAnimation } from './AnimationProvider';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration,
  className = '',
  direction = 'none',
  distance = 20,
}) => {
  const { isReduced, duration: durationPresets, easing } = useAnimation();

  // Skip animation if reduced motion is preferred
  if (isReduced) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'none':
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      animate={getFinalPosition()}
      transition={{
        duration: duration || durationPresets.standard / 1000,
        delay,
        ease: easing.standard // Using the array format passed from context
      }}
    >
      {children}
    </motion.div>
  );
};
