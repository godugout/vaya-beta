
import { FamilyGraph, FamilyNode } from '@/utils/graphDb/familyGraphTypes';
import { familyTreeStore } from './localStorageConfig';
import { offlineManager } from '../offlineManager';

/**
 * Add a node to a family graph with offline support
 */
export async function addNode(
  familyId: string, 
  node: Omit<FamilyNode, 'id'> & { id?: string },
  getGraph: (id: string) => Promise<FamilyGraph | null>,
  updateCachedGraph: (id: string, graph: FamilyGraph) => Promise<void>
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
    const graph = await getGraph(familyId);
    if (!graph) {
      throw new Error(`Family graph ${familyId} not found`);
    }
    
    // Add the node to the graph
    const updatedGraph: FamilyGraph = {
      ...graph,
      nodes: [...graph.nodes, newNode],
    };
    
    // Update cache
    await updateCachedGraph(familyId, updatedGraph);
    
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
 * Update a node in a family graph with offline support
 */
export async function updateNode(
  familyId: string,
  nodeId: string,
  updates: Partial<FamilyNode['data']>,
  getGraph: (id: string) => Promise<FamilyGraph | null>,
  updateCachedGraph: (id: string, graph: FamilyGraph) => Promise<void>
): Promise<boolean> {
  try {
    // Get the current graph
    const graph = await getGraph(familyId);
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
    await updateCachedGraph(familyId, updatedGraph);
    
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
export async function deleteNode(
  familyId: string, 
  nodeId: string,
  getGraph: (id: string) => Promise<FamilyGraph | null>,
  updateCachedGraph: (id: string, graph: FamilyGraph) => Promise<void>
): Promise<boolean> {
  try {
    // Get the current graph
    const graph = await getGraph(familyId);
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
    await updateCachedGraph(familyId, updatedGraph);
    
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
