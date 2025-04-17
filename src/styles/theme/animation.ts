
// Re-export animations from modular files
import { keyframesAnimations } from './animations/keyframes';
import { transitionAnimations } from './animations/transitions';
import { componentAnimations } from './animations/components';
import { logoAnimations } from './animations/logo';
import { uiAnimations } from './animations/ui';

export const animation = {
  keyframes: {
    ...keyframesAnimations.keyframes,
    ...componentAnimations.keyframes,
    ...logoAnimations.keyframes,
    ...uiAnimations.keyframes
  },
  animation: {
    ...keyframesAnimations.animations,
    ...componentAnimations.animations,
    ...logoAnimations.animations,
    ...uiAnimations.animations
  },
  duration: transitionAnimations.duration,
  transition: transitionAnimations.transition,
  easing: transitionAnimations.easing
};
