import ChecklistRounded from '@mui/icons-material/ChecklistRounded';
import DoneAllRounded from '@mui/icons-material/DoneAllRounded';
import { Box, Grid, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { TaskList } from '../components/task-list/TaskList';
import { useTodos } from '../hooks/useTodos';
import type { Todo } from '../types/todo';
import { toDateKey } from '../utils/date';
import { byStart } from '../utils/taskStatus';

export function TodayView({ now }: { now: Date }) {
  const { todos } = useTodos();
  const today = toDateKey(now);

  const { pending, done } = useMemo(() => {
    const todays = todos.filter((t) => t.startDate === today).sort(byStart);
    return { pending: todays.filter((t) => !t.completed), done: todays.filter((t) => t.completed) };
  }, [todos, today]);

  return (
    <>
      <SectionHeader title="Today's Tasks" meta={`${done.length} done`} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Column title="Todo" icon={<ChecklistRounded fontSize="small" />} accent="primary.main" todos={pending} now={now} empty="All caught up! 🎉" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Column title="Done" icon={<DoneAllRounded fontSize="small" />} accent="success.main" todos={done} now={now} empty="No completed tasks yet" />
        </Grid>
      </Grid>
    </>
  );
}

interface ColumnProps {
  title: string;
  icon: ReactNode;
  accent: string;
  todos: Todo[];
  now: Date;
  empty: string;
}

function Column({ title, icon, accent, todos, now, empty }: ColumnProps) {
  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', pb: 1, mb: 1.5, borderBottom: 2, borderColor: accent }}>
        {icon}
        <Typography variant="subtitle2" component="h3">
          {title}
        </Typography>
      </Stack>
      <TaskList todos={todos} now={now} compact empty={empty} />
    </Box>
  );
}
