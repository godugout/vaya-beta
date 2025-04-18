
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
    profile: {
      full_name: string;
      avatar_url: string | null;
    } | null;
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
      setLoading(true);
      console.log("Fetching families data...");
      
      const { data, error } = await supabase
        .from('families')
        .select(`
          id,
          name,
          description,
          members:family_members(
            id,
            user_id,
            role
          )
        `);

      if (error) throw error;
      
      // Log the raw data to help debug
      console.log("Raw families data:", data);
      
      if (data && Array.isArray(data)) {
        // For each family member, separately fetch their profile
        const processedFamilies = await Promise.all(data.map(async (family) => {
          const membersWithProfiles = await Promise.all((family.members || []).map(async (member) => {
            if (!member.user_id) {
              return {
                ...member,
                profile: { full_name: "Unknown", avatar_url: null }
              };
            }
            
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('full_name, avatar_url')
              .eq('id', member.user_id)
              .single();
              
            if (profileError) {
              console.error("Error fetching profile:", profileError);
              return {
                ...member,
                profile: { full_name: "Unknown", avatar_url: null }
              };
            }
            
            return {
              ...member,
              profile: profileData
            };
          }));
          
          return {
            ...family,
            members: membersWithProfiles
          };
        }));
        
        console.log("Processed families data:", processedFamilies);
        setFamilies(processedFamilies);
        
        // Set the first family as selected if available
        if (processedFamilies.length > 0 && !selectedFamilyId) {
          setSelectedFamilyId(processedFamilies[0].id);
        }
      } else {
        setFamilies([]);
      }
    } catch (error: any) {
      console.error("Error loading families:", error);
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
