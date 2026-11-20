import { choiceColors } from '@/lib/inline-styles';
import { formatDate } from '@/lib/dates';
import { initials } from '@/lib/format';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the learner list.
export function useLearnersView() {
  const { common, store, s, is, B, active, lvm } = useViewContext();
  const v: View = { ...common };
  if (is.learners) {
    const q = s.lSearch.trim().toLowerCase();
    const incN = active.filter((l) => store.missing(l).length).length;
    let list = active.filter(
      (l) =>
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.phone.replace(/\s/g, '').includes(q.replace(/\s/g, '')) ||
        (l.postcode || '').toLowerCase().includes(q),
    );
    if (s.lFilter === 'incomplete') list = list.filter((l) => store.missing(l).length);
    list.sort((a, b) => a.name.localeCompare(b.name));
    const arch = s.learners.filter((l) => l.archived);
    v.ls = {
      search: s.lSearch,
      hSearch: (e) => store.setState({ lSearch: e.target.value }),
      clear: () => store.setState({ lSearch: '' }),
      hasQ: !!q,
      count: `${active.length} active`,
      filters: (
        [
          ['all', `All · ${active.length}`],
          ['incomplete', `Needs details · ${incN}`],
        ] as const
      ).map((f) => ({
        t: f[1],
        ...choiceColors(s.lFilter === f[0]),
        pick: () => store.setState({ lFilter: f[0] }),
      })),
      list: list.map(lvm),
      has: list.length > 0,
      noResults: active.length > 0 && list.length === 0,
      empty: active.length === 0,
      hasArch: arch.length > 0,
      arch: arch.map((l) => ({
        name: l.name,
        initials: initials(l.name),
        sub: `Removed ${formatDate(l.archivedOn)} · ${B.filter((b) => b.lid === l.id).length} lesson records kept`,
        open: () => {
          store.setState({ hf: { status: 'all', learner: l.id, range: 'all' }, bkSeg: 'history' });
          store.pushScreen('bookings');
        },
      })),
    };
  }
  return v;
}
