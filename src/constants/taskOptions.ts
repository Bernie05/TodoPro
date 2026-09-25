import type { Category, TaskStatus, TaskType, Weekday } from '../types/todo';

type ChipColor = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

export const TASK_TYPES: Record<TaskType, { label: string; color: ChipColor }> = {
  onetime: { label: 'One-Time', color: 'info' },
  habit: { label: 'Habit', color: 'warning' },
  project: { label: 'Project', color: 'secondary' },
};

export const CATEGORIES: Record<Category, { label: string }> = {
  work: { label: 'Work' },
  personal: { label: 'Personal' },
  learning: { label: 'Learning' },
  health: { label: 'Health' },
  other: { label: 'Other' },
};

export const TASK_STATUSES: Record<TaskStatus, { label: string; color: ChipColor }> = {
  upcoming: { label: 'Upcoming', color: 'default' },
  active: { label: 'Active', color: 'success' },
  overdue: { label: 'Overdue', color: 'error' },
  done: { label: 'Done', color: 'primary' },
};

/** Ordered Monday-first for display; `Date#getDay()` indexes into WEEKDAYS_BY_INDEX. */
export const WEEKDAYS: { value: Weekday; short: string }[] = [
  { value: 'mon', short: 'Mo' },
  { value: 'tue', short: 'Tu' },
  { value: 'wed', short: 'We' },
  { value: 'thu', short: 'Th' },
  { value: 'fri', short: 'Fr' },
  { value: 'sat', short: 'Sa' },
  { value: 'sun', short: 'Su' },
];

export const WEEKDAYS_BY_INDEX: Weekday[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const typeEntries = Object.entries(TASK_TYPES) as [TaskType, (typeof TASK_TYPES)[TaskType]][];
export const categoryEntries = Object.entries(CATEGORIES) as [Category, (typeof CATEGORIES)[Category]][];
