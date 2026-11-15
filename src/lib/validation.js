import { cLic } from './format';

export const vPhone = (v) => /^(07\d{9}|\+447\d{9})$/.test((v || '').replace(/[\s()-]/g, ''));
export const vEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || '').trim());
export const vPc = (v) => /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test((v || '').trim());
export const vLic = (v) => /^[A-Z9]{5}\d{6}[A-Z9]{2}\d[A-Z]{2}$/.test(cLic(v));
