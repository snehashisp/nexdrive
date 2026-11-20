import { createStore } from 'zustand/vanilla';
import { createAppSlice } from './appSlice';
import { initialState } from './initialState';
import { createDemoSlice } from '@/demo/demoSlice';
import { createBookingsSlice } from '@/features/bookings/stores/bookingsSlice';
import { createLearnersSlice } from '@/features/learners/stores/learnersSlice';
import { createNotificationsSlice } from '@/features/notifications/stores/notificationsSlice';
import { createOnboardingSlice } from '@/features/onboarding/stores/onboardingSlice';
import { createReferralsSlice } from '@/features/referrals/stores/referralsSlice';
import { createSettingsSlice } from '@/features/settings/stores/settingsSlice';
import { createSubscriptionSlice } from '@/features/subscription/stores/subscriptionSlice';

// The single app store (Zustand), composed from one slice per feature. Data and actions sit side by side;
// a slice calls another feature's action through get(), so features never import each other.
// `preview` holds the preview switches (device size, start screen, subscription state, offline…).
export function createAppStore(preview) {
  return createStore((set, get) => ({
    ...initialState(
      preview.startAt === 'onboarding' ? 'onboarding' : 'app',
      preview.dataState || 'populated',
    ),
    preview,
    // Timer handles and counters that are not display state.
    timers: {},
    init: initialState,
    // React-style setState: merge an object (or the result of updater(state)), then run the callback.
    setState(update, callback) {
      set(update);
      callback?.();
    },
    ...createAppSlice(set, get),
    ...createDemoSlice(set, get),
    ...createNotificationsSlice(set, get),
    ...createOnboardingSlice(set, get),
    ...createLearnersSlice(set, get),
    ...createBookingsSlice(set, get),
    ...createReferralsSlice(set, get),
    ...createSettingsSlice(set, get),
    ...createSubscriptionSlice(set, get),
  }));
}
