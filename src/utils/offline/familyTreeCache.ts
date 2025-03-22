import localforage from 'localforage';
import { FamilyGraph, FamilyNode, FamilyEdge } from '@/utils/graphDb/familyGraphTypes';
import { offlineManager } from './offlineManager';

// Initialize localForage instance for family data
const familyTreeStore = localforage.createInstance({
  name: 'familyTreeCache',
  storeName: 'familyGraphs'
});

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
    try {
      const keys = await familyTreeStore.keys();
      for (const familyId of keys) {
        const graph = await familyTreeStore.getItem<FamilyGraph>(familyId);
        if (graph) {
          this.cachedGraphs.set(familyId, graph);
        }
      }
      console.log(`Preloaded ${this.cachedGraphs.size} family graphs into memory cache`);
    } catch (error) {
      console.error('Failed to preload family graphs:', error);
    }
  }
  
  /**
   * Get a family graph, from cache first then fallback to server
   */
  public async getFamilyGraph(familyId: string): Promise<FamilyGraph | null> {
    // Try memory cache first (fastest)
    if (this.cachedGraphs.has(familyId)) {
      return this.cachedGraphs.get(familyId) || null;
    }
    
    // Try IndexedDB cache next
    try {
      const cachedGraph = await familyTreeStore.getItem<FamilyGraph>(familyId);
      if (cachedGraph) {
        // Update memory cache
        this.cachedGraphs.set(familyId, cachedGraph);
        return cachedGraph;
      }
    } catch (error) {
      console.error(`Error retrieving family graph ${familyId} from cache:`, error);
    }
    
    // If not in cache, try to fetch from server
    if (navigator.onLine) {
      try {
        // Note: This is a placeholder - you would implement the actual API call
        // to fetch the family graph from your server/Supabase
        const graph = await this.fetchFamilyGraphFromServer(familyId);
        if (graph) {
          // Cache the result both in memory and IndexedDB
          this.cachedGraphs.set(familyId, graph);
          await familyTreeStore.setItem(familyId, graph);
          return graph;
        }
      } catch (error) {
        console.error(`Error fetching family graph ${familyId} from server:`, error);
      }
    }
    
    return null;
  }
  
  /**
   * Fetch family graph from server (placeholder implementation)
   */
  private async fetchFamilyGraphFromServer(familyId: string): Promise<FamilyGraph | null> {
    // This is a placeholder - implement actual server fetch logic
    // Using Supabase or your API of choice
    return null;
  }
  
  /**
   * Add a node to a family graph with offline support
   */
  public async addNode(
    familyId: string, 
    node: Omit<FamilyNode, 'id'> & { id?: string }
  ): Promise<FamilyNode | null> {
    try {
      // Generate an ID if one isn't provided
      const nodeId = node.id || crypto.randomUUID();
      const newNode: FamilyNode = {
        id: nodeId,
        type: node.type || 'person',
        data: node.data,
      };
      
      // Get the current graph
      const graph = await this.getFamilyGraph(familyId);
      if (!graph) {
        throw new Error(`Family graph ${familyId} not found`);
      }
      
      // Add the node to the graph
      const updatedGraph: FamilyGraph = {
        ...graph,
        nodes: [...graph.nodes, newNode],
      };
      
      // Update cache
      this.cachedGraphs.set(familyId, updatedGraph);
      await familyTreeStore.setItem(familyId, updatedGraph);
      
      // Queue for sync with server when online
      offlineManager.queueOperation({
        table: 'family_graph_nodes',
        type: 'insert',
        data: {
          family_id: familyId,
          node_data: newNode,
        },
        priority: 'medium',
      });
      
      return newNode;
    } catch (error) {
      console.error(`Error adding node to family graph ${familyId}:`, error);
      return null;
    }
  }
  
  /**
   * Add an edge to a family graph with offline support
   */
  public async addEdge(
    familyId: string,
    edge: Omit<FamilyEdge, 'id'> & { id?: string }
  ): Promise<FamilyEdge | null> {
    try {
      // Generate an ID if one isn't provided
      const edgeId = edge.id || crypto.randomUUID();
      const newEdge: FamilyEdge = {
        id: edgeId,
        source: edge.source,
        target: edge.target,
        type: edge.type,
        metadata: edge.metadata || {},
      };
      
      // Get the current graph
      const graph = await this.getFamilyGraph(familyId);
      if (!graph) {
        throw new Error(`Family graph ${familyId} not found`);
      }
      
      // Add the edge to the graph
      const updatedGraph: FamilyGraph = {
        ...graph,
        edges: [...graph.edges, newEdge],
      };
      
      // Update cache
      this.cachedGraphs.set(familyId, updatedGraph);
      await familyTreeStore.setItem(familyId, updatedGraph);
      
      // Queue for sync with server when online
      offlineManager.queueOperation({
        table: 'family_graph_edges',
        type: 'insert',
        data: {
          family_id: familyId,
          edge_data: newEdge,
        },
        priority: 'medium',
      });
      
      return newEdge;
    } catch (error) {
      console.error(`Error adding edge to family graph ${familyId}:`, error);
      return null;
    }
  }
  
  /**
   * Update a node in a family graph with offline support
   */
  public async updateNode(
    familyId: string,
    nodeId: string,
    updates: Partial<FamilyNode['data']>
  ): Promise<boolean> {
    try {
      // Get the current graph
      const graph = await this.getFamilyGraph(familyId);
      if (!graph) {
        throw new Error(`Family graph ${familyId} not found`);
      }
      
      // Find the node to update
      const nodeIndex = graph.nodes.findIndex(n => n.id === nodeId);
      if (nodeIndex === -1) {
        throw new Error(`Node ${nodeId} not found in family graph ${familyId}`);
      }
      
      // Update the node
      const updatedNode = {
        ...graph.nodes[nodeIndex],
        data: {
          ...graph.nodes[nodeIndex].data,
          ...updates,
        },
      };
      
      const updatedNodes = [...graph.nodes];
      updatedNodes[nodeIndex] = updatedNode;
      
      const updatedGraph: FamilyGraph = {
        ...graph,
        nodes: updatedNodes,
      };
      
      // Update cache
      this.cachedGraphs.set(familyId, updatedGraph);
      await familyTreeStore.setItem(familyId, updatedGraph);
      
      // Queue for sync with server when online
      offlineManager.queueOperation({
        table: 'family_graph_nodes',
        type: 'update',
        data: {
          id: nodeId,
          family_id: familyId,
          node_data: updatedNode,
        },
        priority: 'medium',
      });
      
      return true;
    } catch (error) {
      console.error(`Error updating node ${nodeId} in family graph ${familyId}:`, error);
      return false;
    }
  }
  
  /**
   * Delete a node from a family graph with offline support
   */
  public async deleteNode(familyId: string, nodeId: string): Promise<boolean> {
    try {
      // Get the current graph
      const graph = await this.getFamilyGraph(familyId);
      if (!graph) {
        throw new Error(`Family graph ${familyId} not found`);
      }
      
      // Filter out the node and any edges connected to it
      const updatedNodes = graph.nodes.filter(n => n.id !== nodeId);
      const updatedEdges = graph.edges.filter(e => 
        e.source !== nodeId && e.target !== nodeId
      );
      
      const updatedGraph: FamilyGraph = {
        ...graph,
        nodes: updatedNodes,
        edges: updatedEdges,
      };
      
      // Update cache
      this.cachedGraphs.set(familyId, updatedGraph);
      await familyTreeStore.setItem(familyId, updatedGraph);
      
      // Queue for sync with server when online
      offlineManager.queueOperation({
        table: 'family_graph_nodes',
        type: 'delete',
        data: {
          id: nodeId,
          family_id: familyId,
        },
        priority: 'medium',
      });
      
      return true;
    } catch (error) {
      console.error(`Error deleting node ${nodeId} from family graph ${familyId}:`, error);
      return false;
    }
  }
  
  /**
   * Clear all cached family graphs
   */
  public async clearCache(): Promise<void> {
    try {
      await familyTreeStore.clear();
      this.cachedGraphs.clear();
      console.log('Family tree cache cleared');
    } catch (error) {
      console.error('Error clearing family tree cache:', error);
    }
  }
}

// Export a singleton instance
export const familyTreeCache = new FamilyTreeCacheService();
