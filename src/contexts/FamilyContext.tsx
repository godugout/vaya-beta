
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FamilyMember {
  id: string;
  name: string;
  relationships: Array<{
    id: string;
    type: 'parent' | 'child' | 'spouse' | 'sibling';
    memberId: string;
  }>;
  stories: Array<{
    id: string;
    title: string;
    type: 'audio' | 'text' | 'video';
    tags: string[];
    createdAt: string;
  }>;
  metadata: {
    birthDate?: string;
    location?: string;
    culturalRole?: string;
    [key: string]: any;
  };
}

interface FamilyContextType {
  members: FamilyMember[];
  selectedMember: FamilyMember | null;
  setSelectedMember: (member: FamilyMember | null) => void;
  addMember: (member: Omit<FamilyMember, 'id'>) => void;
  updateMember: (id: string, updates: Partial<FamilyMember>) => void;
  addStoryToMember: (memberId: string, story: FamilyMember['stories'][0]) => void;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export const FamilyProvider = ({ children }: { children: ReactNode }) => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const addMember = (memberData: Omit<FamilyMember, 'id'>) => {
    const newMember: FamilyMember = {
      ...memberData,
      id: crypto.randomUUID(),
    };
    setMembers(prev => [...prev, newMember]);
  };

  const updateMember = (id: string, updates: Partial<FamilyMember>) => {
    setMembers(prev => prev.map(member => 
      member.id === id ? { ...member, ...updates } : member
    ));
  };

  const addStoryToMember = (memberId: string, story: FamilyMember['stories'][0]) => {
    updateMember(memberId, {
      stories: [...(members.find(m => m.id === memberId)?.stories || []), story]
    });
  };

  return (
    <FamilyContext.Provider value={{
      members,
      selectedMember,
      setSelectedMember,
      addMember,
      updateMember,
      addStoryToMember,
    }}>
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamilyContext = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamilyContext must be used within a FamilyProvider');
  }
  return context;
};
