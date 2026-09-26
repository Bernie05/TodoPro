import type { Todo } from '../types/todo';
import { addDays, toDateKey } from './date';

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

export function getTaskStats(todos: Todo[]): TaskStats {
  const completed = todos.filter((t) => t.completed).length;
  return { total: todos.length, completed, pending: todos.length - completed };
}

/**
 * Counts consecutive calendar days, walking backwards from `today`, that have
 * at least one date in `activeDays`. If `today` itself has no activity the
 * streak still counts as "alive" (starts from yesterday) so a user who simply
 * hasn't acted yet today doesn't see their streak reset to zero prematurely;
 * it only breaks once a full day is skipped.
 */
function countStreak(activeDays: Set<string>, today: Date): number {
  const todayKey = toDateKey(today);
  let cursor = activeDays.has(todayKey) ? today : addDays(today, -1);
  let streak = 0;

  while (activeDays.has(toDateKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/**
 * Completion streak: consecutive calendar days, ending today (or yesterday if
 * nothing has been completed yet today), on which at least one task was
 * completed. Requires todos to have `completedAt` (`YYYY-MM-DD`) set.
 */
export function getCompletionStreak(todos: Todo[], today: Date = new Date()): number {
  const completedDays = new Set(todos.map((t) => t.completedAt).filter((d): d is string => Boolean(d)));
  return countStreak(completedDays, today);
}

/**
 * Day streak: consecutive calendar days, ending today, on which the user was
 * active in the app — i.e. created or completed at least one task that day.
 * Requires todos to have `createdAt`/`completedAt` (`YYYY-MM-DD`) set.
 */
export function getDayStreak(todos: Todo[], today: Date = new Date()): number {
  const activeDays = new Set<string>();
  for (const t of todos) {
    if (t.createdAt) activeDays.add(t.createdAt);
    if (t.completedAt) activeDays.add(t.completedAt);
  }
  return countStreak(activeDays, today);
}
