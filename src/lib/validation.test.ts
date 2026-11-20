import { describe, expect, it } from 'vitest';
import { isValidEmail, isValidLicence, isValidPostcode, isValidUkMobile } from './validation';

describe('isValidUkMobile', () => {
  it.each(['07700900123', '07700 900123', '+447700900123', '(07700) 900-123'])('accepts %s', (v) => {
    expect(isValidUkMobile(v)).toBe(true);
  });
  it.each(['', '0770090012', '01753123456', '+4407700900123', undefined])('rejects %s', (v) => {
    expect(isValidUkMobile(v)).toBe(false);
  });
});

describe('isValidEmail', () => {
  it('accepts ordinary addresses and trims spaces', () => {
    expect(isValidEmail('daniel@wilsondriving.co.uk')).toBe(true);
    expect(isValidEmail(' a@b.io ')).toBe(true);
  });
  it('rejects malformed addresses', () => {
    expect(isValidEmail('daniel@')).toBe(false);
    expect(isValidEmail('daniel@site.c')).toBe(false);
    expect(isValidEmail('dan iel@site.com')).toBe(false);
  });
});

describe('isValidPostcode', () => {
  it.each(['SL3 8DS', 'sl38ds', 'SW1A 1AA', 'M1 1AE', 'B33 8TH'])('accepts %s', (v) => {
    expect(isValidPostcode(v)).toBe(true);
  });
  it.each(['', 'SL3', '12345', 'SL3 8D'])('rejects %s', (v) => {
    expect(isValidPostcode(v)).toBe(false);
  });
});

describe('isValidLicence', () => {
  it('accepts a DVLA licence number, ignoring spaces and case', () => {
    expect(isValidLicence('MORGA753116SM9IJ')).toBe(true);
    expect(isValidLicence('morga 753116 sm 9ij')).toBe(true);
  });
  it('rejects the wrong length or pattern', () => {
    expect(isValidLicence('MORGA753116SM9I')).toBe(false);
    expect(isValidLicence('1ORGA753116SM9IJ')).toBe(false);
  });
});
