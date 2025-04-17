
// This file re-exports all hooks from the separate files
// for backward compatibility

export * from './hooks/useCapsulesList';
export * from './hooks/useCapsuleDetails';
export * from './hooks/useCapsuleMutations';

// Re-export the main hook with the original name to maintain backward compatibility
export { useCapsulesList as useCapsules } from './hooks/useCapsulesList';
export { useCapsuleDetails as useCapsule } from './hooks/useCapsuleDetails';
