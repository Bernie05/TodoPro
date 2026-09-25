import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Todo } from '../types/todo';
import { getStart } from '../utils/taskStatus';

const REMINDER_WINDOW_MS = 60_000;
const SNOOZE_MS = 5 * 60_000;

/**
 * Picks the task (if any) that should be announced right now.
 * A task is due when it started within the last minute, or when its snooze has elapsed.
 */
export function useTaskReminders(todos: Todo[], now: Date) {
  const [handled, setHandled] = useState<ReadonlySet<string>>(() => new Set());
  const [snoozedUntil, setSnoozedUntil] = useState<ReadonlyMap<string, number>>(() => new Map());

  const dueTodo = useMemo(() => {
    const t = now.getTime();
    return (
      todos.find((todo) => {
        if (todo.completed || handled.has(todo.id)) return false;
        const snooze = snoozedUntil.get(todo.id);
        if (snooze !== undefined) return t >= snooze;
        const sinceStart = t - getStart(todo).getTime();
        return sinceStart >= 0 && sinceStart < REMINDER_WINDOW_MS;
      }) ?? null
    );
  }, [todos, now, handled, snoozedUntil]);

  // Fire a system notification once per reminder, if the user allowed them.
  useEffect(() => {
    if (!dueTodo || !('Notification' in window) || Notification.permission !== 'granted') return;
    new Notification(`Time to start: ${dueTodo.title}`, { body: 'Task starts now!', tag: `todo-${dueTodo.id}` });
  }, [dueTodo]);

  const dismiss = useCallback((id: string) => {
    setHandled((prev) => new Set(prev).add(id));
  }, []);

  const snooze = useCallback((id: string) => {
    setSnoozedUntil((prev) => new Map(prev).set(id, Date.now() + SNOOZE_MS));
  }, []);

  return { dueTodo, dismiss, snooze };
}
