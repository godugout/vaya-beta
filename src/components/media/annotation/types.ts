
export interface Annotation {
  id: string;
  x: number;
  y: number;
  text: string;
  type: 'object' | 'person' | 'location' | 'building' | 'other';
}

export type AnnotationType = 'object' | 'person' | 'location' | 'building' | 'other';
