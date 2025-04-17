
import { useCallback } from 'react';
import { Node } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';

interface UseMemberOperationsProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<any[]>>;
}

export function useMemberOperations({ nodes, setNodes, setEdges }: UseMemberOperationsProps) {
  const { toast } = useToast();

  const handleAddMember = useCallback((memberData: { 
    full_name: string; 
    role: string;
    birthdate?: string; 
    bio?: string;
    avatar_url?: string;
  }) => {
    const newNode = {
      id: uuidv4(),
      type: 'familyMember',
      position: { 
        x: Math.random() * 400, 
        y: Math.random() * 400 
      },
      data: {
        full_name: memberData.full_name,
        role: memberData.role,
        birthdate: memberData.birthdate || null,
        bio: memberData.bio || '',
        avatar_url: memberData.avatar_url || null,
        storyCount: 0,
        hasNewStories: false,
      },
      draggable: true,
    };
    
    setNodes(nodes => [...nodes, newNode]);
    
    toast({
      title: "Family Member Added",
      description: `${memberData.full_name} has been added to your family tree.`,
    });
    
    return newNode.id;
  }, [setNodes, toast]);

  const handleRemoveMember = useCallback((nodeId?: string) => {
    const idToRemove = nodeId || (nodes.length > 0 ? nodes[nodes.length - 1].id : null);
    
    if (!idToRemove) {
      toast({
        title: "No member to remove",
        description: "There are no family members to remove.",
        variant: "destructive"
      });
      return;
    }
    
    const memberToRemove = nodes.find(n => n.id === idToRemove);
    const memberName = memberToRemove?.data?.full_name || 'Family member';
    
    setNodes(nodes => nodes.filter(n => n.id !== idToRemove));
    setEdges(edges => edges.filter(
      e => e.source !== idToRemove && e.target !== idToRemove
    ));
    
    toast({
      title: "Family Member Removed",
      description: `${memberName} has been removed from the family tree.`,
    });
  }, [nodes, setNodes, setEdges, toast]);

  const handleAddMembers = useCallback((members: any[]) => {
    if (!members.length) return;
    
    const newNodes = members.map(member => ({
      id: member.id || uuidv4(),
      type: 'familyMember',
      position: member.position || { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        full_name: member.full_name || 'Unknown',
        role: member.role || '',
        birthdate: member.birthdate || null,
        bio: member.bio || '',
        avatar_url: member.avatar_url || null,
        storyCount: member.storyCount || 0,
        hasNewStories: member.hasNewStories || false,
      },
      draggable: true,
    }));
    
    setNodes(nodes => [...nodes, ...newNodes]);
    
    toast({
      title: "Multiple Members Added",
      description: `Added ${members.length} family members to the tree.`,
    });
  }, [setNodes, toast]);

  return {
    handleAddMember,
    handleRemoveMember,
    handleAddMembers
  };
}
