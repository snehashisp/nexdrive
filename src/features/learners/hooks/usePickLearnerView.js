import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the pick-a-learner sheet.
export function usePickLearnerView() {
  const { common, store, s, active, lvm } = useViewContext();
  const v = { ...common };
  const S = s.sheet || {};
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
