
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

export const FamilyTimelineView = () => {
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFamilies();
  }, []);

  const fetchFamilies = async () => {
    try {
      setLoading(true);
      
      const { data: familiesData, error } = await supabase
        .from('families')
        .select('id, name, description');

      if (error) throw error;
      
      console.log("Families loaded for timeline:", familiesData);
      
      if (familiesData && familiesData.length > 0) {
        setFamilies(familiesData);
        setSelectedFamily(familiesData[0]);
      }
    } catch (error: any) {
      console.error("Error loading families for timeline:", error);
      toast({
        title: "Error loading families",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  if (families.length === 0) {
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
      {selectedFamily && (
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
        </div>
      )}
      
      <MemoryCapsuleTimeline 
        onCreateCapsule={() => window.location.href = "/family-capsules"}
        onViewCapsule={(id) => window.location.href = `/capsule-details/${id}`}
      />
    </div>
  );
};
