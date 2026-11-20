import { bookingCardView } from '@/hooks/viewHelpers';
import { NOW, TODAY, addDays, formatLongDate, formatShortDate, timeToMinutes } from '@/lib/dates';
import { formatGBP, initials } from '@/lib/format';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the Home (dashboard) screen.
export function useHomeView() {
  const { common, store, s, is, sub, B, active, fut, unread, trialDays, RC } = useViewContext();
  const v = { ...common };
  if (is.home) {
    const todayB = B.filter((b) => b.date === TODAY && b.status !== 'cancelled');
    const ongoing = B.find((b) => b.status === 'ongoing');
    const nextOne = fut.find((b) => b.date === TODAY && timeToMinutes(b.start) > NOW);
    const mins = nextOne ? timeToMinutes(nextOne.start) - NOW : 99;
    const fin = (b) => Math.max(0, b.rate * b.dur - b.discount);
    const done = todayB.filter((b) => b.status === 'completed');
    const inc = active.filter((l) => store.missing(l).length).length;
    const wk = fut.filter((b) => b.date <= addDays(TODAY, 7));
    let banner = null;
    if (sub === 'payment_failed')
      banner = {
        t: 'Payment failed. Update your card to keep booking lessons.',
        bg: '#FEF2F2',
        fg: '#991B1B',
        bd: '#FECACA',
      };
    else if (sub === 'expired')
      banner = {
        t: 'Your subscription has expired. Renew to create bookings.',
        bg: '#0A0A0F',
        fg: '#FFFFFF',
        bd: '#0A0A0F',
      };
    else if (sub === 'trial' && trialDays <= 3)
      banner = {
        t: `Free trial ends in ${trialDays} days · ${formatShortDate(s.sub.trialEnd)}`,
        bg: '#FFFBEB',
        fg: '#92400E',
        bd: '#FDE68A',
      };
    const nx =
      nextOne && mins <= 30 && s.reminder && s.prefs.reminder
        ? {
            ...bookingCardView(store, nextOne),
            mins,
            nav: () => store.openSheet('maps', { bid: nextOne.id }),
          }
        : null;
    v.hm = {
      initials: initials(s.inst.name),
      unread: unread || '',
      dateLabel: formatLongDate(TODAY).toUpperCase(),
      greeting: `${NOW < 720 ? 'Good morning' : NOW < 1080 ? 'Good afternoon' : 'Good evening'}, ${s.inst.name.split(' ')[0]}`,
      banner,
      reminder: nx,
      ongoing: ongoing ? bookingCardView(store, ongoing) : null,
      next: fut.slice(0, 2).map((b) => bookingCardView(store, b)),
      hasNext: fut.length > 0,
      noNext: fut.length === 0,
      todayN: todayB.length,
      todaySub: todayB.length ? `${done.length} done · ${ongoing ? '1 now' : '0 now'}` : 'Nothing booked',
      weekN: wk.length,
      weekSub: `${wk.reduce((a, b) => a + b.dur, 0)} hours booked`,
      earnDone: formatGBP(done.reduce((a, b) => a + fin(b), 0)),
      earnSub: `of ${formatGBP(todayB.reduce((a, b) => a + fin(b), 0))} booked today`,
      activeN: active.length,
      activeSub: inc ? `${inc} need${inc > 1 ? '' : 's'} details` : 'All profiles complete',
      activeSubC: inc ? '#92400E' : '#6B6B7B',
    };
    if (!active.length && !B.length) v.hm.activeSub = 'Add your first learner';
  }
  v.dismissReminder = () => store.setState({ reminder: false });
  if (v.hm)
    v.hm.ref = {
      bal: formatGBP(RC.bal),
      sub: s.refs.length
        ? `${RC.ok} successful referral${RC.ok === 1 ? '' : 's'} · ${RC.pend} pending`
        : 'Invite an instructor and earn credit',
    };
  return v;
}
