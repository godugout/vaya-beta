
import { useState, useEffect } from 'react';
import { FamilyContext } from '@/components/chat/types';

// Initial default context
const defaultFamilyContext: FamilyContext = {
  familyName: '',
  ancestralRegion: '',
  currentLocation: '',
  culturalIdentity: '',
  primaryLanguage: '',
  familyElders: [],
  traditions: [],
  hobbies: [],
  familyValues: [],
  preferences: {}
};

export function useFamilyContextManagement() {
  const [familyContext, setFamilyContext] = useState<FamilyContext | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load family context from localStorage on mount
  useEffect(() => {
    try {
      const savedContext = localStorage.getItem('familyContext');
      if (savedContext) {
        setFamilyContext(JSON.parse(savedContext));
      }
    } catch (error) {
      console.error('Error loading family context:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save family context to localStorage
  const saveFamilyContext = async (context: FamilyContext): Promise<void> => {
    try {
      localStorage.setItem('familyContext', JSON.stringify(context));
      setFamilyContext(context);
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving family context:', error);
      return Promise.reject(error);
    }
  };

  // Clear family context
  const clearFamilyContext = () => {
    try {
      localStorage.removeItem('familyContext');
      setFamilyContext(null);
    } catch (error) {
      console.error('Error clearing family context:', error);
    }
  };

  // Get a default context for new users
  const getDefaultContext = (): FamilyContext => {
    return { ...defaultFamilyContext };
  };

  return {
    familyContext,
    saveFamilyContext,
    clearFamilyContext,
    getDefaultContext,
    isLoading
  };
}
