import { NOW, TODAY, tm } from '../lib/dates';
import { gbp } from '../lib/format';

export const DEV = { phone: { w: 390, h: 844 }, large: { w: 430, h: 932 }, tablet: { w: 820, h: 1180 } };
export const liveStatus = (b) => {
  if (b.status === 'cancelled') return b;
  const sm = tm(b.start),
    em = sm + b.dur * 60;
  let st;
  if (b.date < TODAY || (b.date === TODAY && em <= NOW)) st = 'completed';
  else if (b.date === TODAY && sm <= NOW) st = 'ongoing';
  else st = b.status === 'rescheduled' ? 'rescheduled' : 'upcoming';
  return st === b.status ? b : { ...b, status: st };
};
export const cmpB = (a, b) => (a.date + a.start).localeCompare(b.date + b.start);
export const FUT = ['upcoming', 'rescheduled', 'ongoing'];
export const TEST = { loc: 'Slough (Langley) Driving Test Centre', pc: 'SL3 8DS' };
export const ST = {
  ongoing: {
    label: 'Ongoing',
    bg: '#7C3AED',
    fg: '#FFFFFF',
    bar: '#7C3AED',
    tint: '#EDE9FE',
    ink: '#5B21B6',
  },
  upcoming: {
    label: 'Upcoming',
    bg: '#DBEAFE',
    fg: '#1D4ED8',
    bar: '#2563EB',
    tint: '#EFF6FF',
    ink: '#1E3A8A',
  },
  completed: {
    label: 'Completed',
    bg: '#DCFCE7',
    fg: '#166534',
    bar: '#16A34A',
    tint: '#F0FDF4',
    ink: '#14532D',
  },
  cancelled: {
    label: 'Cancelled',
    bg: '#FEE2E2',
    fg: '#991B1B',
    bar: '#DC2626',
    tint: '#FEF2F2',
    ink: '#7F1D1D',
  },
  rescheduled: {
    label: 'Rescheduled',
    bg: '#FEF3C7',
    fg: '#92400E',
    bar: '#D97706',
    tint: '#FFFBEB',
    ink: '#78350F',
  },
};
export const PLANS = [
  { key: '1m', name: 'Monthly', months: 1, price: 25, total: 25 },
  { key: '12m', name: '12 months', months: 12, price: 20, total: 240 },
  { key: '24m', name: '24 months', months: 24, price: 17.5, total: 420 },
  { key: '36m', name: '36 months', months: 36, price: 15, total: 540 },
];
export const planSave = (p) => (p.months === 1 ? 0 : Math.round(25 * p.months - p.total));
export const planPct = (p) => Math.round((1 - p.price / 25) * 100);
export const planTerm = (p) =>
  p.months === 1 ? 'Rolling monthly · cancel any time' : `${p.months}-month term · ${gbp(p.price)}/mo`;
export const planPer = (p) => (p.months === 1 ? 'per month' : `every ${p.months} months`);
export const REF = { pct: 20, code: 'NEXDANIEL25' };
export const REF_CODES = {
  NEXDANIEL25: {
    owner: 'Daniel W.',
    active: true,
    phone: '07700900123',
    email: 'daniel@wilsondriving.co.uk',
  },
  NEXMARK14: { owner: 'Mark D.', active: false },
};
export const REF_USED_PHONES = ['07700900301'];
export const refLink = (c, base) =>
  `${base || 'https://app.nexdrive.co.uk/join'}?ref=${encodeURIComponent(c)}`;
export const refReward = (pl) => (pl ? Math.round(pl.total * REF.pct) / 100 : 0);
export const genCode = (n) => {
  const f =
    (n || '')
      .split(' ')[0]
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .slice(0, 8) || 'INSTR';
  let x = 0;
  for (const ch of n || '') x = (x * 31 + ch.charCodeAt(0)) % 100000;
  return 'NEX' + f + String(20 + (x % 80));
};
export const RS = {
  registered: { label: 'Registered', bg: '#F7F7F9', fg: '#4A4A5A', step: 1 },
  trial: { label: 'Trial active', bg: '#DBEAFE', fg: '#1D4ED8', step: 2 },
  free_month: { label: 'Free month', bg: '#DBEAFE', fg: '#1D4ED8', step: 2 },
  confirmed: { label: 'Payment confirmed', bg: '#FEF3C7', fg: '#92400E', step: 4 },
  awarded: { label: 'Credit awarded', bg: '#DCFCE7', fg: '#166534', step: 5 },
  not_qualified: { label: 'No reward', bg: '#FEE2E2', fg: '#991B1B', step: -1 },
  reversed: { label: 'Reversed', bg: '#FEE2E2', fg: '#991B1B', step: -1 },
};
export const REF_PENDING = ['registered', 'trial', 'free_month', 'confirmed'];
export const REF_STEPS = [
  'Referral started',
  'Registration completed',
  'Subscription confirmed',
  'Trial and free month',
  'Qualifying payment confirmed',
  'Credit awarded',
];
export const FLOWS = [
  ['onboarding', 'Onboarding', 'Welcome → Register → Verify → Instructor details → Trial & plan → Dashboard'],
  ['learner', 'Learner workflow', 'Learners → Add learner → Profile → Schedule lesson'],
  ['booking', 'Booking workflow', 'Learner → Date & time → Duration → Price → Discount → Confirm → Message'],
  ['package', 'Multiple lessons', 'James → 5 lessons → £10 off → Review sessions → Send'],
  ['calendar', 'Calendar workflow', 'Day / Week / Month → Booking → Reschedule or cancel'],
  ['nav', 'Navigation workflow', '30-min reminder → Lesson → Navigate → Google Maps'],
  ['sub', 'Subscription workflow', 'Account → Subscription → Upgrade → Confirmation'],
  ['referral', 'Referral & Rewards', 'Dashboard → Refer & earn → Code, QR & sharing → History → Credit'],
  [
    'refManual',
    'New instructor: referral code',
    'Register → Enter NEXDANIEL25 → Applied → Plan with free month',
  ],
  ['refQr', 'New instructor: QR invite', 'Scan QR → Invited → Code pre-filled → Trial + free month'],
  ['reward', 'Credit reward', 'Emma’s first payment qualifies → +£48 credit → Notification'],
  ['credit', 'Using credit', 'Subscription → 12 months → Apply £160 credit → £80 payable'],
  ['incomplete', 'Edge case: incomplete learner', 'Booking is blocked until required details are added'],
  ['conflict', 'Edge case: booking clash', 'Pick an occupied slot and the clash is caught'],
  ['empty', 'Empty states', 'A brand-new account with no data yet'],
];
export const opt = (sel) => ({
  bg: sel ? '#7C3AED' : '#FFFFFF',
  fg: sel ? '#FFFFFF' : '#0A0A0F',
  bd: sel ? '#7C3AED' : '#CFCFD8',
});
export const ring = (sel) => (sel ? '6px solid #7C3AED' : '1.5px solid #6B6B7B');
export const ERR = '#B91C1C',
  OKB = '#CFCFD8';
