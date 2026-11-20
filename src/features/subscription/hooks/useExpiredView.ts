import type { Sheet } from '@/types/models';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the subscription-expired sheet.
export function useExpiredView() {
  const { common, store, s, plan } = useViewContext();
  const v: View = { ...common };
  const S: Sheet = s.sheet || ({} as Sheet);
  if (S.type === 'expired')
    v.ex = {
      renew: () => {
        store.setState({ sheet: null, upPick: plan.key });
        store.pushScreen('upgrade');
      },
    };
  return v;
}
