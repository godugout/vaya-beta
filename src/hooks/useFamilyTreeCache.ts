
import { useState } from 'react';
import { FamilyGraph } from '@/utils/graphDb/familyGraphTypes';
import { useFamilyGraphData } from './family-tree/useFamilyGraphData';
import { usePersonOperations } from './family-tree/usePersonOperations';
import { useRelationshipOperations } from './family-tree/useRelationshipOperations';
import { useOfflineOperations } from './useOfflineOperations';

export const useFamilyTreeCache = (familyId: string | undefined) => {
  // Use our new hooks to get the family graph data
  const { 
    graph, 
    loading, 
    error, 
    refreshGraph 
  } = useFamilyGraphData(familyId);
  
  // State setter for graph updates
  const setGraph = useState<FamilyGraph | null>(graph)[1];
  
  // Track selected person for potential UI needs
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  
  // Get offline status
  const { isOnline } = useOfflineOperations();
  
  // Get person operations (add, update, delete)
  const { 
    addPerson, 
    updatePerson, 
    deletePerson 
  } = usePersonOperations(familyId, graph, setGraph);
  
  // Get relationship operations
  const { 
    addRelationship 
  } = useRelationshipOperations(familyId, graph, setGraph);

  return {
    graph,
    loading,
    error,
    refreshGraph,
    addPerson,
    addRelationship,
    updatePerson,
    deletePerson,
    selectedPersonId,
    setSelectedPersonId,
    isOnline
  };
};
