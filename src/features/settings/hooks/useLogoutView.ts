import type { Sheet } from '@/types/models';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the log-out sheet.
export function useLogoutView() {
  const { common, store, s } = useViewContext();
  const v: View = { ...common };
  const S: Sheet = s.sheet || ({} as Sheet);
  if (S.type === 'logout')
    v.lo = {
      confirm: () => {
        clearTimeout(store.pt);
        store.setState({ ...store.init('onboarding', 'empty'), vw: s.vw, vh: s.vh }, () => {
          if (store.launchOn()) store.startSplash();
        });
      },
      keep: () => store.setState({ sheet: null }),
    };
  return v;
}
