import type { SubscriptionActions, SliceCreator } from '@/types/store';
// Subscription state.
// A Zustand slice: actions read the store with get() and write with get().setState(update, callback).
export const createSubscriptionSlice: SliceCreator<SubscriptionActions> = (_set, get) => ({
  subState() {
    return get().sub.state === 'cancelled' ? 'cancelled' : get().preview.subscriptionState || 'active';
  },
});
