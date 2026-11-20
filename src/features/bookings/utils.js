import { NOW, TODAY, timeToMinutes } from '@/lib/dates';

// A booking with its status recomputed from the clock (upcoming → ongoing → completed).
export const withLiveStatus = (b) => {
  if (b.status === 'cancelled') return b;
  const sm = timeToMinutes(b.start),
    em = sm + b.dur * 60;
  let st;
  if (b.date < TODAY || (b.date === TODAY && em <= NOW)) st = 'completed';
  else if (b.date === TODAY && sm <= NOW) st = 'ongoing';
  else st = b.status === 'rescheduled' ? 'rescheduled' : 'upcoming';
  return st === b.status ? b : { ...b, status: st };
};
// Sort bookings by date, then start time.
export const compareBookings = (a, b) => (a.date + a.start).localeCompare(b.date + b.start);
