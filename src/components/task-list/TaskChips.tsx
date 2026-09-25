import RepeatRounded from '@mui/icons-material/RepeatRounded';
import { Chip } from '@mui/material';
import { CATEGORIES, TASK_STATUSES, TASK_TYPES, WEEKDAYS } from '../../constants/taskOptions';
import type { Category, TaskStatus, TaskType, Todo } from '../../types/todo';

export const TypeChip = ({ type }: { type: TaskType }) => (
  <Chip size="small" color={TASK_TYPES[type].color} label={TASK_TYPES[type].label} />
);

export const CategoryChip = ({ category }: { category: Category }) => (
  <Chip size="small" variant="outlined" label={CATEGORIES[category].label} />
);

export const StatusChip = ({ status }: { status: TaskStatus }) => (
  <Chip size="small" color={TASK_STATUSES[status].color} label={TASK_STATUSES[status].label} />
);

export function RecurrenceChip({ todo }: { todo: Todo }) {
  if (todo.recurrence === 'none') return null;
  const label =
    todo.recurrence === 'daily'
      ? 'Daily'
      : WEEKDAYS.filter((d) => todo.recurrenceDays.includes(d.value))
          .map((d) => d.short)
          .join(', ');
  return <Chip size="small" color="warning" variant="outlined" icon={<RepeatRounded />} label={label} />;
}
