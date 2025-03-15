
import React from 'react';
import { motion } from "framer-motion";
import { FamilyCard } from "./FamilyCard";
import { EmptyFamiliesState } from "./EmptyFamiliesState";

interface Family {
  id: string;
  name: string;
  description: string | null;
  members: {
    id: string;
    user_id: string;
    role: string;
    profiles: {
      full_name: string;
      avatar_url: string | null;
    };
  }[];
}

interface FamiliesGridViewProps {
  families: Family[];
  loading: boolean;
  onFamilySelected: (familyId: string) => void;
  onFamilyUpdated: () => void;
}

export const FamiliesGridView = ({ 
  families, 
  loading, 
  onFamilySelected, 
  onFamilyUpdated 
}: FamiliesGridViewProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {families.map((family) => (
        <FamilyCard 
          key={family.id} 
          family={family} 
          onFamilySelected={onFamilySelected}
          onFamilyUpdated={onFamilyUpdated} 
        />
      ))}

      {!loading && families.length === 0 && <EmptyFamiliesState />}
    </motion.div>
  );
};
