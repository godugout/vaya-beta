
// Define table type mappings for use with the Supabase client
export type DatabaseTables = {
  families: 'families';
  family_members: 'family_members';
  profiles: 'profiles';
  photos: 'photos';
  stories: 'stories';
  vaya_families: 'vaya_families';
  vaya_family_members: 'vaya_family_members';
  vaya_memories: 'vaya_memories';
  vaya_stories: 'vaya_stories';
  vaya_photos: 'vaya_photos';
  vaya_bookmarks: 'vaya_bookmarks';
  vaya_localized_prompts: 'vaya_localized_prompts';
  vaya_capsule_schedules: 'vaya_capsule_schedules';
  capsule_schedules: 'capsule_schedules';
  user_activities: 'user_activities';
};

// This is a helper type to map table names to their original names
export type TableNameMapping = {
  [K in keyof DatabaseTables]: DatabaseTables[K];
};

// Map database tables to their respective types
export const TABLE_NAMES: TableNameMapping = {
  families: 'families',
  family_members: 'family_members',
  profiles: 'profiles',
  photos: 'photos',
  stories: 'stories',
  vaya_families: 'vaya_families',
  vaya_family_members: 'vaya_family_members',
  vaya_memories: 'vaya_memories',
  vaya_stories: 'vaya_stories',
  vaya_photos: 'vaya_photos',
  vaya_bookmarks: 'vaya_bookmarks',
  vaya_localized_prompts: 'vaya_localized_prompts',
  vaya_capsule_schedules: 'vaya_capsule_schedules',
  capsule_schedules: 'capsule_schedules',
  user_activities: 'user_activities'
};
