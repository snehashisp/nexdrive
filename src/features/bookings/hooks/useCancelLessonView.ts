import type { Sheet } from '@/types/models';
import { choiceColors } from '@/lib/inline-styles';
import { bookingCardView } from '@/hooks/viewHelpers';
import { TODAY, addDays } from '@/lib/dates';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the cancel-lesson sheet.
export function useCancelLessonView() {
  const { common, store, s } = useViewContext();
  const v: View = { ...common };
  const S: Sheet = s.sheet || ({} as Sheet);
  if (S.type === 'cancelLesson') {
    const b = store.booking(S.bid);
    if (b)
      v.cl = {
        ...bookingCardView(store, b),
        reasons: ['Learner request', 'Instructor unavailable', 'Weather', 'Vehicle issue', 'Other'].map(
          (r) => ({
            t: r,
            ...choiceColors(S.reason === r),
            pick: () => store.setState({ sheet: { ...S, reason: r } }),
          }),
        ),
        confirm: () => store.cancelLesson(b.id, S.reason),
        keep: () => store.setState({ sheet: null }),
        late: b.date === TODAY || b.date === addDays(TODAY, 1),
      };
  }
  return v;
}
