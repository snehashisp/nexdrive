import { bookingCardView } from '@/hooks/viewHelpers';
import { compareBookings } from '@/domain/bookings';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the pick-a-lesson sheet.
export function usePickBookingView() {
  const { common, store, s, B } = useViewContext();
  const v = { ...common };
  const S = s.sheet || {};
  if (S.type === 'pickBooking') {
    const up = B.filter((b) => b.lid === S.lid && ['upcoming', 'rescheduled'].includes(b.status)).sort(
      compareBookings,
    );
    v.pb = {
      title:
        S.mode === 'reschedule' ? 'Which lesson do you want to move?' : 'Which lesson do you want to cancel?',
      list: up.map((b) => ({
        ...bookingCardView(store, b),
        pick: () =>
          S.mode === 'reschedule'
            ? store.openEdit(b.id)
            : store.openSheet('cancelLesson', { bid: b.id, reason: 'Learner request' }),
      })),
    };
  }
  return v;
}
