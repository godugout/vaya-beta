
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, Users, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MemoryCapsuleTimeline } from '../capsule/MemoryCapsuleTimeline';

interface Family {
  id: string;
  name: string;
  description: string | null;
}

interface FamilyMember {
  id: string;
  name: string;
  title: string;
  description: string | null;
  birth_date: string | null;
}

export const FamilyTimelineView = () => {
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFamilyDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch first family
        const { data: familiesData, error: familyError } = await supabase
          .from('families')
          .select('id, name, description')
          .limit(1);

        if (familyError) throw familyError;
        
        if (familiesData && familiesData.length > 0) {
          const family = familiesData[0];
          setSelectedFamily(family);

          // Fetch family members for this family
          const { data: membersData, error: membersError } = await supabase
            .from('family_members')
            .select('id, name, title, description, birth_date')
            .eq('family_id', family.id);

          if (membersError) throw membersError;
          
          setFamilyMembers(membersData || []);
        }
      } catch (error: any) {
        console.error("Error loading family details:", error);
        toast({
          title: "Error loading family details",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyDetails();
  }, [toast]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
        <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
        <Skeleton className="h-6 w-48 mx-auto mb-2" />
        <Skeleton className="h-4 w-64 mx-auto mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!selectedFamily) {
    return (
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 text-center">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Families Found</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          You don't have any families set up yet. Create a family to see your timeline.
        </p>
        <Button onClick={() => window.location.href = "/create-family"}>
          <Users className="h-4 w-4 mr-2" />
          Create Family
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedFamily.name} Timeline
          </h2>
          <Button variant="outline" size="sm" onClick={() => window.location.href = "/families"}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Families
          </Button>
        </div>
        {selectedFamily.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedFamily.description}</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {familyMembers.map(member => (
            <div key={member.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{member.title}</p>
              {member.birth_date && (
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Born: {new Date(member.birth_date).getFullYear()}
                </p>
              )}
              {member.description && (
                <p className="text-xs mt-2 text-gray-500 dark:text-gray-500">
                  {member.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <MemoryCapsuleTimeline 
        onCreateCapsule={() => window.location.href = "/family-capsules"}
        onViewCapsule={(id) => window.location.href = `/capsule-details/${id}`}
      />
    </div>
  );
};

export default FamilyTimelineView;
