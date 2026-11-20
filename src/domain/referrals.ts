// Referral programme: reward percentage, the demo instructor's own code, and the referral lifecycle.
export const REFERRAL = { pct: 20, code: 'NEXDANIEL25' };
export const REFERRAL_STATUS = {
  registered: { label: 'Registered', bg: '#F7F7F9', fg: '#4A4A5A', step: 1 },
  trial: { label: 'Trial active', bg: '#DBEAFE', fg: '#1D4ED8', step: 2 },
  free_month: { label: 'Free month', bg: '#DBEAFE', fg: '#1D4ED8', step: 2 },
  confirmed: { label: 'Payment confirmed', bg: '#FEF3C7', fg: '#92400E', step: 4 },
  awarded: { label: 'Credit awarded', bg: '#DCFCE7', fg: '#166534', step: 5 },
  not_qualified: { label: 'No reward', bg: '#FEE2E2', fg: '#991B1B', step: -1 },
  reversed: { label: 'Reversed', bg: '#FEE2E2', fg: '#991B1B', step: -1 },
};
export const PENDING_REFERRAL_STATUSES = ['registered', 'trial', 'free_month', 'confirmed'];
export const REFERRAL_STEPS = [
  'Referral started',
  'Registration completed',
  'Subscription confirmed',
  'Trial and free month',
  'Qualifying payment confirmed',
  'Credit awarded',
];

export const referralLink = (c, base) =>
  `${base || 'https://app.nexdrive.co.uk/join'}?ref=${encodeURIComponent(c)}`;
export const referralReward = (pl) => (pl ? Math.round(pl.total * REFERRAL.pct) / 100 : 0);
export const generateReferralCode = (n) => {
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
