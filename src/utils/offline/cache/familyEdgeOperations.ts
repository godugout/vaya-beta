
import { FamilyGraph, FamilyEdge } from '@/utils/graphDb/familyGraphTypes';
import { offlineManager } from '../offlineManager';

/**
 * Add an edge to a family graph with offline support
 */
export async function addEdge(
  familyId: string,
  edge: Omit<FamilyEdge, 'id'> & { id?: string },
  getGraph: (id: string) => Promise<FamilyGraph | null>,
  updateCachedGraph: (id: string, graph: FamilyGraph) => Promise<void>
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
    const graph = await getGraph(familyId);
    if (!graph) {
      throw new Error(`Family graph ${familyId} not found`);
    }
    
    // Add the edge to the graph
    const updatedGraph: FamilyGraph = {
      ...graph,
      edges: [...graph.edges, newEdge],
    };
    
    // Update cache
    await updateCachedGraph(familyId, updatedGraph);
    
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
