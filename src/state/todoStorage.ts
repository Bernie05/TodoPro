import type { Todo } from '../types/todo';

const STORAGE_KEY = 'todopro:todos:v1';

/** Returns `null` when nothing (valid) is stored, so the caller can seed defaults. */
export function loadTodos(): Todo[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Todo[]) : null;
  } catch {
    return null;
  }
}

export function saveTodos(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Storage full or blocked (e.g. private mode) — the app keeps working in memory.
  }
}
