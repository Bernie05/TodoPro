import { createContext } from 'react';
import type { Todo, TodoDraft } from '../types/todo';

export interface TodosContextValue {
  todos: Todo[];
  addTodo: (draft: TodoDraft) => void;
  toggleTodo: (id: string) => void;
  setCompleted: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}

export const TodosContext = createContext<TodosContextValue | null>(null);
