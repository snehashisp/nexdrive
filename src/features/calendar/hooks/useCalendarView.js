import { choiceColors } from '@/lib/inline-styles';
import { STATUS_STYLES, compareBookings } from '@/domain/bookings';
import { bookingCardView } from '@/hooks/viewHelpers';
import {
  MONTHS_LONG,
  NOW,
  TODAY,
  WEEKDAYS_SHORT,
  addDays,
  formatLongDate,
  formatShortDate,
  pad,
  parseIsoDate,
  timeToMinutes,
  toIsoDate,
} from '@/lib/dates';
import { formatGBP } from '@/lib/format';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the Calendar (day / week / month).
export function useCalendarView() {
  const { common, store, s, is, go, B, fin } = useViewContext();
  const v = { ...common };
  if (is.calendar) {
    const cd = s.calDate;
    const wd = (parseIsoDate(cd).getUTCDay() + 6) % 7;
    const ws = addDays(cd, -wd);
    const HP = 64,
      HW = 40;
    const d0 = parseIsoDate(cd);
    const shift = (dir) => {
      if (s.calView === 'month') {
        store.setState({
          calDate: toIsoDate(new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth() + dir, 1))),
        });
      } else store.setState({ calDate: addDays(cd, dir * (s.calView === 'day' ? 1 : 7)) });
    };
    const dayB = (date) => B.filter((b) => b.date === date).sort(compareBookings);
    const blk = (b, hp) => ({
      ...bookingCardView(store, b),
      top: Math.round(((timeToMinutes(b.start) - 420) / 60) * hp),
      h: Math.max(26, Math.round(b.dur * hp) - 3),
      op: b.status === 'cancelled' ? 0.6 : 1,
    });
    const dB = dayB(cd);
    const live = dB.filter((b) => b.status !== 'cancelled');
    v.cal = {
      views: ['day', 'week', 'month'].map((k) => ({
        t: k[0].toUpperCase() + k.slice(1),
        ...choiceColors(s.calView === k),
        pick: () => store.setState({ calView: k }),
      })),
      isDay: s.calView === 'day',
      isWeek: s.calView === 'week',
      isMonth: s.calView === 'month',
      title:
        s.calView === 'day'
          ? formatLongDate(cd)
          : s.calView === 'week'
            ? `${formatShortDate(ws)} – ${formatShortDate(addDays(ws, 6))}`
            : `${MONTHS_LONG[d0.getUTCMonth()]} ${d0.getUTCFullYear()}`,
      prev: () => shift(-1),
      next: () => shift(1),
      today: () => store.setState({ calDate: TODAY }),
      notToday: cd !== TODAY,
      strip: [0, 1, 2, 3, 4, 5, 6].map((i) => {
        const dt = addDays(ws, i);
        const sel = dt === cd;
        return {
          dw: WEEKDAYS_SHORT[parseIsoDate(dt).getUTCDay()],
          num: parseIsoDate(dt).getUTCDate(),
          bg: sel ? '#0A0A0F' : '#FFFFFF',
          fg: sel ? '#FFFFFF' : dt === TODAY ? '#6D28D9' : '#0A0A0F',
          dot: dayB(dt).some((b) => b.status !== 'cancelled') ? (sel ? '#A78BFA' : '#7C3AED') : 'transparent',
          pick: () => store.setState({ calDate: dt }),
        };
      }),
      hours: Array.from({ length: 14 }, (_, i) => ({ label: pad(7 + i) + ':00', top: i * HP })),
      tlH: 14 * HP,
      blocks: dB.map((b) => blk(b, HP)),
      showNow: cd === TODAY,
      nowTop: Math.round(((NOW - 420) / 60) * HP),
      summary: live.length
        ? `${live.length} lesson${live.length > 1 ? 's' : ''} · ${live.reduce((a, b) => a + b.dur, 0)} hours · ${formatGBP(live.reduce((a, b) => a + fin(b), 0))}`
        : 'No lessons booked',
      dayEmpty: dB.length === 0,
      allEmpty: B.length === 0,
      wHours: Array.from({ length: 14 }, (_, i) => ({ label: pad(7 + i), top: i * HW })),
      wH: 14 * HW,
      week: [0, 1, 2, 3, 4, 5, 6].map((i) => {
        const dt = addDays(ws, i);
        return {
          dw: WEEKDAYS_SHORT[parseIsoDate(dt).getUTCDay()],
          num: parseIsoDate(dt).getUTCDate(),
          hbg: dt === TODAY ? '#7C3AED' : 'transparent',
          hfg: dt === TODAY ? '#FFFFFF' : '#0A0A0F',
          blocks: dayB(dt).map((b) => blk(b, HW)),
          pick: () => store.setState({ calDate: dt, calView: 'day' }),
        };
      }),
      legend: ['upcoming', 'ongoing', 'completed', 'cancelled', 'rescheduled'].map((k) => ({
        t: STATUS_STYLES[k].label,
        c: STATUS_STYLES[k].bar,
      })),
      newBooking: go.newBooking,
    };
    if (s.calView === 'month') {
      const first = toIsoDate(new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth(), 1)));
      const fo = (parseIsoDate(first).getUTCDay() + 6) % 7;
      const gs = addDays(first, -fo);
      v.cal.cells = Array.from({ length: 42 }, (_, i) => {
        const dt = addDays(gs, i);
        const bs = dayB(dt);
        const inM = parseIsoDate(dt).getUTCMonth() === d0.getUTCMonth();
        const sel = dt === cd;
        return {
          num: parseIsoDate(dt).getUTCDate(),
          bg: sel ? '#0A0A0F' : '#FFFFFF',
          fg: sel ? '#FFFFFF' : inM ? (dt === TODAY ? '#6D28D9' : '#0A0A0F') : '#B4B4C4',
          fw: dt === TODAY ? 700 : 500,
          dots: bs.slice(0, 4).map((b) => ({ c: STATUS_STYLES[b.status].bar })),
          pick: () => store.setState({ calDate: dt }),
        };
      });
      v.cal.list = dB.map((b) => bookingCardView(store, b));
      v.cal.listLabel = formatLongDate(cd).toUpperCase();
    }
  }
  return v;
}
