import { TEST_CENTRE } from '@/domain/bookings';
import { NOW, TODAY, addDays, formatShortDate, minutesToTime, timeToMinutes } from '@/lib/dates';
import { formatGBP } from '@/lib/format';
import { isValidPostcode } from '@/lib/validation';

// Bookings: the booking form (draft), clash checks, pricing, confirm/edit/cancel, learner messages.
// A Zustand slice: actions read the store with get() and write with get().setState(update, callback).
export const createBookingsSlice = (set, get) => ({
  booking(id) {
    return get().bookings.find((b) => b.id === id);
  },
  overlap(date, sm, dm, excl = []) {
    return get().bookings.find(
      (b) =>
        b.date === date &&
        b.status !== 'cancelled' &&
        !excl.includes(b.id) &&
        timeToMinutes(b.start) < sm + dm &&
        sm < timeToMinutes(b.start) + b.dur * 60,
    );
  },
  firstFree(date, dur) {
    for (let m = 8 * 60; m <= 19 * 60; m += 30) {
      if (date === TODAY && m <= NOW + 15) continue;
      if (!get().overlap(date, m, dur * 60)) return minutesToTime(m);
    }
    return null;
  },
  openBooking(lid = null, o = {}) {
    const s = get();
    if (get().subState() === 'expired') return get().openSheet('expired');
    const dur = s.inst.defaultDur;
    let date = TODAY;
    let start = get().firstFree(date, dur);
    if (!start) {
      date = addDays(TODAY, 1);
      start = get().firstFree(date, dur) || '09:00';
    }
    const d = {
      mode: 'new',
      lid,
      date,
      start,
      dur,
      custom: false,
      rateKey: 'std',
      disc: o.disc || 'none',
      discCustom: '',
      count: o.count || 1,
      countCustom: false,
      freq: 'weekly',
      locMode: 'home',
      locAddr: '',
      locPc: '',
      shifts: {},
      tried: false,
    };
    if (lid && o.count > 1) {
      d.date = addDays(TODAY, 2);
      d.start = '10:00';
      d.dur = 2;
    }
    get().setState((st) => ({ draft: d, stack: [...st.stack, { name: 'booking' }], sheet: null }));
  },
  openEdit(bid) {
    const b = get().booking(bid);
    const L = get().learner(b.lid) || {};
    const disc = b.discount ? ([5, 10, 20].includes(b.discount) ? String(b.discount) : 'custom') : 'none';
    const locMode = b.loc === L.address ? 'home' : b.loc === TEST_CENTRE.loc ? 'test' : 'other';
    const d = {
      mode: 'edit',
      bid,
      lid: b.lid,
      date: b.date,
      start: b.start,
      dur: b.dur,
      custom: ![1, 1.5, 2].includes(b.dur),
      rateKey: b.rateKey || 'std',
      disc,
      discCustom: String(b.discount || ''),
      count: 1,
      countCustom: false,
      freq: 'weekly',
      locMode,
      locAddr: locMode === 'other' ? b.loc : '',
      locPc: locMode === 'other' ? b.pc : '',
      shifts: {},
      tried: false,
    };
    get().setState((st) => ({ draft: d, stack: [...st.stack, { name: 'booking' }], sheet: null }));
  },
  setDraft(p, done) {
    get().setState((s) => ({ draft: { ...s.draft, ...p } }), done);
  },
  discVal(d) {
    return d.disc === 'custom' ? parseFloat(d.discCustom) || 0 : d.disc === 'none' ? 0 : +d.disc;
  },
  sessions(d) {
    const out = [];
    let off = 0;
    const ex = d.mode === 'edit' ? [d.bid] : [];
    for (let i = 0; i < d.count; i++) {
      if (i > 0) off += d.freq === 'weekly' ? 7 : i % 2 === 1 ? 3 : 4;
      const date = addDays(d.date, off + (d.shifts[i] || 0));
      const c = d.start ? get().overlap(date, timeToMinutes(d.start), d.dur * 60, ex) : null;
      out.push({ i, date, conflict: c });
    }
    return out;
  },
  bfModel() {
    const s = get(),
      d = s.draft;
    if (!d) return null;
    const L = get().learner(d.lid);
    const rateO = s.inst.rates.find((r) => r.key === d.rateKey) || s.inst.rates[0];
    const per = rateO.rate * d.dur;
    const sub = per * d.count;
    const disc = get().discVal(d);
    const fin = Math.max(0, sub - disc);
    const sess = get().sessions(d);
    const clashes = sess.filter((x) => x.conflict);
    const miss = L ? get().missing(L) : [];
    const loc =
      d.locMode === 'home' ? (L ? L.address : '') : d.locMode === 'test' ? TEST_CENTRE.loc : d.locAddr;
    const pc =
      d.locMode === 'home'
        ? L
          ? L.postcode
          : ''
        : d.locMode === 'test'
          ? TEST_CENTRE.pc
          : d.locPc.toUpperCase();
    const errs = {};
    if (!L) errs.learner = 'Choose a learner';
    if (!d.start) errs.start = 'Choose a start time';
    if (d.start && d.date === TODAY && timeToMinutes(d.start) <= NOW)
      errs.start = 'That time has already passed — choose a later slot';
    if (disc > sub) errs.disc = `Discount can’t be more than the lesson value (${formatGBP(sub)})`;
    if (disc < 0) errs.disc = 'Discount must be £0 or more';
    if (d.locMode === 'other') {
      if (!d.locAddr.trim()) errs.loc = 'Enter a pickup address';
      else if (!isValidPostcode(d.locPc)) errs.loc = 'Enter a full UK postcode, like SL1 3NY';
    }
    return {
      d,
      L,
      rateO,
      per,
      sub,
      disc,
      fin,
      sess,
      clashes,
      miss,
      loc,
      pc,
      errs,
      blocked: miss.length > 0 && !!L,
    };
  },
  pickSlot(t) {
    const d = get().draft;
    const c = get().overlap(d.date, timeToMinutes(t), d.dur * 60, d.mode === 'edit' ? [d.bid] : []);
    get().setDraft({ start: t });
    if (c)
      get().openSheet('conflict', {
        cid: c.id,
        dup: c.lid === d.lid && c.start === t,
        date: d.date,
        start: t,
      });
  },
  pickDate(date) {
    const d = get().draft;
    let start = d.start;
    const ex = d.mode === 'edit' ? [d.bid] : [];
    if (
      !start ||
      (date === TODAY && timeToMinutes(start) <= NOW) ||
      get().overlap(date, timeToMinutes(start), d.dur * 60, ex)
    )
      start = get().firstFree(date, d.dur) || '';
    get().setDraft({ date, start, shifts: {} });
  },
  review() {
    const m = get().bfModel();
    get().setDraft({ tried: true });
    if (m.blocked || Object.keys(m.errs).length) return;
    if (m.clashes.length) {
      const c = m.clashes[0];
      return get().openSheet('conflict', {
        cid: c.conflict.id,
        dup: c.conflict.lid === m.d.lid && c.conflict.start === m.d.start,
        date: c.date,
        start: m.d.start,
        idx: c.i,
      });
    }
    if (m.d.mode === 'edit') return get().saveEdit(m);
    get().openSheet('confirm');
  },
  confirmBooking() {
    const s = get();
    const m = get().bfModel();
    const d = m.d;
    const per = m.disc / d.count;
    const pkg = d.count > 1 ? 'P' + Date.now() : null;
    const nb = m.sess.map((x, i) => ({
      id: 'nb' + Date.now() + '_' + i,
      lid: d.lid,
      date: x.date,
      start: d.start,
      dur: d.dur,
      rate: m.rateO.rate,
      rateKey: m.rateO.key,
      discount: Math.round(per * 100) / 100,
      status: 'upcoming',
      loc: m.loc,
      pc: m.pc,
      pkg,
    }));
    const body =
      d.count > 1
        ? `${d.count} lessons for ${m.L.name} · ${formatGBP(m.fin)}${m.disc ? ` after ${formatGBP(m.disc)} discount` : ''}.`
        : `${m.L.name} · ${formatShortDate(d.date)}, ${d.start} · ${formatGBP(m.fin)}`;
    get().setState({
      bookings: [...s.bookings, ...nb],
      notifs: [
        {
          id: 'n' + Date.now(),
          cat: 'lessons',
          icon: 'calendarPlus',
          title: 'Booking created',
          body,
          time: 'now',
          unread: true,
          act: { lesson: nb[0].id },
        },
        ...s.notifs,
      ],
      sheet: { type: 'message', kind: 'new', ids: nb.map((b) => b.id) },
    });
  },
  saveEdit(m) {
    const s = get(),
      d = m.d;
    const b = get().booking(d.bid);
    const disc = m.disc;
    const timeCh = b.date !== d.date || b.start !== d.start;
    const ch = timeCh || b.dur !== d.dur || b.loc !== m.loc || b.discount !== disc || b.rate !== m.rateO.rate;
    if (!ch) {
      get().back();
      return get().showToast('No changes to save');
    }
    const prev = {
      date: b.date,
      start: b.start,
      dur: b.dur,
      fin: b.rate * b.dur - b.discount,
      loc: b.loc,
      pc: b.pc,
    };
    const nb = {
      ...b,
      date: d.date,
      start: d.start,
      dur: d.dur,
      rate: m.rateO.rate,
      rateKey: m.rateO.key,
      discount: disc,
      loc: m.loc,
      pc: m.pc,
      status: timeCh && b.status !== 'ongoing' ? 'rescheduled' : b.status,
      prev: timeCh ? { date: b.date, start: b.start } : b.prev,
    };
    get().setState({
      bookings: s.bookings.map((x) => (x.id === b.id ? nb : x)),
      notifs: [
        {
          id: 'n' + Date.now(),
          cat: 'lessons',
          icon: 'repeat',
          title: 'Booking changed',
          body: `${(get().learner(b.lid) || {}).name} · ${formatShortDate(b.date)} ${b.start} → ${formatShortDate(d.date)} ${d.start}`,
          time: 'now',
          unread: true,
          act: { lesson: b.id },
        },
        ...s.notifs,
      ],
      sheet: { type: 'message', kind: 'update', ids: [b.id], prev },
    });
  },
  cancelLesson(bid, reason) {
    const s = get();
    const b = get().booking(bid);
    get().setState({
      bookings: s.bookings.map((x) => (x.id === bid ? { ...x, status: 'cancelled', reason } : x)),
      notifs: [
        {
          id: 'n' + Date.now(),
          cat: 'lessons',
          icon: 'calendarX',
          title: 'Booking cancelled',
          body: `${(get().learner(b.lid) || {}).name} · ${formatShortDate(b.date)}, ${b.start} · ${reason}`,
          time: 'now',
          unread: true,
          act: { lesson: bid },
        },
        ...s.notifs,
      ],
      sheet: { type: 'message', kind: 'cancel', ids: [bid], reason },
    });
  },
  sendMsg() {
    const sh = get().sheet;
    if (get().failing()) return get().setState({ sheet: { ...sh, failed: true, sending: false } });
    get().setState({ sheet: { ...sh, sending: true, failed: false } });
    setTimeout(() => {
      const b = get().booking(sh.ids[0]);
      const L = b && get().learner(b.lid);
      get().afterMsg(sh);
      get().showToast(`Sent to ${L ? L.name.split(' ')[0] : 'learner'} by ${get().prefs.channel}`);
    }, 700);
  },
  skipMsg() {
    const sh = get().sheet;
    get().afterMsg(sh);
    get().showToast(
      sh.kind === 'cancel'
        ? 'Lesson cancelled · learner not notified'
        : sh.kind === 'update'
          ? 'Booking updated · learner not notified'
          : 'Booking confirmed · learner not notified',
      sh.kind === 'cancel' ? 'neutral' : 'ok',
    );
  },
  afterMsg(sh) {
    const s = get();
    const top = s.stack[s.stack.length - 1];
    if (sh.kind === 'new' && top && top.name === 'booking') {
      get().setState({
        stack: [...s.stack.slice(0, -1), { name: 'lesson', params: { bid: sh.ids[0] } }],
        sheet: null,
        draft: null,
      });
      return;
    }
    if (sh.kind === 'update' && top && top.name === 'booking') {
      get().setState({ stack: s.stack.slice(0, -1), sheet: null, draft: null });
      return;
    }
    get().setState({ sheet: null });
  },
});
