import { REFERRAL } from './constants';

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
