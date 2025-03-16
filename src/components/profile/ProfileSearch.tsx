
import { useState } from "react";
import { SearchInput } from "@/components/input/SearchInput";

interface ProfileSearchProps {
  onSearch: (query: string) => void;
  totalProfiles: number;
  filteredCount: number;
}

export const ProfileSearch = ({ 
  onSearch, 
  totalProfiles, 
  filteredCount 
}: ProfileSearchProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-vaya-text-primary dark:text-dark-text-primary">
        All Profiles ({filteredCount}/{totalProfiles})
      </h2>
      <SearchInput 
        placeholder="Search by name, email, or address..." 
        onChange={onSearch}
        className="max-w-xl"
      />
    </div>
  );
};
