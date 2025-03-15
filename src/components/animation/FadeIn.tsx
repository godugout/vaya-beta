
import { motion } from 'framer-motion';
import { useAnimation } from './AnimationProvider';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration,
  className = '',
}) => {
  const { isReduced, duration: durationPresets, easing } = useAnimation();

  // Skip animation if reduced motion is preferred
  if (isReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: duration || durationPresets.standard / 1000,
        delay,
        ease: easing.standard,
      }}
    >
      {children}
    </motion.div>
  );
};
