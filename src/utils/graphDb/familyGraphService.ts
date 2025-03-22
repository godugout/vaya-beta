
import { supabase } from '@/integrations/supabase/client';
import { FamilyGraph, FamilyNode, FamilyEdge, GraphQueryOptions, FamilyRelationshipType } from './familyGraphTypes';
import { v4 as uuidv4 } from 'uuid';

/**
 * Family Graph Database Service
 * Implements optimized algorithms for traversing and querying the family relationship graph
 */
export class FamilyGraphService {
  private cachedGraphs: Map<string, { data: FamilyGraph, timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL

  /**
   * Get a family graph by ID, with caching
   */
  async getFamilyGraph(familyId: string): Promise<FamilyGraph | null> {
    // Check cache first
    const cached = this.cachedGraphs.get(familyId);
    if (cached && (Date.now() - cached.timestamp < this.CACHE_TTL)) {
      return cached.data;
    }

    try {
      // Fetch nodes (family members)
      const { data: members, error: membersError } = await supabase
        .from('vaya_family_members')
        .select('*')
        .eq('family_id', familyId);

      if (membersError) throw membersError;
      
      // Fetch relationships (edges)
      const { data: relationships, error: relError } = await supabase
        .from('vaya_family_relationships')
        .select('*')
        .eq('family_id', familyId);

      if (relError) throw relError;

      // Transform to graph structure
      const nodes: FamilyNode[] = members.map(member => ({
        id: member.id,
        type: 'person',
        data: {
          full_name: member.full_name,
          birth_date: member.birth_date,
          death_date: member.death_date,
          avatar_url: member.avatar_url,
          gender: member.gender,
          birth_place: member.birth_place,
          bio: member.bio,
          metadata: member.metadata
        }
      }));

      const edges: FamilyEdge[] = relationships.map(rel => ({
        id: rel.id,
        source: rel.source_id,
        target: rel.target_id,
        type: rel.relationship_type as FamilyRelationshipType,
        label: rel.label,
        metadata: {
          start_date: rel.start_date,
          end_date: rel.end_date,
          status: rel.status,
          notes: rel.notes,
          ...rel.metadata
        }
      }));

      const graph: FamilyGraph = {
        nodes,
        edges,
        familyId,
        metadata: {
          name: 'Family Graph', // Get actual family name in a real implementation
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };

      // Update cache
      this.cachedGraphs.set(familyId, { data: graph, timestamp: Date.now() });
      return graph;
    } catch (error) {
      console.error('Error fetching family graph:', error);
      return null;
    }
  }

  /**
   * Find ancestors of a person in the family graph
   */
  findAncestors(graph: FamilyGraph, personId: string, options: GraphQueryOptions = {}): FamilyNode[] {
    const { depth = 3, includeNodeData = true } = options;
    const ancestors: FamilyNode[] = [];
    const visited = new Set<string>();

    // Find parent-type relationships
    const traverseUp = (currentId: string, currentDepth: number) => {
      if (currentDepth > depth || visited.has(currentId)) return;
      visited.add(currentId);

      // Find parent edges
      const parentEdges = graph.edges.filter(edge => 
        edge.target === currentId && 
        (edge.type === 'parent-child' || edge.type === 'adopted-child' || edge.type === 'guardian')
      );

      // For each parent, add them and continue traversal
      for (const edge of parentEdges) {
        const parentNode = graph.nodes.find(node => node.id === edge.source);
        if (parentNode) {
          ancestors.push(includeNodeData ? parentNode : { id: parentNode.id, type: 'person', data: { full_name: parentNode.data.full_name } });
          traverseUp(edge.source, currentDepth + 1);
        }
      }
    };

    traverseUp(personId, 0);
    return ancestors;
  }

  /**
   * Find descendants of a person in the family graph
   */
  findDescendants(graph: FamilyGraph, personId: string, options: GraphQueryOptions = {}): FamilyNode[] {
    const { depth = 3, includeNodeData = true } = options;
    const descendants: FamilyNode[] = [];
    const visited = new Set<string>();

    // Find child-type relationships
    const traverseDown = (currentId: string, currentDepth: number) => {
      if (currentDepth > depth || visited.has(currentId)) return;
      visited.add(currentId);

      // Find child edges
      const childEdges = graph.edges.filter(edge => 
        edge.source === currentId && 
        (edge.type === 'parent-child' || edge.type === 'adopted-child')
      );

      // For each child, add them and continue traversal
      for (const edge of childEdges) {
        const childNode = graph.nodes.find(node => node.id === edge.target);
        if (childNode) {
          descendants.push(includeNodeData ? childNode : { id: childNode.id, type: 'person', data: { full_name: childNode.data.full_name } });
          traverseDown(edge.target, currentDepth + 1);
        }
      }
    };

    traverseDown(personId, 0);
    return descendants;
  }

  /**
   * Add a new person to the family graph
   */
  async addPerson(familyId: string, personData: Partial<FamilyNode['data']>): Promise<FamilyNode | null> {
    try {
      const personId = uuidv4();
      const { data, error } = await supabase
        .from('vaya_family_members')
        .insert({
          id: personId,
          family_id: familyId,
          full_name: personData.full_name,
          birth_date: personData.birth_date,
          death_date: personData.death_date,
          avatar_url: personData.avatar_url,
          gender: personData.gender,
          birth_place: personData.birth_place,
          bio: personData.bio,
          metadata: personData.metadata
        })
        .select()
        .single();

      if (error) throw error;

      // Clear cache to ensure fresh data
      this.cachedGraphs.delete(familyId);

      return {
        id: personId,
        type: 'person',
        data: {
          full_name: data.full_name,
          birth_date: data.birth_date,
          death_date: data.death_date,
          avatar_url: data.avatar_url,
          gender: data.gender,
          birth_place: data.birth_place,
          bio: data.bio,
          metadata: data.metadata
        }
      };
    } catch (error) {
      console.error('Error adding person to family graph:', error);
      return null;
    }
  }

  /**
   * Add a relationship between two people in the family graph
   */
  async addRelationship(
    familyId: string, 
    sourceId: string, 
    targetId: string, 
    type: FamilyRelationshipType,
    metadata?: FamilyEdge['metadata']
  ): Promise<FamilyEdge | null> {
    try {
      const edgeId = uuidv4();
      const { data, error } = await supabase
        .from('vaya_family_relationships')
        .insert({
          id: edgeId,
          family_id: familyId,
          source_id: sourceId,
          target_id: targetId,
          relationship_type: type,
          metadata
        })
        .select()
        .single();

      if (error) throw error;

      // Clear cache to ensure fresh data
      this.cachedGraphs.delete(familyId);

      return {
        id: edgeId,
        source: sourceId,
        target: targetId,
        type,
        metadata
      };
    } catch (error) {
      console.error('Error adding relationship to family graph:', error);
      return null;
    }
  }

  /**
   * Get common ancestors between two people
   */
  findCommonAncestors(graph: FamilyGraph, person1Id: string, person2Id: string): FamilyNode[] {
    const ancestors1 = this.findAncestors(graph, person1Id);
    const ancestors2 = this.findAncestors(graph, person2Id);
    
    const person1AncestorIds = new Set(ancestors1.map(a => a.id));
    return ancestors2.filter(a => person1AncestorIds.has(a.id));
  }
}

// Export singleton instance
export const familyGraphDb = new FamilyGraphService();
