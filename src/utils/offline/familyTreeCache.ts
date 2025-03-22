
import { FamilyGraph, FamilyNode, FamilyEdge } from '@/utils/graphDb/familyGraphTypes';
import { 
  getFamilyGraph as getFamilyGraphOp,
  updateCachedGraph as updateCachedGraphOp,
  clearCache as clearCacheOp,
  preloadCachedGraphs
} from './cache/familyGraphOperations';
import { addNode, updateNode, deleteNode } from './cache/familyNodeOperations';
import { addEdge } from './cache/familyEdgeOperations';

class FamilyTreeCacheService {
  private cachedGraphs: Map<string, FamilyGraph> = new Map();
  private isSyncing: boolean = false;
  
  constructor() {
    // Preload cached graphs from IndexedDB into memory for faster access
    this.preloadCachedGraphs();
  }
  
  /**
   * Preload all cached family graphs into memory
   */
  private async preloadCachedGraphs(): Promise<void> {
    await preloadCachedGraphs(this.cachedGraphs);
  }
  
  /**
   * Get a family graph, from cache first then fallback to server
   */
  public async getFamilyGraph(familyId: string): Promise<FamilyGraph | null> {
    const graph = await getFamilyGraphOp(familyId, this.cachedGraphs);
    
    // If graph was fetched from server, cache it
    if (graph && !this.cachedGraphs.has(familyId)) {
      await this.updateCachedGraph(familyId, graph);
    }
    
    return graph;
  }
  
  /**
   * Update a cached graph in both memory and storage
   */
  private async updateCachedGraph(familyId: string, graph: FamilyGraph): Promise<void> {
    await updateCachedGraphOp(familyId, graph, this.cachedGraphs);
  }
  
  /**
   * Add a node to a family graph with offline support
   */
  public async addNode(
    familyId: string, 
    node: Omit<FamilyNode, 'id'> & { id?: string }
  ): Promise<FamilyNode | null> {
    return addNode(
      familyId, 
      node, 
      this.getFamilyGraph.bind(this),
      this.updateCachedGraph.bind(this)
    );
  }
  
  /**
   * Add an edge to a family graph with offline support
   */
  public async addEdge(
    familyId: string,
    edge: Omit<FamilyEdge, 'id'> & { id?: string }
  ): Promise<FamilyEdge | null> {
    return addEdge(
      familyId, 
      edge, 
      this.getFamilyGraph.bind(this),
      this.updateCachedGraph.bind(this)
    );
  }
  
  /**
   * Update a node in a family graph with offline support
   */
  public async updateNode(
    familyId: string,
    nodeId: string,
    updates: Partial<FamilyNode['data']>
  ): Promise<boolean> {
    return updateNode(
      familyId, 
      nodeId, 
      updates, 
      this.getFamilyGraph.bind(this),
      this.updateCachedGraph.bind(this)
    );
  }
  
  /**
   * Delete a node from a family graph with offline support
   */
  public async deleteNode(familyId: string, nodeId: string): Promise<boolean> {
    return deleteNode(
      familyId, 
      nodeId, 
      this.getFamilyGraph.bind(this),
      this.updateCachedGraph.bind(this)
    );
  }
  
  /**
   * Clear all cached family graphs
   */
  public async clearCache(): Promise<void> {
    await clearCacheOp(this.cachedGraphs);
  }
}

// Export a singleton instance
export const familyTreeCache = new FamilyTreeCacheService();
