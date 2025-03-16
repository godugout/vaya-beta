
import { UserProfile } from "@/components/profile/types";
import { ProfileLoading } from "@/components/profile/ProfileLoading";
import { ProfileGrid } from "@/components/profile/ProfileGrid";

interface ProfileResultsProps {
  profiles: UserProfile[];
  loading: boolean;
  isSearching: boolean;
}

export const ProfileResults = ({ 
  profiles, 
  loading,
  isSearching
}: ProfileResultsProps) => {
  return (
    <>
      {loading ? (
        <ProfileLoading /> 
      ) : (
        <ProfileGrid 
          profiles={profiles} 
          isSearching={isSearching} 
        />
      )}
    </>
  );
};
