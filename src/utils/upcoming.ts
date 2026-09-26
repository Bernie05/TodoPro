import type { Todo } from '../types/todo';
import { byStart } from './taskStatus';

export interface UpcomingGroup {
  /** `YYYY-MM-DD` for this group. */
  dateKey: string;
  todos: Todo[];
}

/**
 * Groups todos by `startDate`, preserving chronological order, and keeps only
 * the first `dayLimit` distinct days — so a single busy day never crowds out
 * the days after it (unlike a flat item limit would).
 */
export function groupUpcomingByDate(todos: Todo[], dayLimit: number): UpcomingGroup[] {
  const sorted = [...todos].sort(byStart);
  const groups: UpcomingGroup[] = [];

  for (const todo of sorted) {
    const last = groups.at(-1);
    if (last?.dateKey === todo.startDate) {
      last.todos.push(todo);
    } else if (groups.length < dayLimit) {
      groups.push({ dateKey: todo.startDate, todos: [todo] });
    }
  }

  return groups;
}
