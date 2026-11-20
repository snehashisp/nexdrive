import { createContext, useContext } from 'react';
import { useStore } from 'zustand';

// The app store is created by <App> (src/app) and handed down through this context, so any component or
// hook can read it without importing the app layer.
export const AppStoreContext = createContext(null);

/** The store object itself (getState / setState / subscribe), for reading the latest state in handlers. */
export function useAppStoreApi() {
  const store = useContext(AppStoreContext);
  if (!store) throw new Error('useAppStoreApi must be used inside <AppStoreContext.Provider>');
  return store;
}

/** Subscribe to the store; the component re-renders when the selected value changes. */
export function useAppStore(selector) {
  return useStore(useAppStoreApi(), selector);
}
