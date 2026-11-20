import type { Sheet } from '@/types/models';
import { choiceColors } from '@/lib/inline-styles';
import {
  formatDurationLong,
  formatFullDate,
  formatShortDate,
  minutesToTime,
  pad,
  timeToMinutes,
} from '@/lib/dates';
import { formatGBP } from '@/lib/format';
import { useViewContext, type View } from '@/hooks/useViewContext';

// The message preview for the booking(s) in sheet S.
function msgVm(store, S) {
  const s = store.state;
  const bs = S.ids.map((id) => store.booking(id)).filter(Boolean);
  if (!bs.length) return null;
  const b = bs[0];
  const L = store.learner(b.lid) || { name: 'Learner', phone: '' };
  const fn = L.name.split(' ')[0];
  const multi = bs.length > 1;
  const sum = bs.reduce((a, x) => a + x.rate * x.dur, 0);
  const disc = bs.reduce((a, x) => a + x.discount, 0);
  const tot = Math.max(0, sum - disc);
  const end = minutesToTime(timeToMinutes(b.start) + Math.round(b.dur * 60));
  const k = S.kind;
  const title = {
    new: multi ? 'Send schedule to learner?' : 'Send lesson details to learner?',
    resend: 'Send lesson details to learner?',
    update: 'Booking updated. Would you like to notify the learner?',
    cancel: 'Notify learner about this cancellation?',
  }[k];
  const head = {
    new: multi ? `${bs.length} lessons booked` : 'Lesson booked',
    resend: 'Your lesson details',
    update: 'Lesson changed',
    cancel: 'Lesson cancelled',
  }[k];
  const intro = {
    new: multi
      ? `Hi ${fn}, your ${bs.length} driving lessons are booked. Here’s your schedule.`
      : `Hi ${fn}, your driving lesson is booked.`,
    resend: `Hi ${fn}, here are the details for your next lesson.`,
    update: `Hi ${fn}, your lesson has moved. Here are the new details.`,
    cancel: `Hi ${fn}, sorry — the lesson below has been cancelled.`,
  }[k];
  let rows = [
    { k: 'Date', v: formatFullDate(b.date) },
    { k: 'Time', v: `${b.start}–${end}` },
    { k: 'Duration', v: formatDurationLong(b.dur) },
    { k: 'Pickup', v: `${b.loc}, ${b.pc}` },
    { k: 'Instructor', v: s.inst.name },
  ];
  if (k === 'cancel')
    rows = [
      { k: 'Date', v: formatFullDate(b.date) },
      { k: 'Time', v: `${b.start}–${end}` },
      { k: 'Reason', v: S.reason || b.reason || '—' },
    ];
  if (multi)
    rows = [
      { k: 'Duration', v: `${formatDurationLong(b.dur)} each` },
      { k: 'Pickup', v: `${b.loc}, ${b.pc}` },
      { k: 'Instructor', v: s.inst.name },
    ];
  const pv = S.prev;
  const showPrev = k === 'update' && !!pv;
  const priceRows = (
    multi
      ? [{ k: `${bs.length} × ${formatGBP(b.rate * b.dur)}`, v: formatGBP(sum) }]
      : [{ k: 'Lesson price', v: formatGBP(sum) }]
  ).concat(disc ? [{ k: 'Discount', v: '−' + formatGBP(disc) }] : []);
  const amtCh = showPrev && Math.abs(pv.fin - tot) > 0.001;
  const bank = s.bank && s.bank.include && k !== 'cancel' ? s.bank : null;
  const ref = `${(L.name.split(' ').slice(-1)[0] || '').toUpperCase().slice(0, 6)}-${b.date.slice(8, 10)}${b.date.slice(5, 7)}`;
  return {
    title,
    head,
    intro,
    to: `${L.name} · ${L.phone}`,
    rows,
    multi,
    sess: multi
      ? bs.map((x, i) => ({
          n: pad(i + 1),
          t: formatShortDate(x.date),
          tm: `${x.start}–${minutesToTime(timeToMinutes(x.start) + Math.round(x.dur * 60))}`,
        }))
      : [],
    showPrev,
    prevT: showPrev ? `${formatShortDate(pv.date)}, ${pv.start}` : '',
    newT: showPrev ? `${formatShortDate(b.date)}, ${b.start}` : '',
    hasPrice: k !== 'cancel',
    priceRows,
    total: formatGBP(tot),
    amtNote: amtCh ? `Updated from ${formatGBP(pv.fin)}` : '',
    bank: !!bank,
    bankRows: bank
      ? [
          { k: 'Account name', v: bank.holder },
          { k: 'Sort code', v: bank.sort },
          { k: 'Account number', v: bank.acct },
          { k: 'Reference', v: ref },
        ]
      : [],
    bankMissing: !s.bank && k !== 'cancel',
    addBank: () => {
      store.afterMsg(S);
      setTimeout(() => store.goBank(), 0);
    },
    sign: `${s.inst.name.split(' ')[0]} · ${s.inst.business || s.inst.name}`,
    chans: ['SMS', 'WhatsApp', 'Email'].map((m) => ({
      t: m,
      ...choiceColors(s.prefs.channel === m),
      pick: () => store.setState({ prefs: { ...s.prefs, channel: m } }),
    })),
    failed: !!S.failed,
    sendLabel: S.sending ? 'Sending…' : S.failed ? 'Try again' : 'Send message',
    send: () => store.sendMsg(),
    skip: () => store.skipMsg(),
    skipLabel: k === 'cancel' ? 'Don’t notify' : 'Don’t send',
    copy: () => store.showToast('Message copied — paste it into any app', 'neutral'),
  };
}

// Display values and handlers for the learner-message sheet (new, changed or cancelled lesson).
export function useMessageView() {
  const { common, store, s } = useViewContext();
  const v: View = { ...common };
  const S: Sheet = s.sheet || ({} as Sheet);
  if (S.type === 'message') v.msg = msgVm(store, S);
  return v;
}
