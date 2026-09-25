import { Container, Paper, Stack, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { ReminderDialog } from './components/ReminderDialog';
import { TaskComposer } from './components/task-form/TaskComposer';
import { UpcomingTable } from './components/UpcomingTable';
import { useNow } from './hooks/useNow';
import { useTaskReminders } from './hooks/useTaskReminders';
import { useTodos } from './hooks/useTodos';
import { AllTasksView } from './views/AllTasksView';
import { TodayView } from './views/TodayView';

type View = 'all' | 'today';

export default function App() {
  const { todos, setCompleted } = useTodos();
  const now = useNow(15_000);
  const [view, setView] = useState<View>('all');
  const { dueTodo, dismiss, snooze } = useTaskReminders(todos, now);

  const completeFromReminder = (id: string) => {
    setCompleted(id, true);
    dismiss(id);
  };

  return (
    <Container maxWidth="md" sx={{ pb: 6 }}>
      <Stack spacing={4}>
        <AppHeader />
        <TaskComposer />

        <Paper component="section" sx={{ p: 2 }}>
          <Tabs value={view} onChange={(_, v: View) => setView(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Tab value="all" label="All Tasks" />
            <Tab value="today" label="Today" />
          </Tabs>
          {view === 'all' ? <AllTasksView now={now} /> : <TodayView now={now} />}
        </Paper>

        <UpcomingTable now={now} />
      </Stack>

      <ReminderDialog todo={dueTodo} onDone={completeFromReminder} onSnooze={snooze} onDismiss={dismiss} />
    </Container>
  );
}
