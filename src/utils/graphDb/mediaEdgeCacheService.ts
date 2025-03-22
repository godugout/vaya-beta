
import { EdgeCacheConfig } from './familyGraphTypes';

/**
 * Media Edge Caching Service
 * Implements efficient caching for media content edges in the family graph
 */
export class MediaEdgeCacheService {
  private cache: Map<string, any> = new Map();
  private cacheConfig: EdgeCacheConfig;
  private cacheMetadata: Map<string, { timestamp: number, priority: number }> = new Map();

  constructor(config: EdgeCacheConfig) {
    this.cacheConfig = config;
  }

  /**
   * Get an item from the cache
   */
  get(key: string): any {
    const item = this.cache.get(key);
    if (!item) return null;

    // Update access time for LRU implementation
    this.cacheMetadata.set(key, {
      ...this.cacheMetadata.get(key)!,
      timestamp: Date.now()
    });

    return item;
  }

  /**
   * Store an item in the cache
   */
  set(key: string, value: any, priorityData: Record<string, any> = {}): void {
    // Calculate cache priority based on configured priority fields
    let priority = 0;
    for (const field of this.cacheConfig.priorityFields) {
      if (field in priorityData) {
        // Simple priority score - can be enhanced for specific use cases
        priority += 1;
      }
    }

    // Ensure we don't exceed cache size
    if (this.cache.size >= this.cacheConfig.maxSize && !this.cache.has(key)) {
      this.evictLeastValuable();
    }

    // Store the item and its metadata
    this.cache.set(key, value);
    this.cacheMetadata.set(key, {
      timestamp: Date.now(),
      priority
    });

    // Set expiration
    if (this.cacheConfig.ttl > 0) {
      setTimeout(() => {
        this.cache.delete(key);
        this.cacheMetadata.delete(key);
      }, this.cacheConfig.ttl);
    }
  }

  /**
   * Evict items from the cache based on value/recency
   */
  private evictLeastValuable(): void {
    let leastValuableKey: string | null = null;
    let lowestScore = Infinity;

    // Calculate a score for each item: higher priority and recency = higher score
    for (const [key, metadata] of this.cacheMetadata.entries()) {
      const age = Date.now() - metadata.timestamp;
      const score = metadata.priority - (age / 10000); // Adjust the weight of recency as needed
      
      if (score < lowestScore) {
        lowestScore = score;
        leastValuableKey = key;
      }
    }

    // Remove the least valuable item
    if (leastValuableKey) {
      this.cache.delete(leastValuableKey);
      this.cacheMetadata.delete(leastValuableKey);
    }
  }

  /**
   * Clear the entire cache
   */
  clear(): void {
    this.cache.clear();
    this.cacheMetadata.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number, maxSize: number, ttl: number } {
    return {
      size: this.cache.size,
      maxSize: this.cacheConfig.maxSize,
      ttl: this.cacheConfig.ttl
    };
  }
}

// Create and export a preconfigured instance for media content
export const mediaCache = new MediaEdgeCacheService({
  maxSize: 100, // Cache up to 100 media items
  ttl: 30 * 60 * 1000, // 30 minutes TTL
  priorityFields: ['isShared', 'viewCount', 'isFeatured', 'recentAccess']
});
