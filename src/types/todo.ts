export type TaskType = 'onetime' | 'habit' | 'project';
export type Category = 'work' | 'personal' | 'learning' | 'health' | 'other';
export type Recurrence = 'none' | 'daily' | 'weekly';
export type Weekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
export type TaskStatus = 'upcoming' | 'active' | 'overdue' | 'done';

export interface Todo {
  id: string;
  /** Shared by every occurrence generated from one recurring task. */
  seriesId?: string;
  title: string;
  type: TaskType;
  category: Category;
  description: string;
  /** Local calendar date, `YYYY-MM-DD`. */
  startDate: string;
  /** Local time, `HH:mm`. Empty means start of day. */
  startTime: string;
  endDate: string;
  /** Empty means end of day. */
  endTime: string;
  recurrence: Recurrence;
  recurrenceDays: Weekday[];
  completed: boolean;
  /** Local calendar date the task was created, `YYYY-MM-DD`. Optional: absent on todos stored before this field existed. */
  createdAt?: string;
  /** Local calendar date the task was last marked complete, `YYYY-MM-DD`. Cleared when un-completed. */
  completedAt?: string;
}

/** What a form submits: everything the app assigns itself is left out. */
export type TodoDraft = Omit<Todo, 'id' | 'seriesId' | 'completed'>;
