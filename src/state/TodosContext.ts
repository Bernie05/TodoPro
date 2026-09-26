import { createContext } from "react";
import type { Todo, TodoDraft } from "../types/todo";

export interface TodosContextValue {
  todos: Todo[];
  addTodo: (draft: TodoDraft) => void;
  toggleTodo: (id: string) => void;
  setCompleted: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  clearAllTodos: () => void;
}

// Create the context with a default value for TodosContextValue.
// The default value is null, and the context will be provided by a TodosProvider component higher up in the component tree.
export const TodosContext = createContext<TodosContextValue | null>(null);
