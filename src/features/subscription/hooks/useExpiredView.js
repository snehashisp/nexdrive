import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the subscription-expired sheet.
export function useExpiredView() {
  const { common, store, s, plan } = useViewContext();
  const v = { ...common };
  const S = s.sheet || {};
  if (S.type === 'expired')
    v.ex = {
      renew: () => {
        store.setState({ sheet: null, upPick: plan.key });
        store.pushScreen('upgrade');
      },
    };
  return v;
}
