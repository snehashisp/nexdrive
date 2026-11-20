import { PLANS } from '@/domain/plans';
import { REFERRAL_STATUS, REFERRAL_STEPS, referralReward } from '@/domain/referrals';
import { referralRowView } from '@/hooks/viewHelpers';
import { formatDate, pad } from '@/lib/dates';
import { formatGBP } from '@/lib/format';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the referral detail sheet.
export function useReferralDetailView() {
  const { common, store, s } = useViewContext();
  const v = { ...common };
  if (s.sheet && s.sheet.type === 'referralDetail') {
    const r = s.refs.find((x) => x.id === s.sheet.rid);
    if (r) {
      const b = referralRowView(store, r);
      const step = REFERRAL_STATUS[r.status].step;
      const pl = PLANS.find((x) => x.key === r.plan);
      const failAt = r.plan ? 3 : 2;
      v.rd = {
        ...b,
        failed: step < 0,
        reason: r.reason || '',
        calc: pl
          ? `${formatGBP(pl.total)} × 20% = ${formatGBP(referralReward(pl))}`
          : 'Worked out when they choose a plan',
        awarded: r.awardedOn ? formatDate(r.awardedOn) : '',
        steps: REFERRAL_STEPS.map((t, i) => {
          const done = step < 0 ? i < failAt : i <= step;
          const cur = step >= 0 && i === step + 1;
          const bad = step < 0 && i === failAt;
          return {
            t,
            n: pad(i + 1),
            c: done ? '#7C3AED' : bad ? '#DC2626' : '#E7E7EC',
            nc: done || bad ? '#FFFFFF' : '#6B6B7B',
            fg: done || cur || bad ? '#0A0A0F' : '#9A9AAA',
            d: done ? 'Done' : cur ? (step === 1 ? 'Next' : 'In progress') : bad ? 'Stopped' : '',
            dc: done ? '#166534' : bad ? '#B91C1C' : '#6D28D9',
          };
        }),
        demoQualify:
          store.cfg().showDemoPanel !== false && ['trial', 'free_month', 'confirmed'].includes(r.status)
            ? () => store.qualify(r.id)
            : null,
      };
    }
  }
  return v;
}
