import type { Sheet } from '@/types/models';
import { formatFullDate } from '@/lib/dates';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the cancel-subscription sheet.
export function useCancelSubscriptionView() {
  const { common, store, s, sub } = useViewContext();
  const v: View = { ...common };
  const S: Sheet = s.sheet || ({} as Sheet);
  if (S.type === 'cancelSub')
    v.cs = {
      title: sub === 'trial' ? 'Cancel your free trial?' : 'Cancel your subscription?',
      body:
        sub === 'trial'
          ? `You won’t be charged. You keep full access until ${formatFullDate(s.sub.trialEnd)}, then bookings become read-only. Learner and lesson records are kept for 12 months.`
          : 'Your plan stays active until the end of your current term, then won’t renew. You won’t be charged again after that.',
      confirm: () => {
        store.setState({ sub: { ...s.sub, state: 'cancelled' }, sheet: null });
        store.showToast(
          sub === 'trial' ? 'Free trial cancelled · no charge' : 'Subscription will not renew',
          'neutral',
        );
      },
      keep: () => store.setState({ sheet: null }),
    };
  return v;
}
