
/**
 * Content types that can be associated with each other
 */
export type ContentType = 
  | 'capsule' 
  | 'story' 
  | 'memory' 
  | 'media' 
  | 'family_member';

/**
 * Types of relationships between content items
 */
export type RelationshipType = 
  | 'contains'        // For parent-child relationships (capsule contains story)
  | 'references'      // One content references another
  | 'inspiredBy'      // Content created as inspiration from another
  | 'continuation'    // Content that continues a storyline
  | 'response'        // Content created in response to another
  | 'features'        // Content that features a person
  | 'related'         // General relationship
  | 'custom';         // User-defined relationship

/**
 * Content association model for the database
 */
export interface ContentAssociation {
  id: string;
  source_type: ContentType;
  source_id: string;
  target_type: ContentType;
  target_id: string;
  relationship_type: RelationshipType;
  custom_relationship?: string;
  created_at: string;
  created_by: string;
  metadata?: Record<string, any>;
}

/**
 * Association display metadata with full content details
 */
export interface AssociationWithContent {
  id: string;
  relationship: RelationshipType;
  customRelationship?: string;
  source: {
    type: ContentType;
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
  };
  target: {
    type: ContentType;
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
  };
  createdAt: string;
  createdBy: string;
}
