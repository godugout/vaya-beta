
// Define table type mappings for use with the Supabase client
export type DatabaseTables = {
  families: 'families';
  family_members: 'family_members';
  profiles: 'profiles';
  photos: 'photos';
  stories: 'stories';
  vaya_families: 'families';
  vaya_family_members: 'family_members';
  vaya_memories: 'memories';
  vaya_stories: 'stories';
  vaya_photos: 'photos';
  vaya_bookmarks: 'bookmarks';
  vaya_localized_prompts: 'localized_prompts';
  vaya_capsule_schedules: 'capsule_schedules';
  capsule_schedules: 'capsule_schedules';
};

// This is a helper type to map table names to their original names
export type TableNameMapping = {
  [K in keyof DatabaseTables]: DatabaseTables[K];
};
