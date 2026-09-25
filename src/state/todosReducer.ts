import type { Todo } from '../types/todo';

export type TodosAction =
  | { type: 'added'; todos: Todo[] }
  | { type: 'toggled'; id: string }
  | { type: 'completedSet'; id: string; completed: boolean }
  | { type: 'deleted'; id: string };

/** Pure state transitions — no side effects, so it is trivial to unit test. */
export function todosReducer(state: Todo[], action: TodosAction): Todo[] {
  switch (action.type) {
    case 'added':
      return [...state, ...action.todos];
    case 'toggled':
      return state.map((t) => (t.id === action.id ? { ...t, completed: !t.completed } : t));
    case 'completedSet':
      return state.map((t) => (t.id === action.id ? { ...t, completed: action.completed } : t));
    case 'deleted':
      return state.filter((t) => t.id !== action.id);
  }
}
