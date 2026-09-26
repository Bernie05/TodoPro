import { describe, expect, it } from 'vitest';
import type { Todo } from '../types/todo';
import { todosReducer } from './todosReducer';

const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: '1',
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

describe('todosReducer', () => {
  const a = makeTodo({ id: 'a' });
  const b = makeTodo({ id: 'b' });
  const state = [a, b];

  it('toggles only the targeted todo and keeps other references', () => {
    const next = todosReducer(state, { type: 'toggled', id: a.id, now: new Date('2026-09-26') });
    expect(next[0].completed).toBe(!a.completed);
    expect(next[1]).toBe(b);
  });

  it('stamps completedAt when completed and clears it when un-completed', () => {
    const completed = todosReducer(state, {
      type: 'completedSet',
      id: a.id,
      completed: true,
      now: new Date('2026-09-26'),
    });
    expect(completed[0].completedAt).toBe('2026-09-26');

    const uncompleted = todosReducer(completed, {
      type: 'completedSet',
      id: a.id,
      completed: false,
      now: new Date('2026-09-27'),
    });
    expect(uncompleted[0].completedAt).toBeUndefined();
  });

  it('deletes by id', () => {
    expect(todosReducer(state, { type: 'deleted', id: a.id })).toEqual([b]);
  });

  it('clears all todos', () => {
    expect(todosReducer(state, { type: 'cleared' })).toEqual([]);
  });

  it('does not mutate the previous state', () => {
    todosReducer(state, { type: 'completedSet', id: a.id, completed: true });
    expect(state[0]).toBe(a);
  });
});
