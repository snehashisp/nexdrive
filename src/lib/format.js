export const gbp = (n) =>
  '£' + (Math.round(n * 100) % 100 ? n.toFixed(2) : Math.round(n).toLocaleString('en-GB'));
export const ini = (n) =>
  (n || '?')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
export const cLic = (v) => (v || '').replace(/\s/g, '').toUpperCase();
export const fLic = (v) => {
  const c = cLic(v);
  return c.length === 16 ? `${c.slice(0, 5)} ${c.slice(5, 11)} ${c.slice(11, 13)} ${c.slice(13)}` : v;
};
