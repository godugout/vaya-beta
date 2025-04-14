
import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Make sure we have a consistent anonymous ID across sessions
const getAnonymousId = () => {
  let anonymousId = localStorage.getItem('anonymous_id');
  if (!anonymousId) {
    anonymousId = crypto.randomUUID();
    localStorage.setItem('anonymous_id', anonymousId);
  }
  return anonymousId;
};

export const useActivityTracking = () => {
  // Initialize anonymous tracking ID on component mount
  useEffect(() => {
    getAnonymousId();
  }, []);
  
  const trackActivity = useCallback(async (activityType: string, metadata: Record<string, any> = {}) => {
    try {
      const anonymousId = getAnonymousId();

      // Get auth token if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      
      // Call the Supabase Edge Function to track the activity
      const { error } = await supabase.functions.invoke('track-activity', {
        body: {
          activity_type: activityType,
          metadata,
          anonymous_id: anonymousId
        },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });

      if (error) {
        console.error('Error tracking activity:', error);
      }
    } catch (error) {
      // Fail silently in production, log in development
      console.error('Failed to track activity:', error);
    }
  }, []);

  return { trackActivity };
};

// Common activity types as constants
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
  ERROR_OCCURRED: 'error',
  FAMILY_CREATED: 'family_created',
  MEMBER_ADDED: 'member_added',
  SETTINGS_CHANGED: 'settings_changed'
};
