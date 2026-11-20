import { useViewContext } from '@/hooks/useViewContext';
import { currentTimeHHMM } from '@/lib/dates';

const OB_HEADER_STEPS = ['register', 'verify', 'details', 'plan'];
const OB_FOOTER_STEPS = [...OB_HEADER_STEPS, 'started'];

// Display values for the app shell: phone frame, status bar, bottom nav, toast, sheet overlay, splash, and
// which screen (`is`) and which footer to show.
export function useShellView() {
  const {
    store,
    s,
    p,
    ic,
    ics,
    icl,
    fr,
    frameless,
    panel,
    tablet,
    statusBar,
    sbH,
    padB,
    is,
    showNav,
    nav,
    go,
  } = useViewContext();
  const v = {
    ic,
    ics,
    icl,
    fr,
    frameless,
    panel,
    tablet,
    statusBar,
    sbH,
    padB,
    navPadB: frameless ? 0 : tablet ? 8 : 20,
    sbBg: is.ob_welcome ? '#0A0A0F' : '#FFFFFF',
    sbFg: is.ob_welcome ? '#FFFFFF' : '#0A0A0F',
    scrBg: '#FFFFFF',
    offline: !!p.offline && s.phase === 'app',
    is,
    showNav,
    nav,
    go,
    stop: (e) => e.stopPropagation(),
    closeSheet: () => store.setState({ sheet: null }),
    push: s.push && s.phase === 'app',
    clockTime: currentTimeHHMM(),
    toastB: showNav ? (frameless ? 76 : 96) : padB + 84,
    toast: s.toast
      ? {
          text: s.toast.text,
          bg: s.toast.kind === 'warn' ? '#92400E' : s.toast.kind === 'err' ? '#991B1B' : '#0A0A0F',
          icon: s.toast.kind === 'warn' || s.toast.kind === 'err' ? ics.warn : ics.check,
        }
      : null,
    sheetOpen: !!s.sheet,
    splash: s.splash
      ? { run: store.splashRun, fadingOut: !!s.splashOut, onSkip: () => store.skipSplash() }
      : null,
    obHeader: s.phase === 'onboarding' && OB_HEADER_STEPS.includes(s.ob),
    obFooter: s.phase === 'onboarding' && OB_FOOTER_STEPS.includes(s.ob),
  };
  if (s.splash) {
    v.sbBg = '#0A0A0F';
    v.sbFg = '#FFFFFF';
  }
  const sh = {};
  if (s.sheet) sh[s.sheet.type] = true;
  v.sh = sh;
  return v;
}
