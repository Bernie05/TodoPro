import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { TodoDraft } from '../types/todo';
import { createSampleTodos } from '../data/sampleTodos';
import { expandDraft } from '../utils/recurrence';
import { TodosContext, type TodosContextValue } from './TodosContext';
import { loadTodos, saveTodos } from './todoStorage';
import { todosReducer } from './todosReducer';

const initTodos = () => loadTodos() ?? createSampleTodos();

export function TodosProvider({ children }: { children: ReactNode }) {
  // Lazy initialiser: storage is read once, not on every render.
  const [todos, dispatch] = useReducer(todosReducer, undefined, initTodos);

  useEffect(() => saveTodos(todos), [todos]);

  // `dispatch` never changes identity, so neither do these actions. Memoised
  // children receiving them only re-render when their own todo changes.
  const actions = useMemo(
    () => ({
      addTodo: (draft: TodoDraft) => dispatch({ type: 'added', todos: expandDraft(draft) }),
      toggleTodo: (id: string) => dispatch({ type: 'toggled', id }),
      setCompleted: (id: string, completed: boolean) => dispatch({ type: 'completedSet', id, completed }),
      deleteTodo: (id: string) => dispatch({ type: 'deleted', id }),
    }),
    [],
  );

  const value = useMemo<TodosContextValue>(() => ({ todos, ...actions }), [todos, actions]);

  return <TodosContext value={value}>{children}</TodosContext>;
}
