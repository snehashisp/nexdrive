import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the learner actions and delete-learner sheets.
export function useLearnerActionsView() {
  const { common, store, s, B, lvm } = useViewContext();
  const v = { ...common };
  const S = s.sheet || {};
  if (S.type === 'learnerActions' || S.type === 'deleteLearner') {
    const L = store.learner(S.lid);
    if (L) {
      const up = B.filter((b) => b.lid === L.id && ['upcoming', 'rescheduled'].includes(b.status));
      v.la = {
        ...lvm(L),
        view: () => store.pushScreen('learner', { lid: L.id }),
        schedule: () => store.openBooking(L.id),
        resched: () => store.learnerPick(L.id, 'reschedule'),
        cancel: () => store.learnerPick(L.id, 'cancel'),
        call: () => {
          store.setState({ sheet: null });
          store.showToast(`Calling ${L.name} · ${L.phone}`, 'neutral');
        },
        del: () => store.openSheet('deleteLearner', { lid: L.id }),
        upText: up.length ? `${up.length} upcoming lesson${up.length > 1 ? 's' : ''}` : 'No upcoming lessons',
        delNote: up.length
          ? `${up.length} upcoming lesson${up.length > 1 ? 's' : ''} will also be cancelled.`
          : '',
        hasUp: up.length > 0,
        confirmDel: () => store.deleteLearner(L.id),
        keep: () => store.setState({ sheet: null }),
      };
    }
  }
  return v;
}
