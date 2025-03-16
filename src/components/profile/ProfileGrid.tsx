
import { ProfileCard } from "@/components/profile/ProfileCard";
import { UserProfile } from "@/components/profile/types";
import { Users, Search } from "lucide-react";

interface ProfileGridProps {
  profiles: UserProfile[];
  isSearching?: boolean;
}

export function ProfileGrid({ profiles, isSearching = false }: ProfileGridProps) {
  if (profiles.length === 0) {
    return (
      <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
        {isSearching ? (
          <>
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No matching profiles found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Try adjusting your search or check the spelling of the name you're looking for.
            </p>
          </>
        ) : (
          <>
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No profiles yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Click the "Seed Patel Family" button to create profile entries for the wedding celebration.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}
