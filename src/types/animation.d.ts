
// Define animation types

export type AnimationDuration = 'fast' | 'standard' | 'slow';
export type AnimationEasing = 'ease' | 'linear' | 'elastic' | 'bounce' | 'standard';
export type AnimationPreference = 'full' | 'reduced';

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
