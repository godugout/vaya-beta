
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";

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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
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
      <div className="relative z-base">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 z-patterns"></div>
      </div>
      
      <h1 className="text-2xl font-bold mb-4 relative z-text text-vaya-text-primary dark:text-dark-text-primary">
        Your Profile
      </h1>
      
      {loading ? (
        <p className="z-text">Loading...</p>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 z-text text-vaya-text-primary dark:text-dark-text-primary">
              Your Families
            </h2>
            {mockFamilies.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {mockFamilies.map((family) => (
                  <Card key={family.familyId} className="z-cards dark:bg-dark-background-elevated">
                    <CardHeader>
                      <CardTitle className="text-lg">{family.familyName}</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{family.role}</p>
                    </CardHeader>
                    <CardContent>
                      {family.familyDescription && (
                        <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                          {family.familyDescription}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="z-text dark:text-dark-text-secondary">You are not a member of any families yet.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 z-text text-vaya-text-primary dark:text-dark-text-primary">
              Bookmarked Memories
            </h2>
            {mockBookmarkedMemories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockBookmarkedMemories.map((bookmark) => (
                  <Card key={bookmark.memory_id} className="z-cards dark:bg-dark-background-elevated">
                    <CardHeader>
                      <CardTitle className="text-lg">{bookmark.memories.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
                        {bookmark.memories.description}
                      </p>
                      {bookmark.memories.type === 'photo' && (
                        <img src={bookmark.memories.content_url} alt={bookmark.memories.title} className="mt-2 rounded-md z-content" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="z-text dark:text-dark-text-secondary">You have not bookmarked any memories yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
