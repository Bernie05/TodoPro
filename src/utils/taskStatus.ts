import { DAY_END_TIME, DAY_START_TIME } from '../constants/time';
import type { TaskStatus, Todo } from '../types/todo';
import { parseLocal } from './date';

export const getStart = (todo: Todo) => parseLocal(todo.startDate, todo.startTime || DAY_START_TIME);
export const getEnd = (todo: Todo) => parseLocal(todo.endDate, todo.endTime || DAY_END_TIME);

export function getTaskStatus(todo: Todo, now: Date): TaskStatus {
  if (todo.completed) return 'done';
  if (now > getEnd(todo)) return 'overdue';
  if (now >= getStart(todo)) return 'active';
  return 'upcoming';
}

export const byStart = (a: Todo, b: Todo) => getStart(a).getTime() - getStart(b).getTime();
