/*
 * All dates are handled in the user's *local* time zone.
 * `new Date('2026-09-25')` and `toISOString()` both use UTC, which shifts the
 * day for anyone not on UTC — so we never use them for calendar dates.
 */

const pad = (n: number) => String(n).padStart(2, '0');

/** Date -> `YYYY-MM-DD` in local time. */
export function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** `YYYY-MM-DD` (+ optional `HH:mm`) -> local Date. */
export function parseLocal(dateKey: string, time = '00:00'): Date {
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

/** e.g. "Sep 25 14:00" or "Sep 25" when there is no time. */
export function formatDateTime(dateKey: string, time: string): string {
  if (!dateKey) return '';
  const date = shortDate.format(parseLocal(dateKey));
  return time ? `${date} ${time}` : date;
}
