// Form validators for UK-specific fields. Each accepts the raw input, which may be empty.
import { normalizeLicence } from './format';

type Input = string | null | undefined;

/** UK mobile: 07xxx xxxxxx or +447xxx xxxxxx (spaces, dashes and brackets ignored). */
export const isValidUkMobile = (v: Input): boolean =>
  /^(07\d{9}|\+447\d{9})$/.test((v || '').replace(/[\s()-]/g, ''));
export const isValidEmail = (v: Input): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || '').trim());
/** UK postcode, with or without the space: 'SL1 2AB', 'sw1a1aa'. */
export const isValidPostcode = (v: Input): boolean =>
  /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test((v || '').trim());
/** DVLA driving licence number (16 characters; spaces ignored). */
export const isValidLicence = (v: Input): boolean =>
  /^[A-Z9]{5}\d{6}[A-Z9]{2}\d[A-Z]{2}$/.test(normalizeLicence(v));
