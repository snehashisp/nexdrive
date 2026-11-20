import { describe, expect, it } from 'vitest';
import {
  TODAY,
  addDays,
  addMonths,
  daysBetween,
  formatDate,
  formatDayMonth,
  formatDurationLong,
  formatDurationShort,
  formatFullDate,
  formatShortDate,
  minutesToTime,
  ordinal,
  relativeDay,
  timeToMinutes,
} from './dates';

describe('date arithmetic', () => {
  it('adds days across month and year ends', () => {
    expect(addDays('2026-10-31', 1)).toBe('2026-11-01');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
  });

  it('is unaffected by the clocks changing (BST ends 25 Oct 2026)', () => {
    expect(addDays('2026-10-24', 2)).toBe('2026-10-26');
    expect(daysBetween('2026-10-24', '2026-10-26')).toBe(2);
  });

  it('adds months', () => {
    expect(addMonths('2026-10-07', 12)).toBe('2027-10-07');
  });

  it('counts days in either direction', () => {
    expect(daysBetween('2026-10-01', '2026-10-07')).toBe(6);
    expect(daysBetween('2026-10-07', '2026-10-01')).toBe(-6);
  });
});

describe('times', () => {
  it('converts between HH:MM and minutes', () => {
    expect(timeToMinutes('09:30')).toBe(570);
    expect(minutesToTime(570)).toBe('09:30');
    expect(minutesToTime(0)).toBe('00:00');
  });

  it('formats durations given in hours', () => {
    expect(formatDurationLong(1)).toBe('1 hour');
    expect(formatDurationLong(2)).toBe('2 hours');
    expect(formatDurationLong(0.75)).toBe('45 min');
    expect(formatDurationLong(1.5)).toBe('1 hr 30 min');
    expect(formatDurationShort(1.5)).toBe('1h 30m');
    expect(formatDurationShort(2)).toBe('2h');
    expect(formatDurationShort(0.5)).toBe('30m');
  });
});

describe('date labels', () => {
  it('formats a date in each style', () => {
    expect(formatDayMonth('2026-10-07')).toBe('7 Oct');
    expect(formatShortDate('2026-10-07')).toBe('Wed 7 Oct');
    expect(formatDate('2026-10-07')).toBe('7 Oct 2026');
    expect(formatFullDate('2026-10-07')).toBe('Wednesday 7 October 2026');
  });

  it('adds ordinal suffixes', () => {
    expect([1, 2, 3, 4, 11, 12, 13, 21, 22, 23, 101].map(ordinal)).toEqual([
      '1st',
      '2nd',
      '3rd',
      '4th',
      '11th',
      '12th',
      '13th',
      '21st',
      '22nd',
      '23rd',
      '101st',
    ]);
  });

  it('describes recent past days relative to today', () => {
    expect(relativeDay(TODAY)).toBe('Today');
    expect(relativeDay(addDays(TODAY, -1))).toBe('Yesterday');
    expect(relativeDay(addDays(TODAY, -10))).toBe(formatDayMonth(addDays(TODAY, -10)));
  });
});
