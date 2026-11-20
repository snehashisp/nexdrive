// Date and time helpers. Dates are ISO strings ('YYYY-MM-DD') handled in UTC so that adding days never
// trips over daylight-saving changes; times of day are 'HH:MM' strings or minutes since midnight.

/** An ISO calendar date, 'YYYY-MM-DD'. */
export type IsoDate = string;
/** A time of day, 'HH:MM' (24-hour). */
export type TimeHHMM = string;

export const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** Two-digit zero padding: 7 -> '07'. */
export const pad = (n: number): string => String(n).padStart(2, '0');

export const parseIsoDate = (s: IsoDate): Date => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
export const toIsoDate = (d: Date): IsoDate => d.toISOString().slice(0, 10);

export const addDays = (s: IsoDate, n: number): IsoDate => {
  const d = parseIsoDate(s);
  d.setUTCDate(d.getUTCDate() + n);
  return toIsoDate(d);
};
export const addMonths = (s: IsoDate, n: number): IsoDate => {
  const d = parseIsoDate(s);
  d.setUTCMonth(d.getUTCMonth() + n);
  return toIsoDate(d);
};
/** Whole days from `a` to `b` (negative if `b` is earlier). */
export const daysBetween = (a: IsoDate, b: IsoDate): number =>
  Math.round((parseIsoDate(b).getTime() - parseIsoDate(a).getTime()) / 864e5);

/** '09:30' -> 570 */
export const timeToMinutes = (t: TimeHHMM): number => +t.slice(0, 2) * 60 + +t.slice(3, 5);
/** 570 -> '09:30' */
export const minutesToTime = (m: number): TimeHHMM => pad(Math.floor(m / 60)) + ':' + pad(m % 60);

// The app clock. TODAY and NOW are refreshed by syncClock() (on start-up and every minute) and read
// everywhere as live bindings. NOW is minutes since local midnight.
export let TODAY: IsoDate = '';
export let NOW = 0;
export function syncClock(): void {
  const d = new Date();
  TODAY = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  NOW = d.getHours() * 60 + d.getMinutes();
}
syncClock();
export const currentTimeHHMM = (): TimeHHMM => minutesToTime(NOW);

// Demo data is written as if today were DEMO_ANCHOR_DATE. shiftDemoDate() moves a seed date by the same
// distance as the real today, so the demo always looks current.
export const DEMO_ANCHOR_DATE: IsoDate = '2026-10-07';
export const DEMO_DAY_SHIFT = daysBetween(DEMO_ANCHOR_DATE, TODAY);
export const shiftDemoDate = (s: IsoDate): IsoDate => addDays(s, DEMO_DAY_SHIFT);

/** '7 Oct' */
export const formatDayMonth = (s: IsoDate): string => {
  const d = parseIsoDate(s);
  return `${d.getUTCDate()} ${MONTHS_SHORT[d.getUTCMonth()]}`;
};
/** '7 October' */
export const formatDayMonthLong = (s: IsoDate): string => {
  const d = parseIsoDate(s);
  return `${d.getUTCDate()} ${MONTHS_LONG[d.getUTCMonth()]}`;
};
/** 'Wed 7 Oct' */
export const formatShortDate = (s: IsoDate): string => {
  const d = parseIsoDate(s);
  return `${WEEKDAYS_SHORT[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS_SHORT[d.getUTCMonth()]}`;
};
/** 'Wed 7 Oct 2026' */
export const formatShortDateYear = (s: IsoDate): string =>
  formatShortDate(s) + ' ' + parseIsoDate(s).getUTCFullYear();
/** 'Wednesday 7 October' */
export const formatLongDate = (s: IsoDate): string => {
  const d = parseIsoDate(s);
  return `${WEEKDAYS_LONG[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS_LONG[d.getUTCMonth()]}`;
};
/** 'Wednesday 7 October 2026' */
export const formatFullDate = (s: IsoDate): string =>
  formatLongDate(s) + ' ' + parseIsoDate(s).getUTCFullYear();
/** '7 Oct 2026' */
export const formatDate = (s: IsoDate): string => {
  const d = parseIsoDate(s);
  return `${d.getUTCDate()} ${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};
/** 1 -> '1st', 12 -> '12th', 22 -> '22nd' */
export const ordinal = (n: number): string => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};
/** For past dates: 'Today', 'Yesterday', a weekday within the last week, otherwise '7 Oct'. */
export const relativeDay = (s: IsoDate): string => {
  const n = daysBetween(s, TODAY);
  if (n <= 0) return 'Today';
  if (n === 1) return 'Yesterday';
  if (n < 7) return WEEKDAYS_SHORT[parseIsoDate(s).getUTCDay()];
  return formatDayMonth(s);
};

/** Duration in hours -> '1 hour', '2 hours', '45 min', '1 hr 30 min'. */
export const formatDurationLong = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (!m) return h + (h === 1 ? ' hour' : ' hours');
  if (!h) return m + ' min';
  return `${h} hr ${m} min`;
};
/** Duration in hours -> '1h', '45m', '1h 30m'. */
export const formatDurationShort = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return (h ? h + 'h' : '') + (m ? (h ? ' ' : '') + m + 'm' : '');
};
