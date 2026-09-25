import { describe, expect, it } from 'vitest';
import type { Todo } from '../types/todo';
import { parseLocal } from './date';
import { getTaskStatus } from './taskStatus';

const todo: Todo = {
  id: '1',
  title: 'Meeting',
  type: 'onetime',
  category: 'work',
  description: '',
  startDate: '2026-09-25',
  startTime: '10:00',
  endDate: '2026-09-25',
  endTime: '11:00',
  recurrence: 'none',
  recurrenceDays: [],
  completed: false,
};

describe('getTaskStatus', () => {
  it.each([
    ['09:59', 'upcoming'],
    ['10:30', 'active'],
    ['11:01', 'overdue'],
  ] as const)('at %s is %s', (time, expected) => {
    expect(getTaskStatus(todo, parseLocal('2026-09-25', time))).toBe(expected);
  });

  it('is done when completed, regardless of time', () => {
    expect(getTaskStatus({ ...todo, completed: true }, parseLocal('2026-09-26'))).toBe('done');
  });

  it('treats an empty end time as end of day', () => {
    expect(getTaskStatus({ ...todo, endTime: '' }, parseLocal('2026-09-25', '23:00'))).toBe('active');
  });
});
