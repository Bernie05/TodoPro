import type { Todo } from '../types/todo';
import { toDateKey } from '../utils/date';

export type TodosAction =
  | { type: 'added'; todos: Todo[] }
  | { type: 'toggled'; id: string; now?: Date }
  | { type: 'completedSet'; id: string; completed: boolean; now?: Date }
  | { type: 'deleted'; id: string }
  | { type: 'cleared' };

/** `completedAt` is set when a todo becomes complete and cleared when it doesn't. */
const withCompleted = (todo: Todo, completed: boolean, now: Date): Todo => ({
  ...todo,
  completed,
  completedAt: completed ? toDateKey(now) : undefined,
});

/** Pure state transitions — no side effects, so it is trivial to unit test. */
export function todosReducer(state: Todo[], action: TodosAction): Todo[] {
  switch (action.type) {
    case 'added':
      return [...state, ...action.todos];
    case 'toggled':
      return state.map((t) => (t.id === action.id ? withCompleted(t, !t.completed, action.now ?? new Date()) : t));
    case 'completedSet':
      return state.map((t) => (t.id === action.id ? withCompleted(t, action.completed, action.now ?? new Date()) : t));
    case 'deleted':
      return state.filter((t) => t.id !== action.id);
    case 'cleared':
      return [];
  }
}
