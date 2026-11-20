import type {
  AppNotification,
  Booking,
  CreditTransaction,
  Instructor,
  Learner,
  Referral,
} from '@/types/models';
import { TEST_CENTRE } from '@/domain/bookings';
import { compareBookings, withLiveStatus } from '@/domain/bookings';
import {
  NOW,
  TODAY,
  formatDurationLong,
  formatDayMonth,
  formatShortDate,
  minutesToTime,
  relativeDay,
  shiftDemoDate,
  timeToMinutes,
} from '@/lib/dates';

export function seedReferrals(): Referral[] {
  return [
    {
      id: 'R1',
      name: 'Sarah Smith',
      joined: shiftDemoDate('2026-07-02'),
      plan: '12m',
      status: 'awarded',
      awardedOn: shiftDemoDate('2026-08-30'),
    },
    {
      id: 'R2',
      name: 'John Brown',
      joined: shiftDemoDate('2026-07-20'),
      plan: '24m',
      status: 'awarded',
      awardedOn: shiftDemoDate('2026-09-17'),
    },
    {
      id: 'R3',
      name: 'Aisha Khan',
      joined: shiftDemoDate('2026-07-27'),
      plan: '1m',
      status: 'awarded',
      awardedOn: shiftDemoDate('2026-09-24'),
    },
    {
      id: 'R4',
      name: 'Hannah Lee',
      joined: shiftDemoDate('2026-08-02'),
      plan: '12m',
      status: 'awarded',
      awardedOn: shiftDemoDate('2026-09-30'),
    },
    {
      id: 'R5',
      name: 'Oliver Grant',
      joined: shiftDemoDate('2026-08-20'),
      plan: '12m',
      status: 'not_qualified',
      reason: 'Cancelled during their free trial, so no reward was earned.',
    },
    { id: 'R6', name: 'Emma Wright', joined: shiftDemoDate('2026-09-28'), plan: '12m', status: 'trial' },
    { id: 'R7', name: 'Liam Carter', joined: shiftDemoDate('2026-10-05'), plan: null, status: 'registered' },
  ];
}
export function seedCredit(): CreditTransaction[] {
  return [
    {
      id: 'T1',
      date: shiftDemoDate('2026-08-30'),
      type: 'referral',
      desc: 'Referral reward — Sarah Smith',
      ref: 'R1',
      amt: 48,
    },
    {
      id: 'T2',
      date: shiftDemoDate('2026-09-17'),
      type: 'referral',
      desc: 'Referral reward — John Brown',
      ref: 'R2',
      amt: 84,
    },
    {
      id: 'T3',
      date: shiftDemoDate('2026-09-24'),
      type: 'referral',
      desc: 'Referral reward — Aisha Khan',
      ref: 'R3',
      amt: 5,
    },
    {
      id: 'T4',
      date: shiftDemoDate('2026-09-26'),
      type: 'redeemed',
      desc: 'Applied to Monthly subscription payment',
      amt: -25,
    },
    {
      id: 'T5',
      date: shiftDemoDate('2026-09-30'),
      type: 'referral',
      desc: 'Referral reward — Hannah Lee',
      ref: 'R4',
      amt: 48,
    },
  ];
}
export function seedLearners(): Learner[] {
  return [
    {
      id: 'L1',
      name: 'James Smith',
      phone: '07700 900456',
      email: 'james.smith@gmail.com',
      address: '27 Stoke Poges Lane, Slough',
      postcode: 'SL1 3NY',
      licence: 'SMITH801157J99AB',
      theory: '30418722',
      notes: `Practical test booked for ${formatShortDate(shiftDemoDate('2026-11-03'))}. Working on roundabouts and bay parking.`,
      since: shiftDemoDate('2026-07-14'),
    },
    {
      id: 'L2',
      name: 'Priya Patel',
      phone: '07700 900218',
      email: '',
      address: '8 Langley Road, Slough',
      postcode: 'SL3 7AB',
      licence: 'PATEL856204PR1CD',
      theory: '51102938',
      notes: '',
      since: shiftDemoDate('2026-08-02'),
    },
    {
      id: 'L3',
      name: 'Oliver Hughes',
      phone: '07700 900731',
      email: 'oliver.h@outlook.com',
      address: '51 Farnham Road, Slough',
      postcode: 'SL1 4UT',
      licence: 'HUGHE703128OJ9KL',
      theory: '',
      notes: `Theory test booked for ${formatDayMonth(shiftDemoDate('2026-10-19'))}.`,
      since: shiftDemoDate('2026-09-01'),
    },
    {
      id: 'L4',
      name: 'Amelia Clarke',
      phone: '07700 900864',
      email: '',
      address: '22 High Street, Eton',
      postcode: 'SL4 6AX',
      licence: '',
      theory: '',
      notes: '',
      since: shiftDemoDate('2026-10-05'),
    },
    {
      id: 'L5',
      name: 'Mohammed Ali',
      phone: '07700 900392',
      email: '',
      address: '9 Elliman Avenue, Slough',
      postcode: 'SL2 5BA',
      licence: 'ALI99804215M99QZ',
      theory: '40937716',
      notes: '',
      since: shiftDemoDate('2026-06-20'),
    },
    {
      id: 'L6',
      name: 'Sophie Turner',
      phone: '07700 900145',
      email: 'sophie.turner@icloud.com',
      address: '41 Upton Court Road, Slough',
      postcode: 'SL3 7LU',
      licence: 'TURNE861309SE2TR',
      theory: '62210487',
      notes: '',
      since: shiftDemoDate('2026-08-18'),
    },
    {
      id: 'L7',
      name: 'Ethan Wright',
      phone: '07700 900677',
      email: '',
      address: '15 Albert Street, Windsor',
      postcode: 'SL4 5BU',
      licence: 'WRIGH704223EW9AB',
      theory: '38820154',
      notes: `Passed practical test on ${formatDayMonth(shiftDemoDate('2026-10-03'))}.`,
      since: shiftDemoDate('2026-04-11'),
      archived: true,
      archivedOn: shiftDemoDate('2026-10-04'),
    },
  ];
}
export function seedBookings(): Booking[] {
  const L = {};
  seedLearners().forEach((l) => (L[l.id] = l));
  const B = (id, lid, date, start, dur, status, x = {}) => ({
    id,
    lid,
    date,
    start,
    dur,
    rate: 40,
    rateKey: 'std',
    discount: 0,
    status,
    loc: L[lid].address,
    pc: L[lid].postcode,
    ...x,
  });
  return [
    B('b25', 'L7', shiftDemoDate('2026-09-21'), '09:00', 2, 'completed'),
    B('b24', 'L1', shiftDemoDate('2026-09-23'), '10:00', 2, 'completed'),
    B('b21', 'L7', shiftDemoDate('2026-09-28'), '16:00', 1, 'cancelled', { reason: 'Learner unwell' }),
    B('b1', 'L1', shiftDemoDate('2026-09-30'), '10:00', 2, 'completed'),
    B('b2', 'L2', shiftDemoDate('2026-10-02'), '15:00', 1, 'completed'),
    B('b3', 'L7', shiftDemoDate('2026-10-03'), '09:00', 2, 'completed', {
      loc: TEST_CENTRE.loc,
      pc: TEST_CENTRE.pc,
    }),
    B('b4', 'L1', shiftDemoDate('2026-10-05'), '10:00', 2, 'completed'),
    B('b5', 'L6', shiftDemoDate('2026-10-05'), '16:00', 1, 'cancelled', { reason: 'Learner request' }),
    B('b6', 'L3', shiftDemoDate('2026-10-06'), '11:00', 1.5, 'completed'),
    B('b7', 'L5', shiftDemoDate('2026-10-06'), '14:00', 1, 'completed'),
    B('b8', 'L5', shiftDemoDate('2026-10-07'), '09:00', 1, 'completed'),
    B('b9', 'L2', shiftDemoDate('2026-10-07'), '12:15', 1.5, 'ongoing'),
    B('b10', 'L1', shiftDemoDate('2026-10-07'), '14:00', 2, 'upcoming'),
    B('b11', 'L3', shiftDemoDate('2026-10-07'), '16:30', 1, 'upcoming'),
    B('b12', 'L6', shiftDemoDate('2026-10-08'), '10:00', 2, 'rescheduled', {
      prev: { date: shiftDemoDate('2026-10-07'), start: '10:00' },
    }),
    B('b13', 'L5', shiftDemoDate('2026-10-08'), '15:00', 1, 'upcoming'),
    B('b14', 'L1', shiftDemoDate('2026-10-09'), '09:30', 2, 'upcoming', { discount: 10, pkg: 'P1' }),
    B('b15', 'L2', shiftDemoDate('2026-10-09'), '13:00', 1, 'upcoming'),
    B('b16', 'L3', shiftDemoDate('2026-10-10'), '10:00', 2, 'upcoming', {
      loc: TEST_CENTRE.loc,
      pc: TEST_CENTRE.pc,
    }),
    B('b17', 'L1', shiftDemoDate('2026-10-12'), '14:00', 2, 'upcoming'),
    B('b18', 'L6', shiftDemoDate('2026-10-14'), '11:00', 1, 'upcoming'),
    B('b19', 'L1', shiftDemoDate('2026-10-16'), '09:30', 2, 'upcoming', { discount: 10, pkg: 'P1' }),
    B('b20', 'L5', shiftDemoDate('2026-10-20'), '10:00', 1, 'upcoming'),
    B('b22', 'L2', shiftDemoDate('2026-10-22'), '15:00', 1.5, 'upcoming'),
    B('b23', 'L3', shiftDemoDate('2026-10-27'), '11:00', 2, 'upcoming'),
  ].map(withLiveStatus);
}
export function seedNotifs(): AppNotification[] {
  const L = {};
  seedLearners().forEach((l) => (L[l.id] = l));
  const nx = seedBookings()
    .filter(
      (b) =>
        b.date === TODAY && ['upcoming', 'rescheduled'].includes(b.status) && timeToMinutes(b.start) > NOW,
    )
    .sort(compareBookings)[0];
  const mins = nx ? timeToMinutes(nx.start) - NOW : 999;
  return [
    ...(nx && mins <= 30
      ? [
          {
            id: 'n1',
            cat: 'lessons',
            icon: 'clock',
            title: `Your next lesson starts in ${mins} minute${mins === 1 ? '' : 's'}`,
            body: `${L[nx.lid].name} · ${nx.start} · ${formatDurationLong(nx.dur)} · ${nx.pc}`,
            time: minutesToTime(Math.max(0, timeToMinutes(nx.start) - 30)),
            unread: true,
            act: { lesson: nx.id },
          },
        ]
      : []),
    {
      id: 'n2',
      cat: 'rewards',
      icon: 'gift',
      title: 'Referral pending',
      body: 'Your referral is pending while Emma completes her free trial. You’ll earn £48 once her first payment is confirmed.',
      time: NOW >= 540 ? '09:00' : 'Yesterday',
      unread: true,
      act: { screen: 'referrals' },
    },
    {
      id: 'n3',
      cat: 'learners',
      icon: 'user',
      title: 'Amelia Clarke’s details are incomplete',
      body: 'Add her provisional licence number before booking a lesson.',
      time: 'Yesterday',
      unread: true,
      act: { learner: 'L4' },
    },
    {
      id: 'n4',
      cat: 'lessons',
      icon: 'repeat',
      title: 'Booking changed',
      body: `Sophie Turner moved from ${formatShortDate(shiftDemoDate('2026-10-07'))} 10:00 to ${formatShortDate(shiftDemoDate('2026-10-08'))} 10:00.`,
      time: 'Yesterday',
      act: { lesson: 'b12' },
    },
    {
      id: 'n5',
      cat: 'lessons',
      icon: 'calendarPlus',
      title: 'Booking created',
      body: '2 lessons for James Smith · £140 after £20 discount.',
      time: relativeDay(shiftDemoDate('2026-10-05')),
      act: { lesson: 'b14' },
    },
    {
      id: 'n6',
      cat: 'lessons',
      icon: 'calendarX',
      title: 'Booking cancelled',
      body: `Sophie Turner · ${formatShortDate(shiftDemoDate('2026-10-05'))}, 16:00 · Learner request`,
      time: relativeDay(shiftDemoDate('2026-10-05')),
      act: { lesson: 'b5' },
    },
    {
      id: 'n9',
      cat: 'rewards',
      icon: 'gift',
      title: '£48 added to your NexDrive Credit',
      body: 'Great news! Hannah has joined NexDrive using your referral code. £48 has been added to your NexDrive Credit.',
      time: relativeDay(shiftDemoDate('2026-09-30')),
      act: { screen: 'credit' },
    },
    {
      id: 'n7',
      cat: 'rewards',
      icon: 'gift',
      title: 'NexDrive Credit applied',
      body: '£25 of your NexDrive Credit has been applied to your subscription.',
      time: relativeDay(shiftDemoDate('2026-09-26')),
      act: { screen: 'credit' },
    },
  ];
}
export const seedInst = (): Instructor => ({
  name: 'Daniel Wilson',
  phone: '07700 900123',
  email: 'daniel@wilsondriving.co.uk',
  address: 'Flat 4, 112 Bath Road, Slough',
  postcode: 'SL1 3XE',
  adi: '482913',
  status: 'adi',
  business: 'Wilson Driving School',
  areas: ['SL1', 'SL2', 'SL3', 'SL4', 'SL6'],
  defaultDur: 1,
  rates: [
    { key: 'std', label: 'Standard', rate: 40 },
    { key: 'int', label: 'Intensive course', rate: 36 },
    { key: 'pp', label: 'Pass Plus', rate: 45 },
  ],
});
