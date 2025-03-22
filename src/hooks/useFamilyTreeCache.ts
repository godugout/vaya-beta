
import { useState, useEffect, useCallback } from "react";
import { familyTreeCache } from "@/utils/offline/familyTreeCache";

export function useFamilyTreeCache(familyId: string) {
  const [cachedData, setCachedData] = useState<any | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load cached data on mount
  useEffect(() => {
    if (!familyId) {
      setIsLoading(false);
      return;
    }

    try {
      const data = familyTreeCache.getCachedFamily(familyId);
      setCachedData(data);
      
      const updated = familyTreeCache.getLastUpdated(familyId);
      setLastUpdated(updated);
    } catch (error) {
      console.error('Error loading cached family tree:', error);
    } finally {
      setIsLoading(false);
    }
  }, [familyId]);

  // Update cache
  const updateCache = useCallback(async (data: any) => {
    if (!familyId) return;
    
    try {
      await familyTreeCache.cacheFamily(familyId, data);
      setCachedData(data);
      
      const updated = familyTreeCache.getLastUpdated(familyId);
      setLastUpdated(updated);
      
      return true;
    } catch (error) {
      console.error('Error updating family tree cache:', error);
      return false;
    }
  }, [familyId]);

  // Clear cache
  const clearCache = useCallback(() => {
    if (!familyId) return;
    
    try {
      familyTreeCache.clearFamilyCache(familyId);
      setCachedData(null);
      setLastUpdated(null);
      
      return true;
    } catch (error) {
      console.error('Error clearing family tree cache:', error);
      return false;
    }
  }, [familyId]);

  return {
    cachedData,
    lastUpdated,
    isLoading,
    updateCache,
    clearCache,
    hasCachedData: !!cachedData
  };
}
