import { useEffect } from 'react';
import type { StoreApi } from 'zustand';
import { openPath, parentPathFor, pathFor } from './routes';
import type { AppStore } from '@/types/store';

interface Synced {
  path: string;
  parentPath: string;
  depth: number;
  phase: string;
}
const snapshot = (s: AppStore): Synced => ({
  path: pathFor(s),
  parentPath: parentPathFor(s),
  depth: s.stack.length,
  phase: s.phase,
});

// Keeps the address bar and browser history in step with the store's navigation:
// - opening a screen adds a history entry; in-app "back" goes back in history;
// - the browser's back/forward buttons (and bookmarks / shared links on load) show the matching screen.
// The URL is updated once per tick, after the store settles, so an action that resets and then opens a
// screen (as the demo workflows do) is one step. history.state.depth records the stack depth of each
// entry this app created, so in-app "back" only steps back in history when the previous entry is the
// screen underneath.
export function useUrlSync(store: StoreApi<AppStore>) {
  useEffect(() => {
    // A deep link on first load: open that screen (unknown or unreachable paths fall back to the default).
    if (window.location.pathname !== '/') openPath(store.getState(), window.location.pathname);

    let synced = snapshot(store.getState());
    window.history.replaceState({ depth: synced.depth }, '', synced.path + window.location.hash);
    // history.back() calls of our own whose popstate has not arrived yet.
    let ownBacks = 0;
    let scheduled = false;

    const sync = () => {
      scheduled = false;
      const prev = synced;
      synced = snapshot(store.getState());
      const { path, depth, phase } = synced;
      if (path === window.location.pathname) return;
      if (phase === 'app' && prev.phase === 'app' && depth === prev.depth + 1) {
        window.history.pushState({ depth }, '', path);
      } else if (
        phase === prev.phase &&
        depth === prev.depth - 1 &&
        window.history.state?.depth === prev.depth &&
        path === prev.parentPath
      ) {
        ownBacks++;
        window.history.back();
      } else {
        window.history.replaceState({ depth }, '', path);
      }
    };
    const unsubscribe = store.subscribe(() => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(sync);
    });

    const onPopState = () => {
      const s = store.getState();
      const path = window.location.pathname;
      if (ownBacks > 0) {
        // Our own in-app back: the store has already moved; make sure the URL shows where it is now.
        ownBacks--;
        synced = snapshot(s);
        if (path !== synced.path) window.history.replaceState({ depth: synced.depth }, '', synced.path);
        return;
      }
      if (path === pathFor(s)) return;
      if (s.stack.length && path === parentPathFor(s)) s.back();
      else if (!openPath(s, path)) window.history.replaceState({ depth: s.stack.length }, '', pathFor(s));
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      unsubscribe();
      window.removeEventListener('popstate', onPopState);
    };
  }, [store]);
}
