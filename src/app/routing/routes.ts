// Each screen's URL. The store's navigation state (phase, onboarding step, tab, stack) stays the source of
// truth; useUrlSync keeps the address bar and browser history in step with it. This file converts in both
// directions: pathFor(state) gives the URL of what is on screen, openPath(store, path) shows the screen
// for a URL (a deep link, a bookmark or the browser's back/forward buttons).
import type { AppStore } from '@/types/store';

type NavState = Pick<AppStore, 'phase' | 'ob' | 'tab' | 'stack' | 'draft'>;

export const TAB_PATHS: Record<string, string> = {
  home: '/',
  calendar: '/calendar',
  learners: '/learners',
  more: '/account',
};

/** Screens opened on top of a tab, by stack name. `:param` is filled from the stack entry's params. */
export const SCREEN_PATHS: Record<string, string> = {
  learner: '/learners/:lid',
  learnerForm: '/learners/:lid/edit',
  lesson: '/lessons/:bid',
  bookings: '/lessons',
  notifications: '/notifications',
  subscription: '/account/subscription',
  upgrade: '/account/subscription/upgrade',
  upgradeDone: '/account/subscription/upgraded',
  profile: '/account/profile',
  pricing: '/account/pricing',
  bank: '/account/bank-details',
  prefs: '/account/preferences',
  security: '/account/security',
  referrals: '/referrals',
  referralQr: '/referrals/share',
  credit: '/credit',
};

const ONBOARDING_STEPS = ['welcome', 'register', 'verify', 'details', 'plan', 'started'];

/** The URL of what is on screen. */
export function pathFor(s: NavState): string {
  if (s.phase === 'onboarding') return s.ob === 'welcome' ? '/start' : `/start/${s.ob}`;
  const top = s.stack[s.stack.length - 1];
  if (!top) return TAB_PATHS[s.tab] || '/';
  if (top.name === 'booking')
    return s.draft?.mode === 'edit' && s.draft.bid ? `/lessons/${s.draft.bid}/reschedule` : '/lessons/new';
  if (top.name === 'learnerForm' && !top.params?.lid) return '/learners/new';
  const pattern = SCREEN_PATHS[top.name];
  if (!pattern) return TAB_PATHS[s.tab] || '/';
  return pattern.replace(/:(\w+)/g, (_, k) => encodeURIComponent(String(top.params?.[k] ?? '')));
}

/** The URL of the screen underneath the current one (what in-app "back" shows). */
export function parentPathFor(s: NavState): string {
  return pathFor({ ...s, stack: s.stack.slice(0, -1) });
}

/**
 * Show the screen for `path`, opening it the same way the app's own buttons do (so forms are prepared).
 * Returns false when the path is not a screen the user can reach right now.
 */
export function openPath(store: AppStore, path: string): boolean {
  const parts = path.replace(/\/+$/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const [a, b, c] = parts;

  if (a === 'start') {
    const step = b || 'welcome';
    if (store.phase !== 'onboarding' || !ONBOARDING_STEPS.includes(step)) return false;
    store.setState({ ob: step });
    return true;
  }
  if (store.phase !== 'app') return false;

  // Start from a clean tab, then open the screen (and any screen under it) as the buttons would.
  const reset = (tab: string) => store.setState({ tab, stack: [], sheet: null });
  const tab = Object.entries(TAB_PATHS).find(([, p]) => p === '/' + (a || ''))?.[0];
  if (parts.length <= 1 && tab) return (store.goTab(tab), true);

  switch (a) {
    case 'learners': {
      reset('learners');
      if (b === 'new') return (store.openLearnerForm(null, null), true);
      if (!store.learner(b)) return false;
      store.pushScreen('learner', { lid: b });
      if (c === 'edit') store.openLearnerForm(b, null);
      return true;
    }
    case 'lessons': {
      reset('home');
      if (!b) return (store.pushScreen('bookings'), true);
      if (b === 'new') return (store.openBooking(null), true);
      if (!store.booking(b)) return false;
      store.pushScreen('lesson', { bid: b });
      if (c === 'reschedule') store.openEdit(b);
      return true;
    }
    case 'notifications':
      reset('home');
      return (store.pushScreen('notifications'), true);
    case 'referrals':
      reset('home');
      store.pushScreen('referrals');
      if (b === 'share') store.pushScreen('referralQr');
      return true;
    case 'credit':
      reset('home');
      return (store.pushScreen('credit'), true);
    case 'account': {
      reset('more');
      const open: Record<string, () => void> = {
        profile: () => store.openProfile(),
        pricing: () => store.openPricing(),
        'bank-details': () => store.openBankDetails(),
        preferences: () => store.pushScreen('prefs'),
        security: () => store.openSecurity(),
        subscription: () => {
          store.pushScreen('subscription');
          if (c === 'upgrade') store.openUpgrade();
        },
      };
      if (!b || !open[b]) return false;
      open[b]();
      return true;
    }
    default:
      return false;
  }
}
