import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";
import { Loader2, User as UserIcon, Users, Bookmark, FileText, Bell } from "lucide-react";

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
}

interface Family {
  id: string;
  name: string;
  role: string;
}

interface BookmarkedMemory {
  memory_id: string;
  memories: {
    id: string;
    type: string;
    created_at: string;
    title?: string;
    description?: string;
  }
}

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [families, setFamilies] = useState<Family[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkedMemory[]>([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUser(user);

      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch family memberships
      const { data: familyData, error: familyError } = await supabase
        .from('family_members')
        .select(`
          family_id,
          role,
          families (
            id,
            name
          )
        `)
        .eq('user_id', user.id);

      if (familyError) throw familyError;
      setFamilies(familyData.map(f => ({
        id: f.families.id,
        name: f.families.name,
        role: f.role
      })));

      // Fetch bookmarks with memory details
      const { data: bookmarkData, error: bookmarkError } = await supabase
        .from('bookmarks')
        .select(`
          memory_id,
          memories (
            id,
            type,
            created_at,
            title:stories!inner(title),
            description:stories!inner(description)
          )
        `)
        .eq('created_by', user.id);

      if (bookmarkError) throw bookmarkError;
      setBookmarks(bookmarkData || []);

    } catch (error: any) {
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-10">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile?.avatar_url ?? undefined} />
              <AvatarFallback>
                <UserIcon className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{profile?.full_name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Member of {families.length} {families.length === 1 ? 'family' : 'families'}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="families" className="space-y-4">
        <TabsList>
          <TabsTrigger value="families">
            <Users className="h-4 w-4 mr-2" />
            Families
          </TabsTrigger>
          <TabsTrigger value="bookmarks">
            <Bookmark className="h-4 w-4 mr-2" />
            Bookmarks
          </TabsTrigger>
          <TabsTrigger value="artifacts">
            <FileText className="h-4 w-4 mr-2" />
            Artifacts
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Bell className="h-4 w-4 mr-2" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="families">
          <Card>
            <CardHeader>
              <CardTitle>Your Families</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {families.map(family => (
                  <div key={family.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{family.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{family.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookmarks">
          <Card>
            <CardHeader>
              <CardTitle>Your Bookmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookmarks.map(bookmark => (
                  <div key={bookmark.memory_id} className="flex items-start gap-4">
                    <Bookmark className="h-4 w-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">
                        {bookmark.memories?.title || 'Untitled Memory'}
                      </h3>
                      {bookmark.memories?.description && (
                        <p className="text-sm text-muted-foreground">
                          {bookmark.memories.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(bookmark.memories.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="artifacts">
          <Card>
            <CardHeader>
              <CardTitle>Your Artifacts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}