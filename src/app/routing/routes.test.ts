import { describe, expect, it } from 'vitest';
import { openPath, parentPathFor, pathFor } from './routes';
import { createAppStore } from '@/app/store/createAppStore';
import type { Preview } from '@/types/store';

const preview = (over: Partial<Preview> = {}): Preview => ({
  device: 'phone',
  startAt: 'dashboard',
  launchAnimation: false,
  dataState: 'populated',
  subscriptionState: 'active',
  offline: false,
  ...over,
});

describe('URLs round-trip through the store', () => {
  it.each([
    '/',
    '/calendar',
    '/learners',
    '/account',
    '/learners/L2',
    '/learners/L2/edit',
    '/learners/new',
    '/lessons',
    '/lessons/new',
    '/lessons/b13',
    '/lessons/b13/reschedule',
    '/notifications',
    '/referrals',
    '/referrals/share',
    '/credit',
    '/account/subscription',
    '/account/subscription/upgrade',
    '/account/profile',
    '/account/pricing',
    '/account/bank-details',
    '/account/preferences',
    '/account/security',
  ])('%s opens the screen whose URL is %s', (path) => {
    const store = createAppStore(preview());
    expect(openPath(store.getState(), path)).toBe(true);
    expect(pathFor(store.getState())).toBe(path);
  });

  it('prepares forms the way the buttons do', () => {
    const store = createAppStore(preview());
    openPath(store.getState(), '/account/profile');
    expect(store.getState().profForm?.name).toBe(store.getState().inst.name);
    openPath(store.getState(), '/lessons/b13/reschedule');
    expect(store.getState().draft).toMatchObject({ mode: 'edit', bid: 'b13' });
  });

  it('puts the parent screen underneath, so in-app back works after a deep link', () => {
    const store = createAppStore(preview());
    openPath(store.getState(), '/learners/L2/edit');
    expect(parentPathFor(store.getState())).toBe('/learners/L2');
    store.getState().back();
    expect(pathFor(store.getState())).toBe('/learners/L2');
  });

  it('rejects unknown paths and missing records', () => {
    const store = createAppStore(preview());
    expect(openPath(store.getState(), '/nope')).toBe(false);
    expect(openPath(store.getState(), '/learners/L999')).toBe(false);
    expect(openPath(store.getState(), '/start/register')).toBe(false);
  });
});

describe('onboarding URLs', () => {
  it('map to the onboarding steps', () => {
    const store = createAppStore(preview({ startAt: 'onboarding' }));
    expect(pathFor(store.getState())).toBe('/start');
    expect(openPath(store.getState(), '/start/verify')).toBe(true);
    expect(pathFor(store.getState())).toBe('/start/verify');
    expect(openPath(store.getState(), '/learners')).toBe(false);
  });
});
