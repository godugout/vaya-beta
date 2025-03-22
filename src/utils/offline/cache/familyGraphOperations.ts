
import { FamilyGraph } from '@/utils/graphDb/familyGraphTypes';
import { familyTreeStore } from './localStorageConfig';

/**
 * Fetch family graph from server (placeholder implementation)
 */
export async function fetchFamilyGraphFromServer(familyId: string): Promise<FamilyGraph | null> {
  // This is a placeholder - implement actual server fetch logic
  // Using Supabase or your API of choice
  return null;
}

/**
 * Get a family graph, from cache first then fallback to server
 */
export async function getFamilyGraph(
  familyId: string, 
  cachedGraphs: Map<string, FamilyGraph>
): Promise<FamilyGraph | null> {
  // Try memory cache first (fastest)
  if (cachedGraphs.has(familyId)) {
    return cachedGraphs.get(familyId) || null;
  }
  
  // Try IndexedDB cache next
  try {
    const cachedGraph = await familyTreeStore.getItem<FamilyGraph>(familyId);
    if (cachedGraph) {
      return cachedGraph;
    }
  } catch (error) {
    console.error(`Error retrieving family graph ${familyId} from cache:`, error);
  }
  
  // If not in cache, try to fetch from server
  if (navigator.onLine) {
    try {
      const graph = await fetchFamilyGraphFromServer(familyId);
      if (graph) {
        // We return the graph but don't cache it here - that's handled by the service
        return graph;
      }
    } catch (error) {
      console.error(`Error fetching family graph ${familyId} from server:`, error);
    }
  }
  
  return null;
}

/**
 * Update a cached graph in both memory and storage
 */
export async function updateCachedGraph(
  familyId: string, 
  graph: FamilyGraph,
  cachedGraphs: Map<string, FamilyGraph>
): Promise<void> {
  cachedGraphs.set(familyId, graph);
  await familyTreeStore.setItem(familyId, graph);
}

/**
 * Clear all cached family graphs
 */
export async function clearCache(cachedGraphs: Map<string, FamilyGraph>): Promise<void> {
  try {
    await familyTreeStore.clear();
    cachedGraphs.clear();
    console.log('Family tree cache cleared');
  } catch (error) {
    console.error('Error clearing family tree cache:', error);
  }
}

/**
 * Preload all cached family graphs into memory
 */
export async function preloadCachedGraphs(
  cachedGraphs: Map<string, FamilyGraph>
): Promise<void> {
  try {
    const keys = await familyTreeStore.keys();
    for (const familyId of keys) {
      const graph = await familyTreeStore.getItem<FamilyGraph>(familyId);
      if (graph) {
        cachedGraphs.set(familyId, graph);
      }
    }
    console.log(`Preloaded ${cachedGraphs.size} family graphs into memory cache`);
  } catch (error) {
    console.error('Failed to preload family graphs:', error);
  }
}
