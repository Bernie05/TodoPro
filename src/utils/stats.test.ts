import { describe, expect, it } from 'vitest';
import type { Todo } from '../types/todo';
import { parseLocal } from './date';
import { getCompletionStreak, getDayStreak, getTaskStats } from './stats';

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

describe('getTaskStats', () => {
  it('returns zeros for no tasks', () => {
    expect(getTaskStats([])).toEqual({ total: 0, completed: 0, pending: 0 });
  });

  it('counts total, completed and pending', () => {
    const todos = [makeTodo({ completed: true }), makeTodo({ completed: true }), makeTodo({ completed: false })];
    expect(getTaskStats(todos)).toEqual({ total: 3, completed: 2, pending: 1 });
  });
});

describe('getCompletionStreak', () => {
  const today = parseLocal('2026-09-26');

  it('is 0 with no tasks', () => {
    expect(getCompletionStreak([], today)).toBe(0);
  });

  it('is 0 when nothing has ever been completed', () => {
    const todos = [makeTodo({ completed: false })];
    expect(getCompletionStreak(todos, today)).toBe(0);
  });

  it('counts today when something was completed today', () => {
    const todos = [makeTodo({ completed: true, completedAt: '2026-09-26' })];
    expect(getCompletionStreak(todos, today)).toBe(1);
  });

  it('still counts the streak via yesterday when nothing is completed yet today', () => {
    const todos = [
      makeTodo({ completed: true, completedAt: '2026-09-25' }),
      makeTodo({ completed: true, completedAt: '2026-09-24' }),
    ];
    expect(getCompletionStreak(todos, today)).toBe(2);
  });

  it('stops counting at a gap day', () => {
    const todos = [
      makeTodo({ completed: true, completedAt: '2026-09-26' }),
      makeTodo({ completed: true, completedAt: '2026-09-25' }),
      // gap on 09-24
      makeTodo({ completed: true, completedAt: '2026-09-23' }),
    ];
    expect(getCompletionStreak(todos, today)).toBe(2);
  });

  it('resets to 0 when the most recent completion is more than a day old', () => {
    const todos = [makeTodo({ completed: true, completedAt: '2026-09-20' })];
    expect(getCompletionStreak(todos, today)).toBe(0);
  });
});

describe('getDayStreak', () => {
  const today = parseLocal('2026-09-26');

  it('is 0 with no tasks', () => {
    expect(getDayStreak([], today)).toBe(0);
  });

  it('counts a day active via createdAt alone', () => {
    const todos = [makeTodo({ createdAt: '2026-09-26' })];
    expect(getDayStreak(todos, today)).toBe(1);
  });

  it('merges createdAt and completedAt into the same day without double counting', () => {
    const todos = [makeTodo({ createdAt: '2026-09-26', completed: true, completedAt: '2026-09-26' })];
    expect(getDayStreak(todos, today)).toBe(1);
  });

  it('stops counting at a gap day', () => {
    const todos = [makeTodo({ createdAt: '2026-09-26' }), makeTodo({ createdAt: '2026-09-24' })];
    expect(getDayStreak(todos, today)).toBe(1);
  });
});
