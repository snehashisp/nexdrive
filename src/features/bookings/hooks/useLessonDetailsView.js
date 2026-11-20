import { FUTURE_STATUSES } from '@/domain/bookings';
import { bookingCardView } from '@/hooks/viewHelpers';
import { NOW, TODAY, daysBetween, formatDurationShort, timeToMinutes } from '@/lib/dates';
import { formatGBP } from '@/lib/format';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the lesson details screen.
export function useLessonDetailsView() {
  const { common, store, prm, is } = useViewContext();
  const v = { ...common };
  if (is.lesson) {
    const b = store.booking(prm.bid);
    if (b) {
      const L = store.learner(b.lid) || {};
      const bv = bookingCardView(store, b);
      const can = ['upcoming', 'rescheduled'].includes(b.status);
      const mins = timeToMinutes(b.start) - NOW;
      v.ld = {
        ...bv,
        phone: L.phone || '',
        canChange: can,
        canNav: FUTURE_STATUSES.includes(b.status),
        isCancelled: b.status === 'cancelled',
        note:
          b.status === 'ongoing'
            ? `In progress · ends ${bv.end}`
            : b.status === 'cancelled'
              ? `Cancelled${b.reason ? ' · ' + b.reason : ''}`
              : b.status === 'completed'
                ? 'Lesson completed'
                : b.status === 'rescheduled'
                  ? `Moved from ${bv.prev}`
                  : b.date === TODAY
                    ? `Starts in ${mins >= 60 ? Math.floor(mins / 60) + ' hr ' : ''}${mins % 60} min`
                    : `In ${daysBetween(TODAY, b.date)} day${daysBetween(TODAY, b.date) > 1 ? 's' : ''}`,
        rateRow: `${formatGBP(b.rate)}/hr × ${formatDurationShort(b.dur)}`,
        call: () => store.showToast(`Calling ${L.name} · ${L.phone}`, 'neutral'),
        msg: () => store.openSheet('message', { kind: 'resend', ids: [b.id] }),
        resched: () => store.openEdit(b.id),
        cancel: () => store.openSheet('cancelLesson', { bid: b.id, reason: 'Learner request' }),
        nav: () => store.openSheet('maps', { bid: b.id }),
        profile: () => {
          if (!L.archived) store.pushScreen('learner', { lid: L.id });
        },
        profLabel: L.archived ? 'Removed learner · records kept' : 'View profile',
      };
    }
  }
  return v;
}
