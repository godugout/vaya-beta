
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Home, Heart, Camera, BookOpen, TreeDeciduous } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { EditFamilyDialog } from "@/components/family/EditFamilyDialog";
import { motion } from "framer-motion";
import FamilyTreeBuilder from "@/components/family/tree/FamilyTreeBuilder";

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
  const navigate = useNavigate();
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="container max-w-6xl py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Your Families</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Connect with your loved ones and share your legacy</p>
          </div>
          
          <Button 
            onClick={() => navigate("/create-family")}
            size="sm"
            className="mt-4 md:mt-0 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Family
          </Button>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <Button 
              variant={activeView === 'grid' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveView('grid')}
              className={`rounded-md ${activeView === 'grid' ? 'bg-black text-white dark:bg-white dark:text-black' : ''}`}
            >
              <Home className="h-4 w-4 mr-2" />
              Homes
            </Button>
            <Button 
              variant={activeView === 'tree' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveView('tree')}
              className={`rounded-md ${activeView === 'tree' ? 'bg-black text-white dark:bg-white dark:text-black' : ''}`}
            >
              <TreeDeciduous className="h-4 w-4 mr-2" />
              Tree
            </Button>
            <Button 
              variant={activeView === 'timeline' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveView('timeline')}
              className={`rounded-md ${activeView === 'timeline' ? 'bg-black text-white dark:bg-white dark:text-black' : ''}`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Timeline
            </Button>
          </div>
        </div>

        {activeView === 'grid' && (
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {families.map((family) => (
              <motion.div key={family.id} variants={item}>
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300 border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                  <div className="h-24 bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-300"></div>
                  <CardHeader className="relative pb-2">
                    <div className="absolute -top-12 left-6 h-16 w-16 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-md">
                      <Users className="h-8 w-8 text-black dark:text-white" />
                    </div>
                    <div className="ml-20">
                      <CardTitle className="text-xl font-semibold">
                        {family.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {family.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {family.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          {family.members.slice(0, 3).map((member, index) => (
                            <div 
                              key={member.id} 
                              className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-black flex items-center justify-center text-xs font-medium"
                              style={{ zIndex: 10 - index }}
                            >
                              {member.profiles.full_name.charAt(0)}
                            </div>
                          ))}
                          {family.members.length > 3 && (
                            <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-black flex items-center justify-center text-xs text-gray-600 dark:text-gray-400 font-medium" style={{ zIndex: 1 }}>
                              +{family.members.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {family.members.length} members
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setSelectedFamilyId(family.id);
                            setActiveView('tree');
                          }}
                          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                        >
                          <TreeDeciduous className="h-4 w-4" />
                        </Button>
                        <EditFamilyDialog family={family} onFamilyUpdated={getFamilies} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {!loading && families.length === 0 && (
              <motion.div 
                className="col-span-full" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
                      <Heart className="h-12 w-12 text-black dark:text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Create Your First Family</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
                      Start your family journey by creating your first family group. Invite members and begin preserving your legacy together.
                    </p>
                    <Button 
                      onClick={() => navigate("/create-family")}
                      size="lg"
                      className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Create New Family
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
        
        {activeView === 'tree' && (
          <div className="rounded-lg">
            {selectedFamilyId ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {families.find(f => f.id === selectedFamilyId)?.name} Family Tree
                  </h2>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveView('grid')}
                    >
                      Back to Families
                    </Button>
                  </div>
                </div>
                <FamilyTreeBuilder 
                  familyId={selectedFamilyId}
                  initialMembers={families.find(f => f.id === selectedFamilyId)?.members}
                />
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 text-center">
                <TreeDeciduous className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select a Family</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Please select a family to view and edit its family tree.</p>
                <Button onClick={() => setActiveView('grid')}>
                  View Families
                </Button>
              </div>
            )}
          </div>
        )}
        
        {activeView === 'timeline' && (
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Family Timeline</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Coming soon! See your family's journey through time with an interactive timeline.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
