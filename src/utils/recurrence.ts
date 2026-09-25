import { WEEKDAYS_BY_INDEX } from '../constants/taskOptions';
import type { Todo, TodoDraft } from '../types/todo';
import { addDays, parseLocal, toDateKey } from './date';

/** How far ahead recurring tasks are materialised. */
export const RECURRENCE_HORIZON_DAYS = { daily: 30, weekly: 84 } as const;

/**
 * Turns one form submission into the concrete todos to store.
 * A recurring task becomes one todo per occurrence (sharing a `seriesId`)
 * so each day can be completed independently.
 */
export function expandDraft(draft: TodoDraft, createId: () => string = () => crypto.randomUUID()): Todo[] {
  if (draft.recurrence === 'none') {
    return [{ ...draft, id: createId(), recurrenceDays: [], completed: false }];
  }

  const seriesId = createId();
  const first = parseLocal(draft.startDate);
  const horizon = RECURRENCE_HORIZON_DAYS[draft.recurrence];
  const occurrences: Todo[] = [];

  for (let offset = 0; offset < horizon; offset++) {
    const day = addDays(first, offset);
    if (draft.recurrence === 'weekly' && !draft.recurrenceDays.includes(WEEKDAYS_BY_INDEX[day.getDay()])) {
      continue;
    }
    const dateKey = toDateKey(day);
    occurrences.push({
      ...draft,
      id: createId(),
      seriesId,
      startDate: dateKey,
      endDate: dateKey,
      recurrenceDays: draft.recurrence === 'weekly' ? draft.recurrenceDays : [],
      completed: false,
    });
  }
  return occurrences;
}
