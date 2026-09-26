/*
 * All dates are handled in the user's *local* time zone.
 * `new Date('2026-09-25')` and `toISOString()` both use UTC, which shifts the
 * day for anyone not on UTC — so we never use them for calendar dates.
 */

import { DAY_END_TIME, DAY_START_TIME } from '../constants/time';

const pad = (n: number) => String(n).padStart(2, '0');

/** Date -> `YYYY-MM-DD` in local time. */
export function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** `YYYY-MM-DD` (+ optional `HH:mm`) -> local Date. */
export function parseLocal(dateKey: string, time = DAY_START_TIME): Date {
  const [year, month, day] = dateKey.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export const todayKey = () => toDateKey(new Date());

const shortDate = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' });
const weekdayDate = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

/** e.g. "Sep 25 14:00" or "Sep 25" when there is no time. */
export function formatDateTime(dateKey: string, time: string): string {
  if (!dateKey) return '';
  const date = shortDate.format(parseLocal(dateKey));
  return time ? `${date} ${time}` : date;
}

/** e.g. "Today", "Tomorrow", or "Sat, Sep 27" — relative to `today` (defaults to now). */
export function friendlyDateLabel(dateKey: string, today: Date = new Date()): string {
  const todayKeyValue = toDateKey(today);
  if (dateKey === todayKeyValue) return 'Today';
  if (dateKey === toDateKey(addDays(today, 1))) return 'Tomorrow';
  if (dateKey === toDateKey(addDays(today, -1))) return 'Yesterday';
  return weekdayDate.format(parseLocal(dateKey));
}

/**
 * True when an end date/time falls before a start date/time.
 * Compares `YYYY-MM-DDTHH:mm` strings lexicographically — valid because that
 * format sorts the same way chronologically.
 */
export function isEndBeforeStart(startDate: string, startTime: string, endDate: string, endTime: string): boolean {
  return `${endDate}T${endTime || DAY_END_TIME}` < `${startDate}T${startTime || DAY_START_TIME}`;
}
