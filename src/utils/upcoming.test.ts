import { describe, expect, it } from 'vitest';
import type { Todo } from '../types/todo';
import { groupUpcomingByDate } from './upcoming';

const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: Math.random().toString(36),
  title: 'Task',
  type: 'onetime',
  category: 'work',
  description: '',
  startDate: '2026-09-25',
  startTime: '',
  endDate: '2026-09-25',
  endTime: '',
  recurrence: 'none',
  recurrenceDays: [],
  completed: false,
  ...overrides,
});

describe('groupUpcomingByDate', () => {
  it('returns no groups for an empty list', () => {
    expect(groupUpcomingByDate([], 5)).toEqual([]);
  });

  it('groups multiple tasks on the same day into one group', () => {
    const todos = [
      makeTodo({ id: '1', startDate: '2026-09-25', startTime: '09:00' }),
      makeTodo({ id: '2', startDate: '2026-09-25', startTime: '14:00' }),
    ];
    const groups = groupUpcomingByDate(todos, 5);
    expect(groups).toHaveLength(1);
    expect(groups[0].dateKey).toBe('2026-09-25');
    expect(groups[0].todos.map((t) => t.id)).toEqual(['1', '2']);
  });

  it('keeps groups sorted chronologically regardless of input order', () => {
    const todos = [
      makeTodo({ id: 'later', startDate: '2026-09-27' }),
      makeTodo({ id: 'earlier', startDate: '2026-09-25' }),
    ];
    const groups = groupUpcomingByDate(todos, 5);
    expect(groups.map((g) => g.dateKey)).toEqual(['2026-09-25', '2026-09-27']);
  });

  it('limits by number of distinct days, not number of items', () => {
    const todos = [
      makeTodo({ id: '1', startDate: '2026-09-25' }),
      makeTodo({ id: '2', startDate: '2026-09-25' }),
      makeTodo({ id: '3', startDate: '2026-09-25' }),
      makeTodo({ id: '4', startDate: '2026-09-26' }),
      makeTodo({ id: '5', startDate: '2026-09-27' }),
    ];
    const groups = groupUpcomingByDate(todos, 2);
    expect(groups.map((g) => g.dateKey)).toEqual(['2026-09-25', '2026-09-26']);
    expect(groups[0].todos).toHaveLength(3);
  });

  it('does not let a later day sneak into an earlier group after the limit is hit', () => {
    const todos = [
      makeTodo({ id: '1', startDate: '2026-09-25' }),
      makeTodo({ id: '2', startDate: '2026-09-26' }),
      makeTodo({ id: '3', startDate: '2026-09-27' }),
    ];
    const groups = groupUpcomingByDate(todos, 1);
    expect(groups).toHaveLength(1);
    expect(groups[0].todos).toHaveLength(1);
  });
});
