import { formatDate, shiftDemoDate } from '@/lib/dates';
import { BORDER_COLOR, ERROR_COLOR } from '@/lib/inline-styles';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the security (password) screen.
export function useSecurityView() {
  const { common, store, s, is } = useViewContext();
  const v: View = { ...common };
  v.pwChanged = formatDate(shiftDemoDate('2026-09-26'));
  if (is.security) {
    const f = s.pw;
    const e =
      f && s.pwTried
        ? {
            ...(!f.cur ? { cur: 'Enter your current password' } : {}),
            ...(f.nw.length < 8 || !/\d/.test(f.nw)
              ? { nw: 'Use at least 8 characters, including a number' }
              : {}),
            ...(f.nw !== f.conf ? { conf: 'Passwords don’t match' } : {}),
          }
        : {};
    v.sec = {
      phone: s.inst.phone,
      email: s.inst.email,
      open: !!f,
      toggle: () => store.setState({ pw: f ? null : { cur: '', nw: '', conf: '' }, pwTried: false }),
      pwLabel: f ? 'Cancel' : 'Change',
      f: f || { cur: '', nw: '', conf: '' },
      e,
      b: {
        cur: e.cur ? ERROR_COLOR : BORDER_COLOR,
        nw: e.nw ? ERROR_COLOR : BORDER_COLOR,
        conf: e.conf ? ERROR_COLOR : BORDER_COLOR,
      },
      h: { cur: store.setIn('pw', 'cur'), nw: store.setIn('pw', 'nw'), conf: store.setIn('pw', 'conf') },
      save: () => {
        if (!f.cur || f.nw.length < 8 || !/\d/.test(f.nw) || f.nw !== f.conf)
          return store.setState({ pwTried: true });
        store.setState({ pw: null });
        store.showToast('Password changed');
      },
      logout: () => store.openSheet('logout'),
      verified: () => store.showToast('Already verified', 'neutral'),
    };
  }
  return v;
}
