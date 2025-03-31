
import { useAnimation } from './AnimationProvider';

export type EasingFunction = 
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circIn'
  | 'circOut'
  | 'circInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'anticipate'
  | 'bounceIn'
  | 'bounceOut'
  | 'bounceInOut';

export type AnimationDuration = 
  | 'ultraFast' // 100ms
  | 'fast'      // 200ms
  | 'standard'  // 300ms
  | 'moderate'  // 500ms
  | 'slow'      // 800ms
  | 'ultraSlow'; // 1200ms

export interface AnimationPreset {
  duration: AnimationDuration;
  easing: EasingFunction;
  delay?: number;
  repeat?: number;
  repeatType?: 'loop' | 'reverse' | 'mirror';
  staggerChildren?: number;
}

// Wedding-specific animation presets
export const weddingAnimationPresets: Record<string, AnimationPreset> = {
  entrance: {
    duration: 'moderate',
    easing: 'backOut',
    staggerChildren: 0.05
  },
  celebration: {
    duration: 'standard',
    easing: 'bounceOut',
    repeat: 1,
    repeatType: 'mirror'
  },
  subtle: {
    duration: 'standard',
    easing: 'easeOut'
  },
  romantic: {
    duration: 'slow',
    easing: 'circInOut'
  },
  announcement: {
    duration: 'fast',
    easing: 'backOut',
    staggerChildren: 0.03
  }
};

export interface UseAnimationSystemProps {
  culturalSensitivity?: 'standard' | 'reduced' | 'enhanced';
  celebrationLevel?: 'subtle' | 'moderate' | 'elaborate';
  animationPreset?: string;
}

// Preset bounce easings for different contexts
const bounceEasings = {
  standard: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  subtle: 'cubic-bezier(0.25, 1.25, 0.5, 1)',
  elaborate: 'cubic-bezier(0.5, 2, 0.75, 0.8)'
};

/**
 * Unified animation system with consistent timing and easing functions
 * Supports wedding-specific cultural adaptations
 */
export const useAnimationSystem = ({
  culturalSensitivity = 'standard',
  celebrationLevel = 'moderate',
  animationPreset = 'entrance'
}: UseAnimationSystemProps = {}) => {
  const { isReduced, duration: baseDuration, easing: baseEasing } = useAnimation();
  
  // Get the preset config or use entrance preset as default
  const preset = weddingAnimationPresets[animationPreset] || weddingAnimationPresets.entrance;
  
  // Adjust timing based on reduced motion preferences
  const getDurationMs = (durationPreset: AnimationDuration): number => {
    const durationMap: Record<AnimationDuration, number> = {
      ultraFast: 100,
      fast: 200,
      standard: 300,
      moderate: 500,
      slow: 800,
      ultraSlow: 1200
    };
    
    // Reduce duration if reduced motion is enabled
    const baseDurationMs = durationMap[durationPreset];
    return isReduced ? Math.min(baseDurationMs, 300) : baseDurationMs;
  };
  
  // Adjust celebration effects based on cultural sensitivity and preferences
  const getCelebrationLevel = () => {
    if (isReduced) return 'subtle';
    
    // Cultural sensitivity adjustments
    switch (culturalSensitivity) {
      case 'reduced':
        return celebrationLevel === 'elaborate' ? 'moderate' : 'subtle';
      case 'enhanced':
        return celebrationLevel === 'subtle' ? 'moderate' : celebrationLevel;
      default:
        return celebrationLevel;
    }
  };
  
  // Convert easing function name to CSS easing
  const getEasingFunction = (easingType: EasingFunction): string => {
    const easingMap: Record<EasingFunction, string> = {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      circIn: 'cubic-bezier(0.55, 0, 1, 0.45)',
      circOut: 'cubic-bezier(0, 0.55, 0.45, 1)',
      circInOut: 'cubic-bezier(0.85, 0, 0.15, 1)',
      backIn: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
      backOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      backInOut: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      anticipate: 'cubic-bezier(0.38, -0.4, 0.88, 0.65)',
      bounceIn: bounceEasings.standard,
      bounceOut: bounceEasings.standard,
      bounceInOut: bounceEasings.standard
    };
    
    return easingMap[easingType];
  };
  
  // Generate Framer Motion variants for common animations
  const getMotionVariants = (customPreset?: Partial<AnimationPreset>) => {
    const finalPreset = { ...preset, ...customPreset };
    const finalDuration = getDurationMs(finalPreset.duration) / 1000;
    const finalEasing = getEasingFunction(finalPreset.easing);
    const level = getCelebrationLevel();
    
    // Base transition config
    const transition = {
      duration: finalDuration,
      ease: finalPreset.easing, // Use valid Framer Motion easing
      delay: finalPreset.delay || 0,
      repeat: finalPreset.repeat || 0,
      repeatType: finalPreset.repeatType || 'loop'
    };
    
    // Celebration effects scaled by level
    const getCelebrationScale = () => {
      switch (level) {
        case 'subtle': return 1.05;
        case 'moderate': return 1.1;
        case 'elaborate': return 1.2;
        default: return 1.1;
      }
    };
    
    return {
      // Common entrance animations
      fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition }
      },
      slideUp: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition }
      },
      slideDown: {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition }
      },
      scale: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition }
      },
      
      // Celebration animations
      celebration: {
        initial: { scale: 1 },
        animate: { 
          scale: [1, getCelebrationScale(), 1],
          transition: {
            ...transition,
            repeat: level === 'elaborate' ? 2 : 1,
            repeatType: 'mirror'
          }
        }
      },
      
      // Cultural-specific animations
      traditionalBlessing: {
        initial: { opacity: 0, y: 20 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: {
            ...transition,
            duration: level === 'elaborate' ? finalDuration * 1.5 : finalDuration
          }
        }
      },
      
      // Staggered children animation
      staggerParent: {
        hidden: {},
        visible: {
          transition: { 
            staggerChildren: finalPreset.staggerChildren || 0.05,
            delayChildren: finalPreset.delay || 0
          }
        }
      },
      
      // State-based animations
      hover: {
        scale: isReduced ? 1 : 1.05,
        transition: { duration: 0.2 }
      },
      tap: {
        scale: isReduced ? 0.98 : 0.95,
        transition: { duration: 0.1 }
      }
    };
  };
  
  return {
    getDurationMs,
    getEasingFunction,
    getCelebrationLevel,
    getMotionVariants,
    isReduced,
    animationPreset: preset
  };
};
