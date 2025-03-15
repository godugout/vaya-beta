
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { FamiliesHeader } from "@/components/family/FamiliesHeader";
import { FamilyViewSwitcher } from "@/components/family/FamilyViewSwitcher";
import { FamiliesGridView } from "@/components/family/FamiliesGridView";
import { FamilyTreeViewComponent } from "@/components/family/FamilyTreeView";
import { FamilyTimelineView } from "@/components/family/FamilyTimelineView";

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

export default function Families() {
  const { toast } = useToast();
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'grid' | 'tree' | 'timeline'>('grid');
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);

  useEffect(() => {
    getFamilies();
  }, []);

  const getFamilies = async () => {
    try {
      const { data, error } = await supabase
        .from('families')
        .select(`
          id,
          name,
          description,
          members:family_members(
            id,
            user_id,
            role,
            profiles:profiles!user_id(
              full_name,
              avatar_url
            )
          )
        `);

      if (error) throw error;
      
      // Type safety check to ensure we have valid data
      if (data && Array.isArray(data)) {
        // Properly map the data to match the Family type structure
        const safeData = data.map(item => ({
          id: item.id as string,
          name: item.name as string,
          description: item.description as string | null,
          members: (item.members || []).map((member: any) => ({
            id: member.id as string,
            user_id: member.user_id as string,
            role: member.role as string,
            // Ensure profiles is properly mapped as a single object, not an array
            profiles: member.profiles && member.profiles.length > 0 
              ? {
                  full_name: member.profiles[0].full_name as string,
                  avatar_url: member.profiles[0].avatar_url as string | null
                }
              : {
                  full_name: "Unknown",
                  avatar_url: null
                }
          }))
        }));
        
        setFamilies(safeData);
        
        // Set the first family as selected if available
        if (safeData.length > 0 && !selectedFamilyId) {
          setSelectedFamilyId(safeData[0].id);
        }
      } else {
        setFamilies([]);
      }
    } catch (error: any) {
      toast({
        title: "Error loading families",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFamilySelected = (familyId: string) => {
    setSelectedFamilyId(familyId);
    setActiveView('tree');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="container max-w-6xl py-8">
        <FamiliesHeader />
        
        <FamilyViewSwitcher activeView={activeView} setActiveView={setActiveView} />

        {activeView === 'grid' && (
          <FamiliesGridView 
            families={families} 
            loading={loading} 
            onFamilySelected={handleFamilySelected}
            onFamilyUpdated={getFamilies}
          />
        )}
        
        {activeView === 'tree' && (
          <div className="rounded-lg">
            <FamilyTreeViewComponent 
              selectedFamilyId={selectedFamilyId}
              families={families}
              onBackToFamilies={() => setActiveView('grid')}
            />
          </div>
        )}
        
        {activeView === 'timeline' && <FamilyTimelineView />}
      </div>
    </div>
  );
}
