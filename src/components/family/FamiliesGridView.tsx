
import React from 'react';
import { motion } from "framer-motion";
import { FamilyCard } from "./FamilyCard";
import { EmptyFamiliesState } from "./EmptyFamiliesState";
import { Skeleton } from "@/components/ui/skeleton";

interface Family {
  id: string;
  name: string;
  description: string | null;
  members: {
    id: string;
    role: string;
    profile: {
      full_name: string;
      avatar_url: string | null;
    } | null;
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

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((index) => (
          <div key={`skeleton-${index}`} className="h-64">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

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
