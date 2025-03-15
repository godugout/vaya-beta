
import { useState } from "react";
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
  const [loading, setLoading] = useState(false);

  // Example data for display purposes
  const mockFamilies: UserFamily[] = [
    {
      familyId: "1",
      familyName: "González Family",
      familyDescription: "A close-knit Costa Rican family with roots in Guanacaste",
      role: "member"
    },
    {
      familyId: "2",
      familyName: "Hernández Family",
      familyDescription: "Extended family from San José",
      role: "admin"
    }
  ];

  // Mock bookmarked memories
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
    },
    {
      memory_id: "2",
      memories: {
        id: "2",
        title: "Grandmother's Recipe",
        description: "Traditional gallo pinto recipe",
        type: "text",
        content_url: ""
      }
    }
  ];

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Families</h2>
            {mockFamilies.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {mockFamilies.map((family) => (
                  <div key={family.familyId} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg">{family.familyName}</h3>
                    <p className="text-sm text-gray-500 mb-2">{family.role}</p>
                    {family.familyDescription && (
                      <p className="text-sm text-gray-700">
                        {family.familyDescription}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>You are not a member of any families yet.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Bookmarked Memories</h2>
            {mockBookmarkedMemories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockBookmarkedMemories.map((bookmark) => (
                  <div key={bookmark.memory_id} className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="font-semibold">{bookmark.memories.title}</h3>
                    <p className="text-sm text-gray-500">{bookmark.memories.description}</p>
                    {bookmark.memories.type === 'photo' && (
                      <img src={bookmark.memories.content_url} alt={bookmark.memories.title} className="mt-2 rounded-md" />
                    )}
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
};
