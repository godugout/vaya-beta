
import { ProfileSearch } from "@/components/profile/ProfileSearch";
import { ProfileResults } from "@/components/profile/ProfileResults";
import { useProfileManagement } from "@/components/profile/hooks/useProfileManagement";

export function ProfilesSection() {
  const {
    userProfiles,
    filteredProfiles,
    loading,
    handleSearch,
    isSearching
  } = useProfileManagement();

  return (
    <div>
      <ProfileSearch 
        onSearch={handleSearch} 
        totalProfiles={userProfiles.length}
        filteredCount={filteredProfiles.length}
      />
      <ProfileResults 
        profiles={filteredProfiles} 
        loading={loading} 
        isSearching={isSearching}
      />
    </div>
  );
}
