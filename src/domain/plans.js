import { formatGBP } from '@/lib/format';

// Subscription plans and how their prices are described. Monthly (£25) is the baseline for savings.
export const PLANS = [
  { key: '1m', name: 'Monthly', months: 1, price: 25, total: 25 },
  { key: '12m', name: '12 months', months: 12, price: 20, total: 240 },
  { key: '24m', name: '24 months', months: 24, price: 17.5, total: 420 },
  { key: '36m', name: '36 months', months: 36, price: 15, total: 540 },
];
export const planSaving = (p) => (p.months === 1 ? 0 : Math.round(25 * p.months - p.total));
export const planDiscountPercent = (p) => Math.round((1 - p.price / 25) * 100);
export const planTermLabel = (p) =>
  p.months === 1 ? 'Rolling monthly · cancel any time' : `${p.months}-month term · ${formatGBP(p.price)}/mo`;
export const planPeriodLabel = (p) => (p.months === 1 ? 'per month' : `every ${p.months} months`);
