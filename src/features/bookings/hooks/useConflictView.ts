import type { Sheet, Learner } from '@/types/models';
import { bookingCardView } from '@/hooks/viewHelpers';
import { formatShortDate } from '@/lib/dates';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the booking-clash sheet.
export function useConflictView() {
  const { common, store, s } = useViewContext();
  const v: View = { ...common };
  const S: Sheet = s.sheet || ({} as Sheet);
  if (S.type === 'conflict') {
    const c = store.booking(S.cid);
    if (c) {
      const cn = (store.learner(c.lid) || ({} as Learner)).name;
      v.cf = {
        ...bookingCardView(store, c),
        title: S.dup
          ? 'This lesson is already booked'
          : 'You already have a lesson scheduled during this time.',
        body: S.dup
          ? `${cn} already has a lesson at ${S.start} on ${formatShortDate(S.date)}. Booking it again would create a duplicate.`
          : `A lesson at ${S.start} on ${formatShortDate(S.date)} would overlap this booking.`,
        another: () => {
          const d = store.state.draft;
          store.setState({ sheet: null });
          if (S.idx > 0) store.setDraft({ shifts: { ...d.shifts, [S.idx]: (d.shifts[S.idx] || 0) + 1 } });
          else store.setDraft({ start: '' });
        },
        view: () => store.pushScreen('lesson', { bid: c.id }),
        cancel: () =>
          store.setState((st) => ({
            sheet: null,
            draft: null,
            stack: st.stack.filter((x) => x.name !== 'booking'),
          })),
      };
    }
  }
  return v;
}
