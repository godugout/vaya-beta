
/**
 * Types for family graph database structure
 * Optimized for efficient relationship traversal and querying
 */

export interface FamilyNode {
  id: string;
  type: 'person';
  data: {
    full_name: string;
    birth_date?: string;
    death_date?: string;
    avatar_url?: string;
    gender?: 'male' | 'female' | 'other' | 'unknown';
    birth_place?: string;
    bio?: string;
    metadata?: Record<string, any>;
  };
}

export interface FamilyEdge {
  id: string;
  source: string; // Source node ID
  target: string; // Target node ID
  type: FamilyRelationshipType;
  label?: string;
  metadata?: {
    start_date?: string;
    end_date?: string;
    status?: 'active' | 'divorced' | 'separated' | 'deceased';
    notes?: string;
    [key: string]: any;
  };
}

export type FamilyRelationshipType = 
  | 'parent-child'
  | 'spouse'
  | 'sibling'
  | 'adopted-child'
  | 'guardian'
  | 'extended-family';

export interface FamilyGraph {
  nodes: FamilyNode[];
  edges: FamilyEdge[];
  familyId: string;
  metadata?: {
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
    [key: string]: any;
  };
}

// Type for graph query options
export interface GraphQueryOptions {
  depth?: number;            // How many levels to traverse
  direction?: 'up' | 'down' | 'both'; // Direction of traversal
  types?: FamilyRelationshipType[]; // Filter by relationship types
  includeNodeData?: boolean; // Whether to include full node data
  sortBy?: 'birth_date' | 'alphabetical' | 'relationship'; // Sort options
}

// Cache configuration type
export interface EdgeCacheConfig {
  maxSize: number;           // Maximum items in cache
  ttl: number;               // Time to live in milliseconds
  priorityFields: string[];  // Fields that determine priority
}
