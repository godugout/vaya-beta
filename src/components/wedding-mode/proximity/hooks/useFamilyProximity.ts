
import { useState, useEffect } from 'react';
import { useWeddingMode } from '../../WeddingModeProvider';

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  lastSeen: Date;
  proximity: 'nearby' | 'close' | 'distant' | 'unknown';
}

export function useFamilyProximity(initialFamilyMembers: FamilyMember[] = []) {
  const { theme } = useWeddingMode();
  const [members, setMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  
  // Mock data if no family members are provided
  useEffect(() => {
    if (initialFamilyMembers.length === 0) {
      setMembers([
        { id: '1', name: 'Mom', relationship: 'Parent', lastSeen: new Date(), proximity: 'nearby' },
        { id: '2', name: 'Dad', relationship: 'Parent', lastSeen: new Date(), proximity: 'nearby' },
        { id: '3', name: 'Sister', relationship: 'Sibling', lastSeen: new Date(), proximity: 'close' },
        { id: '4', name: 'Grandma', relationship: 'Grandparent', lastSeen: new Date(), proximity: 'distant' },
        { id: '5', name: 'Uncle Bob', relationship: 'Uncle', lastSeen: new Date(), proximity: 'unknown' },
      ]);
    }
  }, [initialFamilyMembers]);
  
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      primary: 'bg-autumn/20',
      secondary: 'ring-autumn/30',
    },
    modern: {
      accent: 'text-water',
      primary: 'bg-water/20',
      secondary: 'ring-water/30',
    },
    rustic: {
      accent: 'text-forest',
      primary: 'bg-forest/20',
      secondary: 'ring-forest/30',
    }
  };
  
  const proximityStyles = {
    nearby: {
      color: 'text-green-500',
      position: { x: 0, y: 0 },
      ring: 'ring-green-500/20',
      animPulse: true
    },
    close: {
      color: 'text-blue-500',
      position: { x: -20, y: 20 },
      ring: 'ring-blue-500/20',
      animPulse: false
    },
    distant: {
      color: 'text-gray-500',
      position: { x: 30, y: -20 },
      ring: 'ring-gray-500/20',
      animPulse: false
    },
    unknown: {
      color: 'text-gray-400',
      position: { x: 40, y: 30 },
      ring: 'ring-gray-400/10',
      animPulse: false
    }
  };
  
  return {
    members,
    currentTheme: themeStyles[theme],
    proximityStyles
  };
}
