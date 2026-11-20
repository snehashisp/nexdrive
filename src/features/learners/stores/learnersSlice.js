import { FUTURE_STATUSES, compareBookings } from '@/domain/bookings';
import { TODAY } from '@/lib/dates';
import { normalizeLicence } from '@/lib/format';
import { isValidEmail, isValidLicence, isValidPostcode, isValidUkMobile } from '@/lib/validation';

// Learners: lookup, completeness, the learner form, delete.
// A Zustand slice: actions read the store with get() and write with get().setState(update, callback).
export const createLearnersSlice = (set, get) => ({
  learner(id) {
    return get().learners.find((l) => l.id === id);
  },
  missing(l) {
    const m = [];
    if (!l) return ['Learner'];
    if (!(l.name || '').trim()) m.push('Full name');
    if (!isValidUkMobile(l.phone)) m.push('Mobile number');
    if (!(l.address || '').trim()) m.push('Address');
    if (!isValidPostcode(l.postcode)) m.push('Postcode');
    if (!isValidLicence(l.licence)) m.push('Provisional licence number');
    return m;
  },
  openLearnerForm(lid, ret) {
    const l = lid
      ? { ...get().learner(lid) }
      : {
          id: null,
          name: '',
          phone: '',
          email: '',
          address: '',
          postcode: '',
          licence: '',
          theory: '',
          notes: '',
        };
    get().setState((s) => ({
      lf: l,
      lfTried: !!lid && ret === 'booking',
      lfRet: ret,
      stack: [...s.stack, { name: 'learnerForm', params: { lid } }],
      sheet: null,
    }));
  },
  lfErr(l, strict) {
    const e = {};
    if (!l.name.trim()) e.name = 'Enter the learner’s full name';
    if (!l.phone.trim()) {
      if (strict) e.phone = 'Needed to send lesson details';
    } else if (!isValidUkMobile(l.phone)) e.phone = 'Enter a UK mobile number, like 07700 900123';
    if (l.email.trim() && !isValidEmail(l.email))
      e.email = 'Enter a valid email address, like name@example.co.uk';
    if (!l.address.trim() && strict) e.address = 'Needed for the pickup location';
    if (!l.postcode.trim()) {
      if (strict) e.postcode = 'Enter a postcode';
    } else if (!isValidPostcode(l.postcode)) e.postcode = 'Enter a full UK postcode, like SL1 3NY';
    if (!l.licence.trim()) {
      if (strict) e.licence = 'Needed before booking a lesson';
    } else if (!isValidLicence(l.licence))
      e.licence = 'Licence numbers are 16 characters, like SMITH 801157 J9 9AB';
    if (l.theory.trim() && !/^\d{8}$/.test(l.theory.replace(/\s/g, '')))
      e.theory = 'Theory certificate numbers are 8 digits';
    return e;
  },
  saveLearner(andBook) {
    const s = get();
    const l = {
      ...s.lf,
      postcode: s.lf.postcode.toUpperCase().trim(),
      licence: normalizeLicence(s.lf.licence),
    };
    const strict = andBook || s.lfRet === 'booking';
    const e = get().lfErr(l, strict);
    if (Object.keys(e).length) return get().setState({ lfTried: true, lfStrict: strict });
    const isNew = !l.id;
    const id = l.id || 'L' + Date.now();
    const rec = { ...l, id, since: l.since || TODAY };
    const learners = isNew ? [...s.learners, rec] : s.learners.map((x) => (x.id === id ? rec : x));
    const inc = get().missing(rec).length > 0;
    get().setState({ learners, lf: null, lfTried: false }, () => {
      if (s.lfRet === 'booking') {
        get().back();
        get().showToast(`${rec.name.split(' ')[0]}’s profile is complete`);
        return;
      }
      if (andBook) {
        get().replaceTop([{ name: 'learner', params: { lid: id } }]);
        setTimeout(() => get().openBooking(id), 0);
        return;
      }
      if (isNew) get().replaceTop([{ name: 'learner', params: { lid: id } }]);
      else get().back();
      get().showToast(
        isNew
          ? inc
            ? `${rec.name} added · details incomplete`
            : `${rec.name} added`
          : 'Learner details saved',
        inc ? 'warn' : 'ok',
      );
    });
  },
  deleteLearner(lid) {
    const s = get();
    const L = get().learner(lid);
    let n = 0;
    const bookings = s.bookings.map((b) => {
      if (b.lid === lid && FUTURE_STATUSES.includes(b.status) && b.status !== 'ongoing') {
        n++;
        return { ...b, status: 'cancelled', reason: 'Learner removed' };
      }
      return b;
    });
    const learners = s.learners.map((l) => (l.id === lid ? { ...l, archived: true, archivedOn: TODAY } : l));
    const stack = s.stack.filter((x) => !(x.name === 'learner' && x.params.lid === lid));
    get().setState({ learners, bookings, stack, sheet: null });
    get().showToast(
      `${L.name} removed. ${n ? n + ' upcoming lesson' + (n > 1 ? 's' : '') + ' cancelled. ' : ''}Records kept in History.`,
    );
  },
  learnerPick(lid, mode) {
    const up = get()
      .bookings.filter((b) => b.lid === lid && ['upcoming', 'rescheduled'].includes(b.status))
      .sort(compareBookings);
    if (!up.length) {
      get().setState({ sheet: null });
      return get().showToast(
        mode === 'reschedule' ? 'No upcoming lessons to reschedule' : 'No upcoming lessons to cancel',
        'neutral',
      );
    }
    if (up.length === 1)
      return mode === 'reschedule'
        ? get().openEdit(up[0].id)
        : get().openSheet('cancelLesson', { bid: up[0].id, reason: 'Learner request' });
    get().openSheet('pickBooking', { lid, mode });
  },
});
