import { choiceColors } from '@/lib/inline-styles';
import { PLANS } from '@/domain/plans';
import { PENDING_REFERRAL_STATUSES, referralReward } from '@/domain/referrals';
import { formatDate, shiftDemoDate } from '@/lib/dates';
import { formatGBP } from '@/lib/format';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the NexDrive Credit screen.
export function useCreditView() {
  const { common, store, s, is, sub, plan, go, RC } = useViewContext();
  const v = { ...common };
  if (is.credit) {
    let run = 0;
    const tx = s.credit
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((t) => {
        run += t.amt;
        return { ...t, bal: run };
      })
      .reverse()
      .filter((t) => s.crFilter === 'all' || (s.crFilter === 'earned' ? t.amt > 0 : t.amt < 0));
    const pend = s.refs
      .filter((r) => PENDING_REFERRAL_STATUSES.includes(r.status) && r.plan)
      .reduce((a, r) => a + referralReward(PLANS.find((p) => p.key === r.plan)), 0);
    const cover = Math.min(RC.bal, plan.total);
    v.cr = {
      bal: formatGBP(RC.bal),
      earned: formatGBP(RC.earned),
      used: formatGBP(RC.used),
      pending: formatGBP(pend),
      auto: {
        bg: s.autoCredit ? '#7C3AED' : '#CFCFD8',
        x: s.autoCredit ? 22 : 2,
        flip: () => {
          store.setState({ autoCredit: !s.autoCredit });
          store.showToast(
            !s.autoCredit ? 'Credit will be applied to your next payment' : 'Credit will be kept for later',
            'neutral',
          );
        },
      },
      nextText:
        sub === 'active'
          ? `Next payment ${formatGBP(plan.total)} on ${formatDate(shiftDemoDate('2026-10-26'))}${RC.bal > 0 ? ` · ${formatGBP(cover)} would be covered` : ''}`
          : 'Applied when your next payment is due',
      filters: [
        ['all', 'All'],
        ['earned', 'Earned'],
        ['used', 'Used'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(s.crFilter === x[0]),
        pick: () => store.setState({ crFilter: x[0] }),
      })),
      tx: tx.map((t) => ({
        date: formatDate(t.date),
        desc: t.desc,
        type: t.amt > 0 ? 'Referral credit' : 'Credit used',
        tb: t.amt > 0 ? '#DCFCE7' : '#F7F7F9',
        tf: t.amt > 0 ? '#166534' : '#4A4A5A',
        amt: (t.amt > 0 ? '+' : '−') + formatGBP(Math.abs(t.amt)),
        ac: t.amt > 0 ? '#166534' : '#0A0A0F',
        bal: `Balance ${formatGBP(t.bal)}`,
      })),
      hasTx: tx.length > 0,
      noTx: !tx.length,
      canUpgrade: PLANS.some((x) => x.months > plan.months) && RC.bal > 0,
      upgrade: () => {
        store.setState({ useCredit: true });
        go.upgrade();
      },
    };
  }
  return v;
}
