import { useAppStore, useAppStoreApi } from '@/stores/appStoreContext';

// Subscribe to the whole app store and return it in the shape the screens' view code was written
// against: data fields and actions side by side, plus `state` (always the latest values, for use inside
// event handlers) and `props` (the preview switches).
export function useStoreFacade() {
  const api = useAppStoreApi();
  const state = useAppStore((s) => s);
  return {
    ...state,
    get state() {
      return api.getState();
    },
    props: state.preview,
    get splashRun() {
      return api.getState().timers.splashRun;
    },
    get pt() {
      return api.getState().timers.pt;
    },
  };
}
