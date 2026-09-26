import { useContext } from "react";
import { TodosContext } from "../state/TodosContext";

export function useTodos() {
  const ctx = useContext(TodosContext);

  // Runtime check: ctx is only null if this hook is used outside <TodosProvider>.
  if (!ctx) throw new Error("useTodos must be used inside <TodosProvider>");
  return ctx;
}
