
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
  const { isReduced, isMobile, duration: durationPresets, easing } = useAnimation();

  // Skip animation if reduced motion is preferred
  if (isReduced) {
    return <div className={className}>{children}</div>;
  }

  // Adjust distance for mobile
  const mobileAdjustedDistance = isMobile ? Math.min(distance, 10) : distance;

  const getInitialPosition = () => {
    if (isMobile) {
      // Simplified animations for mobile
      return direction === 'none' ? { opacity: 0 } : { opacity: 0, y: 10 };
    }
    
    switch (direction) {
      case 'up':
        return { opacity: 0, y: mobileAdjustedDistance };
      case 'down':
        return { opacity: 0, y: -mobileAdjustedDistance };
      case 'left':
        return { opacity: 0, x: mobileAdjustedDistance };
      case 'right':
        return { opacity: 0, x: -mobileAdjustedDistance };
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

  // Adjust animation duration for mobile
  const adjustedDuration = isMobile
    ? Math.min((duration || durationPresets.standard) * 0.7, 250) / 1000
    : (duration || durationPresets.standard) / 1000;

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      animate={getFinalPosition()}
      transition={{
        duration: adjustedDuration,
        delay: isMobile ? Math.min(delay * 0.5, 0.3) : delay,
        ease: isMobile ? "easeOut" : easing.standard // Simpler easing for mobile
      }}
    >
      {children}
    </motion.div>
  );
};
