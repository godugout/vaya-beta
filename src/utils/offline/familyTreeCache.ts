
/**
 * Family Tree Cache Service
 * Handles local caching of family tree data for offline access
 */
export class FamilyTreeCacheService {
  private readonly CACHE_PREFIX = 'vaya_family_tree_';
  private readonly CACHE_METADATA_KEY = 'vaya_family_tree_metadata';
  
  /**
   * Cache a family tree by ID
   */
  public async cacheFamily(familyId: string, data: any): Promise<void> {
    try {
      // Store the family tree data
      localStorage.setItem(`${this.CACHE_PREFIX}${familyId}`, JSON.stringify(data));
      
      // Update metadata
      const metadata = this.getCacheMetadata();
      metadata[familyId] = {
        lastUpdated: new Date().toISOString(),
        version: (metadata[familyId]?.version || 0) + 1
      };
      
      localStorage.setItem(this.CACHE_METADATA_KEY, JSON.stringify(metadata));
    } catch (error) {
      console.error('Error caching family tree:', error);
      throw new Error('Failed to cache family tree data');
    }
  }
  
  /**
   * Get cached family tree by ID
   */
  public getCachedFamily(familyId: string): any | null {
    try {
      const cachedData = localStorage.getItem(`${this.CACHE_PREFIX}${familyId}`);
      if (!cachedData) return null;
      
      return JSON.parse(cachedData);
    } catch (error) {
      console.error('Error retrieving cached family tree:', error);
      return null;
    }
  }
  
  /**
   * Check if a family exists in the cache
   */
  public hasCachedFamily(familyId: string): boolean {
    return localStorage.getItem(`${this.CACHE_PREFIX}${familyId}`) !== null;
  }
  
  /**
   * Get metadata for all cached families
   */
  public getCacheMetadata(): Record<string, { lastUpdated: string, version: number }> {
    try {
      const metadata = localStorage.getItem(this.CACHE_METADATA_KEY);
      return metadata ? JSON.parse(metadata) : {};
    } catch (error) {
      console.error('Error retrieving cache metadata:', error);
      return {};
    }
  }
  
  /**
   * Get last updated time for a family
   */
  public getLastUpdated(familyId: string): string | null {
    const metadata = this.getCacheMetadata();
    return metadata[familyId]?.lastUpdated || null;
  }
  
  /**
   * Clear cache for a specific family
   */
  public clearFamilyCache(familyId: string): void {
    try {
      localStorage.removeItem(`${this.CACHE_PREFIX}${familyId}`);
      
      // Update metadata
      const metadata = this.getCacheMetadata();
      delete metadata[familyId];
      localStorage.setItem(this.CACHE_METADATA_KEY, JSON.stringify(metadata));
    } catch (error) {
      console.error('Error clearing family cache:', error);
    }
  }
  
  /**
   * Clear all family tree caches
   */
  public clearAllCaches(): void {
    try {
      // Get all keys starting with the cache prefix
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.CACHE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      
      // Remove all matched keys
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Clear metadata
      localStorage.removeItem(this.CACHE_METADATA_KEY);
    } catch (error) {
      console.error('Error clearing all caches:', error);
    }
  }
}

// Export singleton instance
export const familyTreeCache = new FamilyTreeCacheService();
