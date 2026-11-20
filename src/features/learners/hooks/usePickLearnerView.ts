import type { Sheet } from '@/types/models';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the pick-a-learner sheet.
export function usePickLearnerView() {
  const { common, store, s, active, lvm } = useViewContext();
  const v: View = { ...common };
  const S: Sheet = s.sheet || ({} as Sheet);
  if (S.type === 'pickLearner')
    v.pl = {
      list: active
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(lvm),
      empty: !active.length,
      add: () => {
        store.setState({ sheet: null });
        store.openLearnerForm(null, null);
      },
    };
  return v;
}
