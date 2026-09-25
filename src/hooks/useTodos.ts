import { useContext } from 'react';
import { TodosContext } from '../state/TodosContext';

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error('useTodos must be used inside <TodosProvider>');
  return ctx;
}
