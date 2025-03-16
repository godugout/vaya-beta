
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Users, Key, BookOpen, Image } from "lucide-react";
import { FamilySecretManager } from "@/components/family/FamilySecretManager";

interface FamilyMember {
  id: string;
  user_id: string;
  role: string;
  profiles: {
    full_name: string;
    avatar_url: string | null;
  } | null;
}

interface Family {
  id: string;
  name: string;
  description: string | null;
  members: FamilyMember[];
}

export default function FamilyDetail() {
  const { familyId } = useParams<{ familyId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("members");

  useEffect(() => {
    if (familyId) {
      getFamily(familyId);
    }
  }, [familyId]);

  const getFamily = async (id: string) => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get family details with members
      const { data, error } = await supabase
        .from("families")
        .select(`
          id,
          name,
          description,
          members:family_members(
            id,
            user_id,
            role,
            profiles:profiles(
              full_name,
              avatar_url
            )
          )
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;
      
      // Find the current user's role in this family
      const currentMember = data.members.find((m: any) => m.user_id === user?.id);
      if (currentMember) {
        setUserRole(currentMember.role);
      }
      
      setFamily(data);
    } catch (error: any) {
      console.error("Error loading family:", error);
      toast({
        title: "Error",
        description: "Failed to load family details",
        variant: "destructive",
      });
      navigate("/families");
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = userRole === "admin";

  return (
    <MainLayout>
      <div className="container py-8 max-w-6xl">
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-lovable-magenta rounded-full"></div>
          </div>
        ) : family ? (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">{family.name}</h1>
                {family.description && (
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{family.description}</p>
                )}
              </div>
              
              {isAdmin && (
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => navigate(`/edit-family/${family.id}`)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Family
                </Button>
              )}
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
                <TabsTrigger value="members" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Members</span>
                </TabsTrigger>
                {isAdmin && (
                  <TabsTrigger value="access" className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    <span className="hidden sm:inline">Access</span>
                  </TabsTrigger>
                )}
                <TabsTrigger value="stories" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Stories</span>
                </TabsTrigger>
                <TabsTrigger value="photos" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  <span className="hidden sm:inline">Photos</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="members">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Family Members</span>
                      {isAdmin && (
                        <Button 
                          size="sm" 
                          onClick={() => navigate(`/invite-member/${family.id}`)}
                        >
                          Invite Member
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {family.members.map((member) => (
                        <div 
                          key={member.id} 
                          className="p-4 border rounded-lg flex items-center gap-3"
                        >
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            {member.profiles?.avatar_url ? (
                              <img 
                                src={member.profiles.avatar_url}
                                alt={member.profiles.full_name}
                                className="h-full w-full rounded-full object-cover"
                              />
                            ) : (
                              <span>{member.profiles?.full_name?.charAt(0) || '?'}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">
                              {member.profiles?.full_name || 'Unknown User'}
                            </div>
                            <div className="text-xs text-gray-500 capitalize">
                              {member.role}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {isAdmin && (
                <TabsContent value="access">
                  <FamilySecretManager familyId={family.id} />
                </TabsContent>
              )}
              
              <TabsContent value="stories">
                <Card>
                  <CardHeader>
                    <CardTitle>Family Stories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      This is where family stories will be displayed.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="photos">
                <Card>
                  <CardHeader>
                    <CardTitle>Family Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      This is where family photos will be displayed.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold">Family not found</h2>
            <p className="mt-2">The family you're looking for doesn't exist or you don't have access to it.</p>
            <Button 
              className="mt-4"
              onClick={() => navigate("/families")}
            >
              Back to Families
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
