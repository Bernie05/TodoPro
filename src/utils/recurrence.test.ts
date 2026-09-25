import { describe, expect, it } from 'vitest';
import type { TodoDraft } from '../types/todo';
import { parseLocal } from './date';
import { expandDraft, RECURRENCE_HORIZON_DAYS } from './recurrence';

const draft: TodoDraft = {
  title: 'Read',
  type: 'habit',
  category: 'learning',
  description: '',
  startDate: '2026-09-21', // a Monday
  startTime: '21:00',
  endDate: '2026-09-21',
  endTime: '21:30',
  recurrence: 'none',
  recurrenceDays: ['mon'],
};

let n = 0;
const id = () => `id-${n++}`;

describe('expandDraft', () => {
  it('creates a single todo without a series for non-recurring drafts', () => {
    const [todo, ...rest] = expandDraft(draft, id);
    expect(rest).toHaveLength(0);
    expect(todo.seriesId).toBeUndefined();
    expect(todo.recurrenceDays).toEqual([]);
  });

  it('creates one occurrence per day for daily drafts', () => {
    const todos = expandDraft({ ...draft, recurrence: 'daily' }, id);
    expect(todos).toHaveLength(RECURRENCE_HORIZON_DAYS.daily);
    expect(new Set(todos.map((t) => t.seriesId)).size).toBe(1);
    expect(todos[1].startDate).toBe('2026-09-22');
  });

  it('only creates occurrences on the selected weekdays', () => {
    const todos = expandDraft({ ...draft, recurrence: 'weekly', recurrenceDays: ['mon', 'fri'] }, id);
    expect(todos).toHaveLength(24); // 12 weeks x 2 days
    const days = new Set(todos.map((t) => parseLocal(t.startDate).getDay()));
    expect(days).toEqual(new Set([1, 5]));
  });
});
