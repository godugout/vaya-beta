
import { Node } from '@xyflow/react';

// Check if node is in direct lineage path
export const isInDirectLineage = (node: any, nodeMap: Map<string, any>) => {
  const rootNodes = Array.from(nodeMap.values()).filter(n => !n.parent);
  if (rootNodes.length === 0) return false;
  
  const mainRoot = rootNodes[0];
  if (node.id === mainRoot.id) return true;
  
  let currentNode = node;
  while (currentNode.parent) {
    if (currentNode.parent.id === mainRoot.id) return true;
    currentNode = currentNode.parent;
  }
  
  return false;
};

// Build relationships between nodes
export const buildNodeRelationships = (nodes: Node[], edges: any[]) => {
  const nodeMap = new Map(nodes.map(node => [node.id, { ...node, children: [], level: 0, parent: null }]));
  
  edges.forEach(edge => {
    const source = nodeMap.get(edge.source);
    const target = nodeMap.get(edge.target);
    if (source && target && edge.type === 'parentChild') {
      source.children.push(target);
      target.parent = source;
    }
  });
  
  return {
    nodeMap,
    rootNodes: Array.from(nodeMap.values()).filter(node => {
      return !edges.some(edge => edge.target === node.id && edge.type === 'parentChild');
    })
  };
};

export const assignLevels = (node: any, level = 0) => {
  node.level = level;
  node.children.forEach((child: any) => assignLevels(child, level + 1));
};

