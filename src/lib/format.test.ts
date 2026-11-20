import { describe, expect, it } from 'vitest';
import { formatGBP, formatLicence, initials, normalizeLicence } from './format';

describe('formatGBP', () => {
  it('shows whole pounds without pence and with thousands separators', () => {
    expect(formatGBP(40)).toBe('£40');
    expect(formatGBP(1250)).toBe('£1,250');
  });

  it('shows pence when there are any', () => {
    expect(formatGBP(17.5)).toBe('£17.50');
    expect(formatGBP(0.99)).toBe('£0.99');
  });
});

describe('initials', () => {
  it('takes up to two initials', () => {
    expect(initials('Daniel Wilson')).toBe('DW');
    expect(initials('mary jane watson')).toBe('MJ');
    expect(initials('  Cher ')).toBe('C');
  });

  it('falls back to ? for no name', () => {
    expect(initials('')).toBe('?');
    expect(initials(undefined)).toBe('?');
  });
});

describe('licence numbers', () => {
  it('normalises and groups a 16-character number', () => {
    expect(normalizeLicence('morga 753116 sm9ij')).toBe('MORGA753116SM9IJ');
    expect(formatLicence('MORGA753116SM9IJ')).toBe('MORGA 753116 SM 9IJ');
  });

  it('leaves anything else unchanged', () => {
    expect(formatLicence('ABC')).toBe('ABC');
  });
});
