// Display formatting for money, names and driving licence numbers.

/** Pounds, with pence only when there are any: 40 -> '£40', 1250 -> '£1,250', 17.5 -> '£17.50'. */
export const formatGBP = (n: number): string =>
  '£' + (Math.round(n * 100) % 100 ? n.toFixed(2) : Math.round(n).toLocaleString('en-GB'));

/** Up to two initials: 'Daniel Wilson' -> 'DW'; empty -> '?'. */
export const initials = (name: string | null | undefined): string =>
  (name || '?')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

/** A UK driving licence number with spaces removed, upper-cased. */
export const normalizeLicence = (v: string | null | undefined): string =>
  (v || '').replace(/\s/g, '').toUpperCase();

/** A 16-character licence number grouped for reading ('MORGA 753116 SM 9IJ'); anything else unchanged. */
export const formatLicence = (v: string): string => {
  const c = normalizeLicence(v);
  return c.length === 16 ? `${c.slice(0, 5)} ${c.slice(5, 11)} ${c.slice(11, 13)} ${c.slice(13)}` : v;
};
