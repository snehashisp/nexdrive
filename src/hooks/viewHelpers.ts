import { STATUS_STYLES } from '@/domain/bookings';
import { PLANS } from '@/domain/plans';
import { REFERRAL_STATUS, referralReward } from '@/domain/referrals';
import {
  NOW,
  TODAY,
  addDays,
  formatDate,
  formatDurationLong,
  formatDurationShort,
  formatFullDate,
  formatLongDate,
  formatShortDate,
  minutesToTime,
  timeToMinutes,
} from '@/lib/dates';
import { formatGBP, initials } from '@/lib/format';

// Display values for items that appear on several screens. `store` is the object from useStoreFacade().

// A referral in the Refer & earn list.
export function referralRowView(store, r) {
  const pl = PLANS.find((p) => p.key === r.plan);
  const amt = referralReward(pl);
  const st = REFERRAL_STATUS[r.status];
  const aw = r.status === 'awarded',
    no = st.step < 0;
  return {
    id: r.id,
    name: r.name,
    plan: pl ? pl.name + ' plan' : 'Choosing a plan',
    value: pl ? formatGBP(pl.total) : '—',
    date: formatDate(r.joined),
    st,
    reward: aw ? '+' + formatGBP(amt) : no ? '£0' : pl ? `${formatGBP(amt)} pending` : '—',
    amtC: aw ? '#166534' : '#6B6B7B',
    open: () => store.openSheet('referralDetail', { rid: r.id }),
  };
}

// A lesson card (dashboard, calendar, lists).
export function bookingCardView(store, b) {
  const L = store.learner(b.lid) || { name: 'Unknown learner' };
  const st = STATUS_STYLES[b.status];
  const price = b.rate * b.dur,
    fin = Math.max(0, price - b.discount);
  const sm = timeToMinutes(b.start),
    em = sm + Math.round(b.dur * 60);
  return {
    id: b.id,
    lid: b.lid,
    name: L.name,
    first: L.name.split(' ')[0],
    initials: initials(L.name),
    archived: !!L.archived,
    date: formatShortDate(b.date),
    dateLong: formatLongDate(b.date),
    dateFull: formatFullDate(b.date),
    start: b.start,
    end: minutesToTime(em),
    range: `${b.start}–${minutesToTime(em)}`,
    dur: formatDurationLong(b.dur),
    durS: formatDurationShort(b.dur),
    loc: b.loc,
    pc: b.pc,
    price: formatGBP(price),
    rate: `${formatGBP(b.rate)}/hr × ${formatDurationShort(b.dur)}`,
    hasDisc: b.discount > 0,
    disc: '−' + formatGBP(b.discount),
    fin: formatGBP(fin),
    st,
    cancelled: b.status === 'cancelled',
    deco: b.status === 'cancelled' ? 'line-through' : 'none',
    prev: b.prev ? `${formatShortDate(b.prev.date)}, ${b.prev.start}` : '',
    reason: b.reason || '',
    pkg: !!b.pkg,
    pct: Math.max(4, Math.min(100, Math.round(((NOW - sm) / (b.dur * 60)) * 100))),
    dayLabel:
      b.date === TODAY ? 'Today' : b.date === addDays(TODAY, 1) ? 'Tomorrow' : formatShortDate(b.date),
    open: () => store.pushScreen('lesson', { bid: b.id }),
  };
}
