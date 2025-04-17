
// This file re-exports all hooks from the separate files
// for backward compatibility

export * from './hooks/useStoriesList';
export * from './hooks/useStoryDetails';
export * from './hooks/useStoryMutations';

// Re-export the main hooks with the original names to maintain backward compatibility
export { useStoriesList as useStories } from './hooks/useStoriesList';
export { useStoryDetails as useStory } from './hooks/useStoryDetails';
