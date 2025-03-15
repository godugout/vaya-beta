
import { Node, Edge, MarkerType } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'familyMember',
    data: { 
      name: 'Grandpa Joe', 
      relationship: 'Grandfather',
      storyCount: 12,
      hasNewStories: true
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    type: 'familyMember',
    data: { 
      name: 'Grandma Rose', 
      relationship: 'Grandmother',
      storyCount: 8
    },
    position: { x: 450, y: 0 },
  },
  {
    id: '3',
    type: 'familyMember',
    data: { 
      name: 'Dad', 
      relationship: 'Father',
      storyCount: 5
    },
    position: { x: 250, y: 150 },
  },
  {
    id: '4',
    type: 'familyMember',
    data: { 
      name: 'Mom', 
      relationship: 'Mother',
      storyCount: 7
    },
    position: { x: 450, y: 150 },
  },
  {
    id: '5',
    type: 'familyMember',
    data: { 
      name: 'Me', 
      relationship: 'Self',
      storyCount: 3
    },
    position: { x: 350, y: 300 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'familyConnection',
    sourceHandle: 'spouse',
    targetHandle: 'spouse-target',
    data: { relationship: 'Married' }
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'familyConnection',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { relationship: 'Parent' }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'familyConnection',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { relationship: 'Parent' }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'familyConnection',
    sourceHandle: 'spouse',
    targetHandle: 'spouse-target',
    data: { relationship: 'Married' }
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    type: 'familyConnection',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { relationship: 'Parent' }
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'familyConnection',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { relationship: 'Parent' }
  },
];
