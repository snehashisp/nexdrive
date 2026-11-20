import { describe, expect, it } from 'vitest';
import { PLANS, planDiscountPercent, planPeriodLabel, planSaving, planTermLabel } from './plans';

const plan = (key: string) => PLANS.find((p) => p.key === key)!;

describe('subscription plans', () => {
  it('prices every plan as months x monthly price', () => {
    for (const p of PLANS) expect(p.total).toBeCloseTo(p.months * p.price);
  });

  it('measures savings against the £25 monthly plan', () => {
    expect(planSaving(plan('1m'))).toBe(0);
    expect(planSaving(plan('12m'))).toBe(60);
    expect(planSaving(plan('36m'))).toBe(360);
    expect(planDiscountPercent(plan('24m'))).toBe(30);
  });

  it('describes the term and billing period', () => {
    expect(planTermLabel(plan('1m'))).toBe('Rolling monthly · cancel any time');
    expect(planTermLabel(plan('24m'))).toBe('24-month term · £17.50/mo');
    expect(planPeriodLabel(plan('1m'))).toBe('per month');
    expect(planPeriodLabel(plan('12m'))).toBe('every 12 months');
  });
});
