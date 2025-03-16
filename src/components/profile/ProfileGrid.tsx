
import { ProfileCard } from "@/components/profile/ProfileCard";
import { UserProfile } from "@/components/profile/types";

interface ProfileGridProps {
  profiles: UserProfile[];
}

export function ProfileGrid({ profiles }: ProfileGridProps) {
  if (profiles.length === 0) {
    return (
      <p className="text-center py-8 text-gray-500">
        No profiles found. Click the "Seed Patel Family" button to create profile entries.
      </p>
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
