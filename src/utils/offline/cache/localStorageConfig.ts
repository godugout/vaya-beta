
import localforage from 'localforage';

// Initialize localForage instance for family data
export const familyTreeStore = localforage.createInstance({
  name: 'familyTreeCache',
  storeName: 'familyGraphs'
});
