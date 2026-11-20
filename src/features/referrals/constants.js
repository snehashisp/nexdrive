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
