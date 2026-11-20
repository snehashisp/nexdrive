import { choiceColors } from '@/lib/inline-styles';
import { FUTURE_STATUSES, compareBookings } from '@/domain/bookings';
import { bookingCardView } from '@/hooks/viewHelpers';
import { TODAY, addDays, formatLongDate } from '@/lib/dates';
import { formatGBP } from '@/lib/format';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the bookings list (upcoming and history).
export function useBookingsView() {
  const { common, store, s, is, go, B, fin } = useViewContext();
  const v: View = { ...common };
  if (is.bookings) {
    const hf = s.hf;
    const upAll = B.filter((b) => FUTURE_STATUSES.includes(b.status)).sort(compareBookings);
    const groups = [];
    upAll.forEach((b) => {
      const lab =
        b.date === TODAY
          ? 'TODAY'
          : b.date === addDays(TODAY, 1)
            ? 'TOMORROW'
            : formatLongDate(b.date).toUpperCase();
      let g = groups[groups.length - 1];
      if (!g || g.label !== lab) {
        g = { label: lab, items: [] };
        groups.push(g);
      }
      g.items.push(bookingCardView(store, b));
    });
    let hist = B.filter((b) => b.status === 'completed' || b.status === 'cancelled' || b.prev);
    if (hf.status !== 'all')
      hist = hist.filter((b) => (hf.status === 'rescheduled' ? !!b.prev : b.status === hf.status));
    if (hf.learner !== 'all') hist = hist.filter((b) => b.lid === hf.learner);
    if (hf.range === 'month') hist = hist.filter((b) => b.date.slice(0, 7) === TODAY.slice(0, 7));
    if (hf.range === '30') hist = hist.filter((b) => b.date >= addDays(TODAY, -30));
    hist.sort((a, b) => compareBookings(b, a));
    const comp = hist.filter((b) => b.status === 'completed');
    v.bk = {
      segs: (
        [
          ['upcoming', 'Upcoming'],
          ['history', 'History'],
        ] as const
      ).map((x) => ({
        t: x[1],
        ...choiceColors(s.bkSeg === x[0]),
        pick: () => store.setState({ bkSeg: x[0] }),
      })),
      isUp: s.bkSeg === 'upcoming',
      isHist: s.bkSeg === 'history',
      groups,
      noUp: s.bkSeg === 'upcoming' && !upAll.length,
      statuses: (
        [
          ['all', 'All'],
          ['completed', 'Completed'],
          ['cancelled', 'Cancelled'],
          ['rescheduled', 'Rescheduled'],
        ] as const
      ).map((x) => ({
        t: x[1],
        ...choiceColors(hf.status === x[0]),
        pick: () => store.setState({ hf: { ...hf, status: x[0] } }),
      })),
      learnerOpts: [{ v: 'all', t: 'All learners' }].concat(
        s.learners.map((l) => ({ v: l.id, t: l.name + (l.archived ? ' (removed)' : '') })),
      ),
      learner: hf.learner,
      hLearner: (e) => store.setState({ hf: { ...hf, learner: e.target.value } }),
      range: hf.range,
      rangeOpts: [
        { v: 'all', t: 'All time' },
        { v: 'month', t: 'This month' },
        { v: '30', t: 'Last 30 days' },
      ],
      hRange: (e) => store.setState({ hf: { ...hf, range: e.target.value } }),
      hist: hist.map((b) => bookingCardView(store, b)),
      hasHist: hist.length > 0,
      noHist: !hist.length,
      summary: `${hist.length} record${hist.length === 1 ? '' : 's'} · ${formatGBP(comp.reduce((a, b) => a + fin(b), 0))} from completed lessons`,
      filtered: hf.status !== 'all' || hf.learner !== 'all' || hf.range !== 'all',
      reset: () => store.setState({ hf: { status: 'all', learner: 'all', range: 'all' } }),
      newBooking: go.newBooking,
    };
  }
  return v;
}
