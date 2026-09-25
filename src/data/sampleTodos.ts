import type { Todo } from '../types/todo';
import { addDays, toDateKey } from '../utils/date';

type Seed = Pick<Todo, 'title' | 'type' | 'category' | 'description' | 'startTime' | 'endTime'> & {
  /** Day offsets relative to today. */
  start: number;
  end?: number;
  completed?: boolean;
};

const SEEDS: Seed[] = [
  { title: 'Morning Exercise', type: 'habit', category: 'health', description: 'Run 5km or equivalent cardio exercise', start: 0, startTime: '06:00', endTime: '07:00' },
  { title: 'Team Standup Meeting', type: 'onetime', category: 'work', description: 'Daily standup with development team', start: 0, startTime: '09:30', endTime: '10:00', completed: true },
  { title: 'Code Review - Feature Branch', type: 'onetime', category: 'work', description: 'Review pull request #234 for authentication module', start: 0, startTime: '10:00', endTime: '11:30' },
  { title: 'Learn React Hooks', type: 'habit', category: 'learning', description: 'Study advanced React patterns for 30 minutes', start: 0, startTime: '14:00', endTime: '14:30' },
  { title: 'Complete Dashboard Project', type: 'project', category: 'work', description: 'Build responsive admin dashboard with charts and tables. High priority.', start: 0, end: 7, startTime: '08:00', endTime: '17:00' },
  { title: 'Database Optimization', type: 'project', category: 'work', description: 'Optimize slow queries and add indexes', start: 0, end: 7, startTime: '13:00', endTime: '17:00' },
  { title: 'Responsive Design Update', type: 'project', category: 'work', description: 'Update website for mobile and tablet devices', start: -1, end: 7, startTime: '09:00', endTime: '17:00' },
  { title: 'Client Meeting - Project Kickoff', type: 'onetime', category: 'work', description: 'Discuss requirements and timeline for new dashboard project', start: 1, startTime: '09:00', endTime: '10:00' },
  { title: 'Grocery Shopping', type: 'onetime', category: 'personal', description: 'Buy groceries: milk, eggs, vegetables, chicken', start: 1, startTime: '17:00', endTime: '18:00' },
  { title: 'Gym Session', type: 'habit', category: 'health', description: 'Strength training - upper body workout', start: 1, startTime: '18:00', endTime: '19:30' },
  { title: 'Family Dinner', type: 'onetime', category: 'personal', description: 'Dinner with family at home', start: 1, startTime: '19:00', endTime: '20:30' },
  { title: 'Meditation Session', type: 'habit', category: 'health', description: 'Daily 10-minute meditation for mindfulness', start: 1, startTime: '20:00', endTime: '20:10' },
  { title: 'Read Technical Book', type: 'habit', category: 'learning', description: 'Read "Clean Code" - 20 pages per day', start: 1, startTime: '21:00', endTime: '21:30' },
  { title: 'Write Blog Post', type: 'onetime', category: 'learning', description: 'Article on "10 JavaScript Tips for Beginners"', start: 7, startTime: '10:00', endTime: '12:00' },
  { title: 'Doctor Appointment', type: 'onetime', category: 'health', description: 'Annual checkup at the clinic', start: 7, startTime: '14:30', endTime: '15:30' },
  { title: 'Update Documentation', type: 'onetime', category: 'work', description: 'Update API documentation with new endpoints', start: 7, startTime: '15:00', endTime: '16:30' },
];

/** Demo data shown on first launch, dated relative to `today`. */
export function createSampleTodos(today = new Date()): Todo[] {
  return SEEDS.map(({ start, end = start, completed = false, ...rest }) => ({
    ...rest,
    id: crypto.randomUUID(),
    startDate: toDateKey(addDays(today, start)),
    endDate: toDateKey(addDays(today, end)),
    recurrence: 'none',
    recurrenceDays: [],
    completed,
  }));
}
