import { describe, expect, it } from 'vitest';
import { createSampleTodos } from '../data/sampleTodos';
import { todosReducer } from './todosReducer';

describe('todosReducer', () => {
  const [a, b] = createSampleTodos();
  const state = [a, b];

  it('toggles only the targeted todo and keeps other references', () => {
    const next = todosReducer(state, { type: 'toggled', id: a.id });
    expect(next[0].completed).toBe(!a.completed);
    expect(next[1]).toBe(b);
  });

  it('deletes by id', () => {
    expect(todosReducer(state, { type: 'deleted', id: a.id })).toEqual([b]);
  });

  it('does not mutate the previous state', () => {
    todosReducer(state, { type: 'completedSet', id: a.id, completed: true });
    expect(state[0]).toBe(a);
  });
});
