import { PLANS } from '@/domain/plans';
import type { SubscriptionActions, SliceCreator } from '@/types/store';
// Subscription state.
// A Zustand slice: actions read the store with get() and write with get().setState(update, callback).
export const createSubscriptionSlice: SliceCreator<SubscriptionActions> = (_set, get) => ({
  // Open the upgrade screen with the next longer plan preselected.
  openUpgrade() {
    const plan = PLANS.find((x) => x.key === get().sub.plan) || PLANS[1];
    const longer = PLANS.find((x) => x.months > plan.months);
    get().setState({ upPick: longer ? longer.key : plan.key });
    get().pushScreen('upgrade');
  },
  subState() {
    return get().sub.state === 'cancelled' ? 'cancelled' : get().preview.subscriptionState || 'active';
  },
});
