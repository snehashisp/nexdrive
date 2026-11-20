import { formatDurationLong } from '@/lib/dates';
import { formatGBP, initials } from '@/lib/format';
import { ERROR_COLOR } from '@/lib/inline-styles';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the Account (More) tab.
export function useMoreView() {
  const { common, store, s, is, sub, plan, unread, trialDays, RC } = useViewContext();
  const v: View = { ...common };
  if (is.more) {
    v.mo = {
      name: s.inst.name,
      initials: initials(s.inst.name),
      adi: `ADI ${s.inst.adi} · ${s.inst.status === 'adi' ? 'Approved Driving Instructor' : 'Trainee instructor'}`,
      badge: s.inst.status === 'adi' ? '#16A34A' : '#EC4899',
      business: s.inst.business || 'Independent instructor',
      subSub: {
        trial: `Free trial · ${trialDays} days left`,
        active: `${plan.name} · Active`,
        payment_failed: 'Payment failed · action needed',
        expired: 'Expired · renew to book',
        cancelled: 'Cancelled · no charge',
      }[sub],
      subC: {
        trial: '#6D28D9',
        active: '#166534',
        payment_failed: ERROR_COLOR,
        expired: ERROR_COLOR,
        cancelled: '#6B6B7B',
      }[sub],
      bankSub: s.bank
        ? `Sort code ••-••-${s.bank.sort.slice(-2)} · Acc ••••${s.bank.acct.slice(-4)}`
        : 'Not added — learners won’t see payment details',
      bankC: s.bank ? '#6B6B7B' : '#92400E',
      refSub: `${formatGBP(RC.bal)} credit · ${s.refCode}`,
      priceSub: `${formatGBP(s.inst.rates[0].rate)}/hr · ${formatDurationLong(s.inst.defaultDur)} default`,
      unread: unread ? `${unread} unread` : 'All caught up',
      logout: () => store.openSheet('logout'),
    };
  }
  return v;
}
