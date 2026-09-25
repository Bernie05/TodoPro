import { Chip, Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { TaskList } from '../components/task-list/TaskList';
import { typeEntries } from '../constants/taskOptions';
import { useTodos } from '../hooks/useTodos';
import type { TaskType } from '../types/todo';
import { byStart } from '../utils/taskStatus';

type Filter = TaskType | 'all';

export function AllTasksView({ now }: { now: Date }) {
  const { todos } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  // Derived data is memoised, not copied into state.
  const visible = useMemo(
    () => todos.filter((t) => filter === 'all' || t.type === filter).sort(byStart),
    [todos, filter],
  );
  const completed = visible.filter((t) => t.completed).length;

  const filters: [Filter, string][] = [['all', 'All'], ...typeEntries.map(([k, v]) => [k, v.label] as [Filter, string])];

  return (
    <>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 2 }}>
        {filters.map(([value, label]) => (
          <Chip
            key={value}
            label={label}
            clickable
            color={filter === value ? 'primary' : 'default'}
            variant={filter === value ? 'filled' : 'outlined'}
            onClick={() => setFilter(value)}
          />
        ))}
      </Stack>
      <SectionHeader title="My Tasks" meta={`${completed} of ${visible.length}`} />
      <TaskList todos={visible} now={now} empty="No tasks yet. Create one to get started!" />
    </>
  );
}
