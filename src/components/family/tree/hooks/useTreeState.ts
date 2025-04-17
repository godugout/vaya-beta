
import { useState, useRef } from 'react';
import { useNodesState, useEdgesState, ReactFlowInstance } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';

export const useTreeState = (initialMembers: any[] = []) => {
  // Convert initial members to nodes if provided
  const initialNodes = initialMembers?.map((member) => ({
    id: member.id || uuidv4(),
    type: 'familyMember',
    position: member.position || { x: 0, y: 0 },
    data: {
      full_name: member.profiles?.full_name || member.full_name || 'New Member',
      birth_date: member.birth_date || null,
      death_date: member.death_date || null,
      role: member.role || 'unknown',
      bio: member.bio || '',
      avatar_url: member.profiles?.avatar_url || member.avatar_url || null,
      storyCount: 0,
      hasNewStories: false,
    },
    draggable: true,
  })) || [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowInstanceRef = useRef<ReactFlowInstance | null>(null);

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    reactFlowInstanceRef,
  };
};

