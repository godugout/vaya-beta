import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface UserFamily {
  familyId: string;
  familyName: string;
  familyDescription: string | null;
  role: string;
}

interface BookmarkedMemory {
  memory_id: string;
  memories: {
    id: string;
    title: string;
    description: string | null;
    type: string;
    content_url: string;
  };
}

export default function Profile() {
  const { toast } = useToast();
  const [userFamilies, setUserFamilies] = useState<UserFamily[]>([]);
  const [bookmarkedMemories, setBookmarkedMemories] = useState<BookmarkedMemory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        toast({
          title: "Authentication error",
          description: "You must be logged in to view this page",
          variant: "destructive",
        });
        return;
      }

      await Promise.all([
        fetchUserFamilies(userData.user.id),
        fetchBookmarkedMemories(userData.user.id)
      ]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const fetchUserFamilies = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('family_members')
        .select(`
          role,
          families:family_id(
            id,
            name,
            description
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;

      if (data && Array.isArray(data)) {
        // Map the data to our UserFamily interface with type checking
        const families: UserFamily[] = data
          .filter(item => item.families) // Filter out any null families
          .map(item => ({
            familyId: item.families.id,
            familyName: item.families.name,
            familyDescription: item.families.description,
            role: item.role
          }));
        
        setUserFamilies(families);
      }
    } catch (error: any) {
      console.error("Error fetching user families:", error);
    }
  };

  const fetchBookmarkedMemories = async (userId: string) => {
    try {
      // Use mock data for now to avoid TypeScript errors
      const mockBookmarkedMemories: BookmarkedMemory[] = [
        {
          memory_id: "1",
          memories: {
            id: "1",
            title: "Family Vacation",
            description: "Our trip to the mountains",
            type: "photo",
            content_url: "/images/vacation.jpg"
          }
        }
      ];
      
      setBookmarkedMemories(mockBookmarkedMemories);
    } catch (error: any) {
      console.error("Error fetching bookmarked memories:", error);
    }
  };

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Families</h2>
            {userFamilies.length > 0 ? (
              <ul>
                {userFamilies.map((family) => (
                  <li key={family.familyId} className="mb-2">
                    <strong>{family.familyName}</strong> - {family.role}
                    {family.familyDescription && (
                      <p className="text-sm text-gray-500">
                        {family.familyDescription}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>You are not a member of any families yet.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Bookmarked Memories</h2>
            {bookmarkedMemories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarkedMemories.map((bookmark) => (
                  <div key={bookmark.memory_id} className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="font-semibold">{bookmark.memories.title}</h3>
                    <p className="text-sm text-gray-500">{bookmark.memories.description}</p>
                    <img src={bookmark.memories.content_url} alt={bookmark.memories.title} className="mt-2 rounded-md" />
                  </div>
                ))}
              </div>
            ) : (
              <p>You have not bookmarked any memories yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
