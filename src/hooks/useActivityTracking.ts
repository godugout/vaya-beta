
import { useCallback } from 'react';

export const ActivityTypes = {
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  FEATURE_USED: 'feature_used',
  STORY_RECORDED: 'story_recorded',
  STORY_PLAYED: 'story_played',
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_COMPLETED: 'signup_completed',
  LOGIN: 'login',
  LOGOUT: 'logout',
  ERROR_OCCURRED: 'error_occurred',
  FAMILY_CREATED: 'family_created',
  MEMBER_ADDED: 'member_added',
  SETTINGS_CHANGED: 'settings_changed',
  // Add the missing activity types
  MEMORY_REACTION: 'memory_reaction',
  MEMORY_PLAYBACK: 'memory_playback',
  MEMORY_CAPTION_READ: 'memory_caption_read'
};

export function useActivityTracking() {
  const trackActivity = useCallback((activityType: string, details?: Record<string, any>) => {
    console.log(`Activity tracked: ${activityType}`, details);
    
    // In a real implementation, we would send this data to an analytics service
    // Example: analyticsClient.trackEvent(activityType, details);
  }, []);
  
  return { trackActivity };
}
