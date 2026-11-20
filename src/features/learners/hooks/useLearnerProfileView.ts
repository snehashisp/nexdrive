import { FUTURE_STATUSES, compareBookings } from '@/domain/bookings';
import { bookingCardView } from '@/hooks/viewHelpers';
import { TODAY, formatDate } from '@/lib/dates';
import { formatGBP, formatLicence, initials } from '@/lib/format';
import { ERROR_COLOR, choiceColors } from '@/lib/inline-styles';
import { isValidLicence, isValidPostcode, isValidUkMobile } from '@/lib/validation';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for a learner profile.
export function useLearnerProfileView() {
  const { common, store, s, prm, is, B, fin } = useViewContext();
  const v: View = { ...common };
  if (is.learner) {
    const L = store.learner(prm.lid);
    if (L) {
      const bs = B.filter((b) => b.lid === L.id);
      const up = bs.filter((b) => FUTURE_STATUSES.includes(b.status)).sort(compareBookings);
      const pv = bs.filter((b) => !FUTURE_STATUSES.includes(b.status)).sort((a, b) => compareBookings(b, a));
      const miss = store.missing(L);
      const done = bs.filter((b) => b.status === 'completed');
      const row = (k, val, req, ok) => ({
        k,
        v: val || (req ? 'Missing' : 'Not added'),
        req: req ? 'Required' : 'Optional',
        c: req && !ok ? ERROR_COLOR : val ? '#0A0A0F' : '#6B6B7B',
        rc: req ? '#6D28D9' : '#6B6B7B',
      });
      v.lp = {
        name: L.name,
        initials: initials(L.name),
        incomplete: miss.length > 0,
        complete: !miss.length,
        missText: miss.join(', '),
        since: `Learner since ${formatDate(L.since || TODAY)}`,
        stats: [
          { k: 'Lessons taken', v: done.length },
          { k: 'Upcoming', v: up.length },
          { k: 'Charged', v: formatGBP(done.reduce((a, b) => a + fin(b), 0)) },
        ],
        rows: [
          row('Mobile', L.phone, true, isValidUkMobile(L.phone)),
          row('Address', L.address, true, !!(L.address || '').trim()),
          row('Postcode', L.postcode, true, isValidPostcode(L.postcode)),
          row(
            'Provisional licence',
            L.licence ? formatLicence(L.licence) : '',
            true,
            isValidLicence(L.licence),
          ),
          row('Theory test certificate', L.theory, false, true),
          row('Email', L.email, false, true),
        ],
        notes: L.notes,
        hasNotes: !!L.notes,
        segs: (
          [
            ['upcoming', `Upcoming · ${up.length}`],
            ['previous', `Previous · ${pv.length}`],
          ] as const
        ).map((x) => ({
          t: x[1],
          ...choiceColors(s.profSeg === x[0]),
          pick: () => store.setState({ profSeg: x[0] }),
        })),
        showUp: s.profSeg === 'upcoming',
        showPrev: s.profSeg === 'previous',
        up: up.map((b) => bookingCardView(store, b)),
        pv: pv.map((b) => bookingCardView(store, b)),
        noUp: s.profSeg === 'upcoming' && !up.length,
        noPv: s.profSeg === 'previous' && !pv.length,
        schedule: () => store.openBooking(L.id),
        resched: () => store.learnerPick(L.id, 'reschedule'),
        cancel: () => store.learnerPick(L.id, 'cancel'),
        history: () => {
          store.setState({ hf: { status: 'all', learner: L.id, range: 'all' }, bkSeg: 'history' });
          store.pushScreen('bookings');
        },
        edit: () => store.openLearnerForm(L.id, null),
        del: () => store.openSheet('deleteLearner', { lid: L.id }),
        call: () => store.showToast(`Calling ${L.name} · ${L.phone}`, 'neutral'),
      };
    }
  }
  return v;
}
