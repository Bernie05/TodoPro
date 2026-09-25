import { Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { DetailedTaskForm } from './DetailedTaskForm';
import { QuickAddForm } from './QuickAddForm';

type Mode = 'quick' | 'detailed';

export function TaskComposer() {
  const [mode, setMode] = useState<Mode>('quick');

  return (
    <Paper component="section" aria-label="Add a task" sx={{ p: 2 }}>
      <ToggleButtonGroup
        exclusive
        fullWidth
        size="small"
        color="primary"
        value={mode}
        onChange={(_, value: Mode | null) => value && setMode(value)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="quick">Quick Add</ToggleButton>
        <ToggleButton value="detailed">Detailed</ToggleButton>
      </ToggleButtonGroup>

      {mode === 'quick' ? <QuickAddForm /> : <DetailedTaskForm />}
    </Paper>
  );
}
