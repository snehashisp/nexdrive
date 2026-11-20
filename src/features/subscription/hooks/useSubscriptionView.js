import { PLANS, planDiscountPercent, planPeriodLabel, planSaving, planTermLabel } from '@/domain/plans';
import {
  TODAY,
  addMonths,
  formatDate,
  formatDayMonth,
  formatFullDate,
  formatShortDate,
  parseIsoDate,
  shiftDemoDate,
  toIsoDate,
} from '@/lib/dates';
import { formatGBP } from '@/lib/format';
import { radioRing } from '@/lib/inline-styles';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the subscription, upgrade and upgrade-done screens.
export function useSubscriptionView() {
  const { common, store, s, is, sub, plan, go, trialDays, RC } = useViewContext();
  const v = { ...common };
  if (is.subscription || is.upgrade || is.upgradeDone) {
    const fp = s.sub.trialEnd;
    const endD = parseIsoDate(fp);
    endD.setUTCMonth(endD.getUTCMonth() + plan.months);
    const tg = {
      trial: ['Free trial', '#EDE9FE', '#5B21B6'],
      active: ['Active', '#DCFCE7', '#166534'],
      payment_failed: ['Payment failed', '#FEE2E2', '#991B1B'],
      expired: ['Expired', '#0A0A0F', '#FFFFFF'],
      cancelled: ['Cancelled', '#E7E7EC', '#4A4A5A'],
    }[sub];
    const rows =
      sub === 'trial'
        ? [
            { k: 'Trial ends', v: formatFullDate(fp) },
            ...(s.sub.refBonus
              ? [{ k: 'Referral free month', v: `${formatDayMonth(fp)} – ${formatDate(addMonths(fp, 1))}` }]
              : []),
            {
              k: 'First payment',
              v: `${formatGBP(plan.total)} on ${s.sub.refBonus ? formatDate(addMonths(fp, 1)) : formatDate(fp)}`,
            },
            { k: 'Billing', v: planTermLabel(plan) },
            {
              k: 'Renews',
              v:
                plan.months === 1
                  ? 'Every month until cancelled'
                  : `${formatDate(toIsoDate(endD))} for ${plan.months} more months`,
            },
            { k: 'Payment method', v: s.sub.card },
          ]
        : sub === 'active'
          ? [
              {
                k: 'Next payment',
                v: `${formatGBP(plan.total)} on ${formatDate(shiftDemoDate('2026-10-26'))}`,
              },
              { k: 'Billing', v: planTermLabel(plan) },
              { k: 'Renews', v: plan.months === 1 ? 'Every month' : formatDate(toIsoDate(endD)) },
              { k: 'Payment method', v: s.sub.card },
            ]
          : sub === 'payment_failed'
            ? [
                {
                  k: 'Failed payment',
                  v: `${formatGBP(plan.total)} on ${formatDate(shiftDemoDate('2026-10-01'))}`,
                },
                { k: 'Next retry', v: formatDate(shiftDemoDate('2026-10-10')) },
                { k: 'Access until', v: formatDate(shiftDemoDate('2026-10-14')) },
                { k: 'Payment method', v: `${s.sub.card} · declined` },
              ]
            : sub === 'expired'
              ? [
                  { k: 'Expired on', v: formatDate(shiftDemoDate('2026-09-30')) },
                  { k: 'Your records', v: 'Kept safe for 12 months' },
                  { k: 'Bookings', v: 'Read-only until you renew' },
                ]
              : [
                  { k: 'Access until', v: formatFullDate(fp) },
                  { k: 'Charges', v: 'None — you won’t be billed' },
                  { k: 'Your records', v: 'Kept for 12 months' },
                ];
    const banner = {
      trial:
        trialDays <= 3
          ? {
              t: `Your trial ends in ${trialDays} days. The ${plan.name.toLowerCase()} plan starts automatically on ${formatShortDate(fp)}.`,
              bg: '#FFFBEB',
              fg: '#78350F',
              bd: '#FDE68A',
            }
          : null,
      payment_failed: {
        t: `We couldn’t take your ${formatGBP(plan.total)} payment on ${formatDayMonth(shiftDemoDate('2026-10-01'))}. Update your card by ${formatDayMonth(shiftDemoDate('2026-10-14'))} to keep booking lessons.`,
        bg: '#FEF2F2',
        fg: '#7F1D1D',
        bd: '#FECACA',
      },
      expired: {
        t: `Your subscription expired on ${formatDayMonth(shiftDemoDate('2026-09-30'))}. Learner and lesson records are safe — renew to start booking again.`,
        bg: '#0A0A0F',
        fg: '#FFFFFF',
        bd: '#0A0A0F',
      },
      cancelled: {
        t: `Cancelled. You keep full access until ${formatShortDate(fp)} and won’t be charged.`,
        bg: '#F7F7F9',
        fg: '#0A0A0F',
        bd: '#E7E7EC',
      },
      active: null,
    }[sub];
    const higher = PLANS.filter((x) => x.months > plan.months);
    v.sb = {
      planName: plan.name,
      price: formatGBP(plan.price),
      tag: tg[0],
      tagBg: tg[1],
      tagFg: tg[2],
      rows,
      banner,
      save: planSaving(plan)
        ? `Saving ${formatGBP(planSaving(plan))} over the term vs monthly`
        : 'No commitment · cancel any time',
      canUpgrade: higher.length > 0 && (sub === 'trial' || sub === 'active'),
      maxed: !higher.length && (sub === 'trial' || sub === 'active'),
      isCancelled: sub === 'cancelled',
      canCancel: sub === 'trial' || sub === 'active',
      cancelLabel: sub === 'trial' ? 'Cancel free trial' : 'Cancel subscription',
      fixPay: sub === 'payment_failed',
      renew: sub === 'expired',
      fixPayGo: () => store.showToast(`Card updated · ${formatGBP(plan.total)} payment taken`),
      renewGo: () => {
        store.setState({ upPick: plan.key });
        store.pushScreen('upgrade');
      },
      resume: () => {
        store.setState({ sub: { ...s.sub, state: 'trial' } });
        store.showToast('Subscription resumed');
      },
      cancel: () => store.openSheet('cancelSub'),
      upgrade: go.upgrade,
      credit:
        RC.bal > 0 && sub !== 'expired'
          ? {
              bal: formatGBP(RC.bal),
              t: s.autoCredit
                ? 'Will be applied to your next payment'
                : 'Use it on your next payment or a longer plan',
            }
          : null,
      isTrial: sub === 'trial',
      trialEnd: formatFullDate(fp),
      trialLeft: `${trialDays} of 14 days left`,
      trialPct: Math.max(4, Math.round(((14 - trialDays) / 14) * 100)),
    };
    const pk = PLANS.find((x) => x.key === s.upPick) || plan;
    const same = pk.key === plan.key && sub !== 'expired';
    const charge = pk.total;
    const canCr = RC.bal > 0 && !same;
    const applied = canCr && s.useCredit ? Math.min(RC.bal, charge) : 0;
    const payable = Math.round((charge - applied) * 100) / 100;
    const when = sub === 'trial' ? `when your trial ends on ${formatShortDate(fp)}` : 'today';
    v.up = {
      opts: PLANS.map((pl) => {
        const cur = pl.key === plan.key;
        const sel = pl.key === s.upPick;
        const dis = pl.months < plan.months && sub !== 'expired';
        return {
          name: pl.name,
          term: planTermLabel(pl),
          price: formatGBP(pl.total),
          per: planPeriodLabel(pl),
          save: planSaving(pl) ? `Save ${formatGBP(planSaving(pl))} · ${planDiscountPercent(pl)}% off` : '',
          cur,
          bg: sel ? '#F7F5FF' : '#FFFFFF',
          bd: sel ? '2px solid #7C3AED' : '1.5px solid #CFCFD8',
          ring: radioRing(sel),
          op: dis ? 0.45 : 1,
          pick: dis ? () => {} : () => store.setState({ upPick: pl.key }),
        };
      }),
      summary: same
        ? 'You’re already on this plan. Choose a longer term to save more.'
        : `${pk.name} for ${formatGBP(pk.total)}${pk.months > 1 ? ` (${formatGBP(pk.price)}/month)` : ''}, starting ${when}. ${planSaving(pk) ? `You save ${formatGBP(planSaving(pk))} over the term compared with monthly.` : ''}`,
      hasCredit: canCr,
      creditAvail: formatGBP(RC.bal),
      cred: {
        bg: s.useCredit ? '#7C3AED' : '#CFCFD8',
        x: s.useCredit ? 22 : 2,
        flip: () => store.setState({ useCredit: !s.useCredit }),
      },
      rows: same
        ? []
        : [
            { k: `${pk.name} plan`, v: formatGBP(charge), c: '#0A0A0F' },
            ...(applied ? [{ k: 'NexDrive Credit', v: '−' + formatGBP(applied), c: '#166534' }] : []),
          ],
      showRows: !same,
      payable: formatGBP(payable),
      payLabel: sub === 'trial' ? `Payable on ${formatShortDate(fp)}` : 'Amount payable today',
      creditLeft: applied ? `${formatGBP(RC.bal - applied)} credit left after this payment` : '',
      price: formatGBP(payable),
      was: same ? '' : applied ? `after ${formatGBP(applied)} NexDrive Credit` : `${pk.name} plan`,
      ctaBg: same ? '#B4B4C4' : '#7C3AED',
      cta: sub === 'expired' ? 'Renew subscription' : 'Confirm upgrade',
      confirm: () => {
        if (same) return;
        const now = Date.now();
        store.setState((st) => ({
          sub: { ...st.sub, plan: pk.key, state: st.sub.state === 'cancelled' ? 'trial' : st.sub.state },
          upDone: { applied, payable, charge },
          stack: [...st.stack.slice(0, -1), { name: 'upgradeDone' }],
          credit: applied
            ? [
                ...st.credit,
                {
                  id: 'T' + now,
                  date: TODAY,
                  type: 'redeemed',
                  desc: `Applied to ${pk.name} subscription`,
                  amt: -applied,
                },
              ]
            : st.credit,
          notifs: [
            ...(applied
              ? [
                  {
                    id: 'nc' + now,
                    cat: 'rewards',
                    icon: 'gift',
                    title: 'NexDrive Credit applied',
                    body: `${formatGBP(applied)} of your NexDrive Credit has been applied to your subscription.`,
                    time: 'now',
                    unread: true,
                    act: { screen: 'credit' },
                  },
                ]
              : []),
            {
              id: 'n' + now,
              cat: 'billing',
              icon: 'upgrade',
              title: 'Subscription upgraded',
              body: `You’re now on the ${pk.name.toLowerCase()} plan · ${formatGBP(pk.total)}${applied ? `, ${formatGBP(payable)} paid after credit` : ''}.`,
              time: 'now',
              unread: true,
              act: { screen: 'subscription' },
            },
            ...st.notifs,
          ],
        }));
      },
    };
    const ud = s.upDone || { applied: 0, payable: plan.total };
    v.upd = {
      name: plan.name,
      rows: [
        { k: 'Plan', v: `${plan.name} · ${formatGBP(plan.total)}` },
        ...(ud.applied
          ? [
              { k: 'NexDrive Credit used', v: '−' + formatGBP(ud.applied) },
              { k: 'Amount paid', v: formatGBP(ud.payable) },
            ]
          : [{ k: 'Amount', v: formatGBP(ud.payable) }]),
        { k: 'Starts', v: sub === 'trial' ? `${formatShortDate(fp)}, when your trial ends` : 'Today' },
        { k: 'Saving over term', v: planSaving(plan) ? formatGBP(planSaving(plan)) : '—' },
        { k: 'Receipt sent to', v: s.inst.email },
      ],
      done: () => store.back(),
    };
  }
  return v;
}
