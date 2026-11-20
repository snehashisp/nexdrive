import type { AppActions, AppStore, SliceCreator } from '@/types/store';
import { withLiveStatus } from '@/domain/bookings';
import { NOW, TODAY, syncClock, timeToMinutes } from '@/lib/dates';

// App shell: navigation stack, sheets, toasts, splash, clock, config.
// A Zustand slice: actions read the store with get() and write with get().setState(update, callback).
export const createAppSlice: SliceCreator<AppActions> = (_set, get) => ({
  // Start listeners and timers when <App> mounts; the returned function stops them.
  mount() {
    const timers = get().timers;
    const onResize = () => get().setState({ vw: window.innerWidth, vh: window.innerHeight });
    window.addEventListener('resize', onResize);
    onResize();
    const clock = setInterval(() => get().tick(), 15000);
    const onVisible = () => {
      if (!document.hidden) get().tick();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);
    try {
      const q = new URLSearchParams(window.location.search).get('ref');
      if (q)
        get().startRefOnboarding(
          q
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '')
            .slice(0, 16),
          'link',
        );
    } catch {
      // Best effort: not available in every browser or context.
    }
    if (get().launchOn()) get().startSplash();
    else get().schedulePush();
    return () => {
      window.removeEventListener('resize', onResize);
      clearInterval(clock);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
      for (const k of ['pt', 'pt2', 'tt', 'st1', 'st2'] as const) clearTimeout(timers[k]);
    };
  },
  cfg() {
    return (typeof window !== 'undefined' && window.NEXDRIVE_CONFIG) || {};
  },
  launchOn() {
    return get().preview.launchAnimation !== false && get().cfg().launchAnimation !== false;
  },
  failing() {
    return !!get().preview.offline;
  },
  startSplash() {
    clearTimeout(get().timers.st1);
    clearTimeout(get().timers.st2);
    clearTimeout(get().timers.pt);
    clearTimeout(get().timers.pt2);
    get().timers.splashRun = (get().timers.splashRun || 0) + 1;
    get().setState({ splash: true, splashOut: false, push: false });
    get().timers.st1 = setTimeout(() => get().setState({ splashOut: true }), 2700);
    get().timers.st2 = setTimeout(() => {
      get().setState({ splash: false, splashOut: false });
      get().schedulePush();
    }, 3150);
  },
  skipSplash() {
    clearTimeout(get().timers.st1);
    clearTimeout(get().timers.st2);
    get().setState({ splashOut: true });
    get().timers.st2 = setTimeout(() => {
      get().setState({ splash: false, splashOut: false });
      get().schedulePush();
    }, 300);
  },
  tick() {
    const pd = TODAY,
      pn = NOW;
    syncClock();
    if (pd === TODAY && pn === NOW) return;
    const s = get();
    const ch: Partial<AppStore> = { bookings: s.bookings.map(withLiveStatus) };
    if (s.calDate === pd && pd !== TODAY) ch.calDate = TODAY;
    get().setState(ch, () => {
      const st = get();
      if (st.phase !== 'app' || !st.reminder || !st.prefs.reminder) return;
      const nb = get().nextLesson();
      if (nb && nb.id !== get().timers._pushed && timeToMinutes(nb.start) - NOW <= (+st.prefs.mins || 30))
        get().schedulePush();
    });
  },
  reseed(data, extra = {}, cb) {
    const n = get().init('app', data);
    get().setState({ ...n, vw: get().vw, vh: get().vh, ...extra }, () => {
      get().schedulePush();
      cb?.();
    });
  },
  cur() {
    const s = get();
    return s.stack.length ? s.stack[s.stack.length - 1] : { name: s.tab, params: {} };
  },
  pushScreen(name, params = {}) {
    get().setState((s) => ({ stack: [...s.stack, { name, params }], sheet: null }));
  },
  replaceTop(items) {
    get().setState((s) => ({ stack: [...s.stack.slice(0, -1), ...items], sheet: null }));
  },
  back() {
    get().setState((s) => ({ stack: s.stack.slice(0, -1), sheet: null }));
  },
  goTab(t) {
    get().setState({ tab: t, stack: [], sheet: null });
  },
  showToast(text, kind = 'ok') {
    clearTimeout(get().timers.tt);
    get().setState({ toast: { text, kind } });
    get().timers.tt = setTimeout(() => get().setState({ toast: null }), 3000);
  },
  openSheet(type, p = {}) {
    get().setState({ sheet: { type, ...p } });
  },
  setIn(key, field) {
    // Accepts an input change event or a plain value.
    return (e) => {
      const t = (e as { target?: HTMLInputElement } | null)?.target;
      const v = e && t ? (t.type === 'checkbox' ? t.checked : t.value) : e;
      get().setState((s) => ({ [key]: { ...(s[key] as object), [field]: v } }));
    };
  },
  copy(t, msg) {
    try {
      navigator.clipboard?.writeText(t).catch(() => {});
    } catch {
      // Best effort: not available in every browser or context.
    }
    get().showToast(msg);
  },
  openExt(url) {
    try {
      window.open(url, '_blank', 'noopener');
    } catch {
      // Best effort: not available in every browser or context.
    }
  },
});
