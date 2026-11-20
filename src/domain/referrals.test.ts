import { describe, expect, it } from 'vitest';
import { generateReferralCode, referralLink, referralReward } from './referrals';

describe('referralReward', () => {
  it('pays 20% of the referred plan total', () => {
    expect(referralReward({ total: 25 })).toBe(5);
    expect(referralReward({ total: 240 })).toBe(48);
    expect(referralReward({ total: 540 })).toBe(108);
    expect(referralReward({ total: 17.5 })).toBe(3.5);
  });
  it('is zero without a plan', () => {
    expect(referralReward(undefined)).toBe(0);
  });
});

describe('generateReferralCode', () => {
  it('builds NEX + first name + a stable two-digit number', () => {
    const code = generateReferralCode('Chloe Adams');
    expect(code).toMatch(/^NEXCHLOE\d{2}$/);
    expect(generateReferralCode('Chloe Adams')).toBe(code);
  });
  it('falls back to INSTR without a usable name', () => {
    expect(generateReferralCode('')).toMatch(/^NEXINSTR\d{2}$/);
  });
});

describe('referralLink', () => {
  it('appends the code as ?ref=', () => {
    expect(referralLink('NEXDANIEL25', 'https://example.test/join')).toBe(
      'https://example.test/join?ref=NEXDANIEL25',
    );
  });
});
