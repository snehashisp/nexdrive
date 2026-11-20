import { useEffect, useRef, useState } from 'react';
import { useStore } from 'zustand';
import AppView from './AppView';
import { createAppStore } from './store/createAppStore';
import { buildViewModel } from './viewModel';

// Preview settings, carried over from the design tool. Change them here (or pass them as props from
// main.tsx) to start the app in a different state.
const DEFAULT_PREVIEW = {
  device: 'phone', // 'phone' | 'large' | 'tablet': size of the phone frame on desktop
  startAt: 'dashboard', // 'dashboard' | 'onboarding'
  launchAnimation: true,
  dataState: 'populated', // 'populated' | 'empty'
  subscriptionState: 'active', // 'active' | 'trial' | 'payment_failed' | 'expired'
  offline: false, // true shows the offline banner and makes sending messages fail
};

// Identifies the visible screen, so the scroll position can be reset when it changes.
function screenKey(s) {
  const top = s.stack[s.stack.length - 1];
  return s.phase + s.ob + s.tab + s.stack.length + (top ? top.name + JSON.stringify(top.params || {}) : '');
}

// The whole NexDrive app. All data and every action that changes it live in the app store
// (store/createAppStore.js: one slice per feature). This component subscribes to the store, hands the
// state to buildViewModel() (viewModel.js), which prepares display-ready values, and <AppView> draws the
// screens from those values.
export default function App(props) {
  const [store] = useState(() => createAppStore({ ...DEFAULT_PREVIEW, ...props }));
  const state = useStore(store);
  const scrollRef = useRef(null);

  // Listeners and timers (resize, clock, splash, ?ref= links) for the lifetime of the app.
  useEffect(() => store.getState().mount(), [store]);

  // Reload the demo data if the dataState preview switch changes.
  const { dataState } = props;
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    store.getState().reseed(dataState || 'populated');
  }, [store, dataState]);

  // When the visible screen changes, scroll the new screen back to the top.
  const key = screenKey(state);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [key]);

  // The view model was written against the old class component (`app.state`, `app.props`, `app.x()`);
  // this object gives it the same shape until each screen reads the store through its own hook.
  const app = {
    ...state,
    get state() {
      return store.getState();
    },
    props: state.preview,
    get splashRun() {
      return store.getState().timers.splashRun;
    },
    get pt() {
      return store.getState().timers.pt;
    },
  };
  return <AppView v={buildViewModel(app)} scrollRef={scrollRef} />;
}
