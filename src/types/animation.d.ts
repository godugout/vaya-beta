
// Define animation types

export type AnimationDuration = 'fast' | 'standard' | 'slow';
export type AnimationEasing = 'ease' | 'linear' | 'elastic' | 'bounce' | 'standard';
export type AnimationPreference = 'enabled' | 'reduced' | 'disabled';

// Extend durations and easings
export interface AnimationDurations {
  fast: number;
  standard: number;
  slow: number;
}

export interface AnimationEasings {
  ease: string;
  linear: string;
  elastic: string;
  bounce: string;
  standard: string;
}

// Animation context type for provider
export interface AnimationContextType {
  isEnabled: boolean;
  isReduced: boolean;
  preference: AnimationPreference;
  setPreference: (pref: AnimationPreference) => void;
  duration: AnimationDurations;
  easing: AnimationEasings;
  animationPreference?: AnimationPreference;
  setAnimationPreference?: (pref: AnimationPreference) => void;
}
