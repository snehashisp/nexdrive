import {
  formatDurationLong,
  formatDurationShort,
  formatFullDate,
  formatShortDate,
  minutesToTime,
  pad,
  timeToMinutes,
} from '@/lib/dates';
import { formatGBP } from '@/lib/format';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the confirm-booking sheet.
export function useConfirmBookingView() {
  const { common, store, s } = useViewContext();
  const v = { ...common };
  const S = s.sheet || {};
  if (S.type === 'confirm') {
    const m = store.bfModel();
    if (m && m.L) {
      const d = m.d;
      const end = minutesToTime(timeToMinutes(d.start) + Math.round(d.dur * 60));
      v.cm = {
        title: d.count > 1 ? `Confirm ${d.count} lessons` : 'Confirm booking',
        multi: d.count > 1,
        rows: [{ k: 'Learner', v: m.L.name }]
          .concat(
            d.count > 1
              ? [{ k: 'Schedule', v: `${d.freq === 'weekly' ? 'Weekly' : 'Twice a week'} at ${d.start}` }]
              : [
                  { k: 'Date', v: formatFullDate(d.date) },
                  { k: 'Time', v: `${d.start}–${end}` },
                ],
          )
          .concat([
            { k: 'Duration', v: formatDurationLong(d.dur) + (d.count > 1 ? ' each' : '') },
            { k: 'Location', v: `${m.loc}, ${m.pc}` },
          ]),
        sess:
          d.count > 1
            ? m.sess.map((x) => ({ n: pad(x.i + 1), t: `${formatShortDate(x.date)} · ${d.start}–${end}` }))
            : [],
        price: [
          {
            k:
              d.count > 1
                ? `${d.count} × ${formatGBP(m.per)}`
                : `Lesson value (${formatGBP(m.rateO.rate)} × ${formatDurationShort(d.dur)})`,
            v: formatGBP(m.sub),
          },
        ].concat(m.disc ? [{ k: 'Discount', v: '−' + formatGBP(m.disc) }] : []),
        fin: formatGBP(m.fin),
        confirm: () => store.confirmBooking(),
        edit: () => store.setState({ sheet: null }),
      };
    }
  }
  return v;
}
