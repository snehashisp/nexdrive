// Subscription state.
// A Zustand slice: actions read the store with get() and write with get().setState(update, callback).
export const createSubscriptionSlice = (set, get) => ({
  subState() {
    return get().sub.state === 'cancelled' ? 'cancelled' : get().preview.subscriptionState || 'active';
  },
});
