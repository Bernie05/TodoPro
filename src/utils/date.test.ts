import { describe, expect, it } from 'vitest';
import { addDays, parseLocal, toDateKey } from './date';

describe('date utils', () => {
  it('round-trips a date key in local time', () => {
    expect(toDateKey(parseLocal('2026-03-09'))).toBe('2026-03-09');
  });

  it('parses times as local wall-clock time', () => {
    const d = parseLocal('2026-09-25', '06:30');
    expect([d.getDate(), d.getHours(), d.getMinutes()]).toEqual([25, 6, 30]);
  });

  it('adds days across month boundaries', () => {
    expect(toDateKey(addDays(parseLocal('2026-01-30'), 3))).toBe('2026-02-02');
  });
});
