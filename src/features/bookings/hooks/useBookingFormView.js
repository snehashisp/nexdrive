import { bookingCardView } from '@/hooks/viewHelpers';
import {
  MONTHS_SHORT,
  NOW,
  TODAY,
  WEEKDAYS_SHORT,
  addDays,
  formatDurationLong,
  formatDurationShort,
  formatLongDate,
  formatShortDate,
  minutesToTime,
  pad,
  parseIsoDate,
  timeToMinutes,
} from '@/lib/dates';
import { formatGBP, initials } from '@/lib/format';
import { BORDER_COLOR, ERROR_COLOR, choiceColors } from '@/lib/inline-styles';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the booking form (new booking or edit).
export function useBookingFormView() {
  const { common, store, s, is, B } = useViewContext();
  const v = { ...common };
  if (is.booking && s.draft) {
    const m = store.bfModel();
    const d = m.d;
    const e = d.tried ? m.errs : {};
    const ex = d.mode === 'edit' ? [d.bid] : [];
    const base = d.date < TODAY ? d.date : TODAY;
    const dates = Array.from({ length: 21 }, (_, i) => {
      const dt = addDays(base, i);
      const o = choiceColors(dt === d.date);
      const n = B.filter((x) => x.date === dt && x.status !== 'cancelled').length;
      return {
        dw: dt === TODAY ? 'Today' : WEEKDAYS_SHORT[parseIsoDate(dt).getUTCDay()],
        num: parseIsoDate(dt).getUTCDate(),
        mon: MONTHS_SHORT[parseIsoDate(dt).getUTCMonth()],
        ...o,
        sub: dt === d.date ? '#EDE9FE' : '#6B6B7B',
        n: n ? `${n} booked` : 'Free',
        pick: () => store.pickDate(dt),
      };
    });
    const slots = [];
    for (let mm = 7 * 60; mm <= 19 * 60 + 30; mm += 30) {
      const t = minutesToTime(mm);
      const past = d.date === TODAY && mm <= NOW;
      const busy = !past && store.overlap(d.date, mm, d.dur * 60, ex);
      const sel = d.start === t;
      slots.push({
        t,
        bg: sel ? '#7C3AED' : busy ? '#FFFBEB' : past ? '#F7F7F9' : '#FFFFFF',
        fg: sel ? '#FFFFFF' : busy ? '#92400E' : past ? '#B4B4C4' : '#0A0A0F',
        bd: sel ? '#7C3AED' : busy ? '#FDE68A' : '#E7E7EC',
        deco: past ? 'line-through' : 'none',
        cur: past ? 'not-allowed' : 'pointer',
        pick: past
          ? () => store.showToast('That time has passed — choose a later slot', 'warn')
          : () => store.pickSlot(t),
      });
    }
    const durs = [
      [1, '1 hour'],
      [1.5, '1.5 hours'],
      [2, '2 hours'],
    ].map((x) => ({
      t: x[1],
      ...choiceColors(!d.custom && d.dur === x[0]),
      pick: () => store.setDraft({ dur: x[0], custom: false }),
    }));
    durs.push({ t: 'Custom', ...choiceColors(d.custom), pick: () => store.setDraft({ custom: true }) });
    const counts = [
      [1, 'Single'],
      [5, '5 lessons'],
      [10, '10 lessons'],
    ].map((x) => ({
      t: x[1],
      ...choiceColors(!d.countCustom && d.count === x[0]),
      pick: () => store.setDraft({ count: x[0], countCustom: false, shifts: {} }),
    }));
    counts.push({
      t: 'Custom',
      ...choiceColors(d.countCustom),
      pick: () => store.setDraft({ countCustom: true, count: Math.max(2, d.count) }),
    });
    const L = m.L;
    v.bf = {
      title: d.mode === 'edit' ? 'Reschedule lesson' : d.count > 1 ? 'Book multiple lessons' : 'New booking',
      edit: d.mode === 'edit',
      isNew: d.mode !== 'edit',
      learner: L
        ? { name: L.name, initials: initials(L.name), sub: `${L.phone} · ${L.postcode || 'No postcode'}` }
        : null,
      noLearner: !L,
      learnerErr: e.learner,
      learnerBd: e.learner ? ERROR_COLOR : '#CFCFD8',
      pickLearner: () => store.openSheet('pickLearner'),
      blocked: m.blocked,
      missText: m.miss.join(', '),
      complete: () => store.openLearnerForm(d.lid, 'booking'),
      op: m.blocked ? 0.4 : 1,
      pe: m.blocked ? 'none' : 'auto',
      dates,
      dateLabel: formatLongDate(d.date),
      slots,
      startErr: e.start,
      durs,
      custom: d.custom,
      durLabel: formatDurationLong(d.dur),
      durInc: () => store.setDraft({ dur: Math.min(8, d.dur + 0.5) }),
      durDec: () => store.setDraft({ dur: Math.max(0.5, d.dur - 0.5) }),
      rates: s.inst.rates.map((r) => ({
        t: r.label,
        sub: `${formatGBP(r.rate)}/hr`,
        ...choiceColors(d.rateKey === r.key),
        sc: d.rateKey === r.key ? '#EDE9FE' : '#6B6B7B',
        pick: () => store.setDraft({ rateKey: r.key }),
      })),
      showCount: d.mode !== 'edit',
      counts,
      countCustom: d.countCustom,
      countLabel: `${d.count} lessons`,
      countInc: () => store.setDraft({ count: Math.min(20, d.count + 1) }),
      countDec: () => store.setDraft({ count: Math.max(2, d.count - 1) }),
      multi: d.count > 1,
      freqs: [
        ['weekly', 'Weekly'],
        ['twice', 'Twice a week'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(d.freq === x[0]),
        pick: () => store.setDraft({ freq: x[0], shifts: {} }),
      })),
      sess: m.sess.map((x) => {
        const c = x.conflict ? bookingCardView(store, x.conflict) : null;
        return {
          n: pad(x.i + 1),
          date: formatShortDate(x.date),
          time: d.start
            ? `${d.start}–${minutesToTime(timeToMinutes(d.start) + Math.round(d.dur * 60))}`
            : '—',
          conflict: !!c,
          cText: c ? `Clashes with ${c.name}, ${c.range}` : '',
          bg: c ? '#FFFBEB' : '#FFFFFF',
          shift: () => store.setDraft({ shifts: { ...d.shifts, [x.i]: (d.shifts[x.i] || 0) + 1 } }),
        };
      }),
      clashText: m.clashes.length
        ? `${m.clashes.length} session${m.clashes.length > 1 ? 's clash' : ' clashes'} with existing lessons. Move ${m.clashes.length > 1 ? 'them' : 'it'} to continue.`
        : '',
      locs: [
        ['home', 'Learner’s home'],
        ['test', 'Test centre'],
        ['other', 'Other'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(d.locMode === x[0]),
        pick: () => store.setDraft({ locMode: x[0] }),
      })),
      locText: m.loc || 'Choose a learner first',
      locPc: m.pc,
      notOther: d.locMode !== 'other',
      other: d.locMode === 'other',
      locAddr: d.locAddr,
      locPcIn: d.locPc,
      hLocAddr: (x) => store.setDraft({ locAddr: x.target.value }),
      hLocPc: (x) => store.setDraft({ locPc: x.target.value }),
      locErr: e.loc,
      discs: [
        ['none', 'None'],
        ['5', '£5'],
        ['10', '£10'],
        ['20', '£20'],
        ['custom', 'Custom'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(d.disc === x[0]),
        pick: () => store.setDraft({ disc: x[0] }),
      })),
      discCustom: d.disc === 'custom',
      discIn: d.discCustom,
      hDisc: (x) => store.setDraft({ discCustom: x.target.value.replace(/[^\d.]/g, '') }),
      discErr: e.disc,
      discBd: e.disc ? ERROR_COLOR : BORDER_COLOR,
      rows: [
        { k: 'Hourly rate', v: `${formatGBP(m.rateO.rate)} × ${formatDurationShort(d.dur)}` },
        { k: d.count > 1 ? 'Per lesson' : 'Lesson value', v: formatGBP(m.per) },
      ].concat(d.count > 1 ? [{ k: `${d.count} lessons`, v: formatGBP(m.sub) }] : []),
      hasDisc: m.disc > 0,
      disc: '−' + formatGBP(m.disc),
      fin: formatGBP(m.fin),
      cta: d.mode === 'edit' ? 'Save changes' : 'Review booking',
      review: () => store.review(),
      foot: m.blocked
        ? 'Complete learner details to continue'
        : d.count > 1
          ? `${d.count} lessons · ${formatDurationLong(d.dur)} each`
          : `${formatShortDate(d.date)} · ${d.start || 'No time'} · ${formatDurationShort(d.dur)}`,
      ctaBg: m.blocked ? '#B4B4C4' : '#7C3AED',
    };
  }
  return v;
}
