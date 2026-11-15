export let TODAY, NOW;
export const ANCHOR = '2026-10-07';
export const pad = (n) => String(n).padStart(2, '0');
export const D = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
export const iso = (d) => d.toISOString().slice(0, 10);
export const addDays = (s, n) => {
  const d = D(s);
  d.setUTCDate(d.getUTCDate() + n);
  return iso(d);
};
export const dayDiff = (a, b) => Math.round((D(b) - D(a)) / 864e5);
export const _p2 = (n) => String(n).padStart(2, '0');
export function syncClock() {
  const d = new Date();
  TODAY = `${d.getFullYear()}-${_p2(d.getMonth() + 1)}-${_p2(d.getDate())}`;
  NOW = d.getHours() * 60 + d.getMinutes();
}
syncClock();
export const nowHM = () => _p2(Math.floor(NOW / 60)) + ':' + _p2(NOW % 60);
export const SHIFT = dayDiff(ANCHOR, TODAY);
export const sd = (s) => addDays(s, SHIFT);
export const addMonths = (s, n) => {
  const d = D(s);
  d.setUTCMonth(d.getUTCMonth() + n);
  return iso(d);
};
export const fDM = (s) => {
  const d = D(s);
  return `${d.getUTCDate()} ${MO[d.getUTCMonth()]}`;
};
export const fDML = (s) => {
  const d = D(s);
  return `${d.getUTCDate()} ${MOL[d.getUTCMonth()]}`;
};
export const fSY = (s) => fS(s) + ' ' + D(s).getUTCFullYear();
export const ord = (n) => {
  const x = ['th', 'st', 'nd', 'rd'],
    v = n % 100;
  return n + (x[(v - 20) % 10] || x[v] || x[0]);
};
export const relDay = (s) => {
  const n = dayDiff(s, TODAY);
  return n <= 0 ? 'Today' : n === 1 ? 'Yesterday' : n < 7 ? DW[D(s).getUTCDay()] : fDM(s);
};
export const DW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DWL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MOL = [
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
export const fS = (s) => {
  const d = D(s);
  return `${DW[d.getUTCDay()]} ${d.getUTCDate()} ${MO[d.getUTCMonth()]}`;
};
export const fL = (s) => {
  const d = D(s);
  return `${DWL[d.getUTCDay()]} ${d.getUTCDate()} ${MOL[d.getUTCMonth()]}`;
};
export const fF = (s) => fL(s) + ' ' + D(s).getUTCFullYear();
export const fD = (s) => {
  const d = D(s);
  return `${d.getUTCDate()} ${MO[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};
export const tm = (t) => +t.slice(0, 2) * 60 + +t.slice(3, 5);
export const hm = (m) => pad(Math.floor(m / 60)) + ':' + pad(m % 60);
export const durL = (h) => {
  const H = Math.floor(h),
    M = Math.round((h - H) * 60);
  if (!M) return H + (H === 1 ? ' hour' : ' hours');
  if (!H) return M + ' min';
  return `${H} hr ${M} min`;
};
export const durS = (h) => {
  const H = Math.floor(h),
    M = Math.round((h - H) * 60);
  return (H ? H + 'h' : '') + (M ? (H ? ' ' : '') + M + 'm' : '');
};
