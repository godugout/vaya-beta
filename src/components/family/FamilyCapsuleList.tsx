
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CapsuleData } from "@/components/capsule/types";
import { CapsuleListSkeleton } from "./capsule-list/CapsuleListSkeleton";
import { EmptyCapsuleState } from "./capsule-list/EmptyCapsuleState";
import { CapsuleListHeader } from "./capsule-list/CapsuleListHeader";
import { CapsuleCard } from "./capsule-list/CapsuleCard";

interface FamilyCapsuleListProps {
  familyId?: string;
  limit?: number;
  className?: string;
}

const FamilyCapsuleList = ({ familyId, limit = 6, className = "" }: FamilyCapsuleListProps) => {
  const [capsules, setCapsules] = useState<CapsuleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCapsules = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('capsules')
          .select(`
            id, 
            title, 
            description, 
            created_at, 
            updated_at,
            reveal_date,
            status,
            creator_id,
            family_id,
            profiles(id, full_name),
            families(id, name),
            capsule_items(count)
          `)
          .order('created_at', { ascending: false });

        if (familyId) {
          query = query.eq('family_id', familyId);
        }
        
        if (limit) {
          query = query.limit(limit);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data) {
          const formattedCapsules: CapsuleData[] = data.map(capsule => ({
            id: capsule.id,
            title: capsule.title,
            description: capsule.description,
            created_at: capsule.created_at,
            updated_at: capsule.updated_at,
            reveal_date: capsule.reveal_date,
            status: capsule.status,
            creator_id: capsule.creator_id,
            family_id: capsule.family_id,
            creator: capsule.profiles?.[0] ? {
              id: capsule.profiles[0].id,
              name: capsule.profiles[0].full_name
            } : null,
            family: capsule.families?.[0] ? {
              id: capsule.families[0].id,
              name: capsule.families[0].name
            } : null,
            item_count: capsule.capsule_items?.[0]?.count || 0
          }));
          
          setCapsules(formattedCapsules);
        }
      } catch (error) {
        console.error('Error fetching capsules:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCapsules();
  }, [familyId, limit]);

  if (isLoading) {
    return <CapsuleListSkeleton />;
  }

  return (
    <div className={className}>
      <CapsuleListHeader />
      
      {capsules.length === 0 ? (
        <EmptyCapsuleState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capsules.map((capsule, index) => (
            <CapsuleCard 
              key={capsule.id} 
              capsule={capsule} 
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FamilyCapsuleList;
