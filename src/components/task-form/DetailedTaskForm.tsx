import AddRounded from '@mui/icons-material/AddRounded';
import { Button, Divider, Grid, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState, type FormEvent } from 'react';
import { WEEKDAYS } from '../../constants/taskOptions';
import { useTodos } from '../../hooks/useTodos';
import type { Category, Recurrence, TaskType, TodoDraft, Weekday } from '../../types/todo';
import { todayKey } from '../../utils/date';
import { CategorySelect, DateField, TimeField, TypeSelect } from './fields';

const createEmptyDraft = (): TodoDraft => ({
  title: '',
  type: 'onetime',
  category: 'work',
  description: '',
  startDate: todayKey(),
  startTime: '',
  endDate: todayKey(),
  endTime: '',
  recurrence: 'none',
  recurrenceDays: ['mon'],
});

export function DetailedTaskForm() {
  const { addTodo } = useTodos();
  // One state object + a generic setter instead of one useState per field.
  const [draft, setDraft] = useState<TodoDraft>(createEmptyDraft);
  const set = <K extends keyof TodoDraft>(key: K, value: TodoDraft[K]) => setDraft((d) => ({ ...d, [key]: value }));

  // Derived validation — computed during render, never stored in state.
  const endBeforeStart =
    `${draft.endDate}T${draft.endTime || '23:59'}` < `${draft.startDate}T${draft.startTime || '00:00'}`;
  const missingWeekdays = draft.recurrence === 'weekly' && draft.recurrenceDays.length === 0;
  const canSubmit = draft.title.trim() !== '' && !endBeforeStart && !missingWeekdays;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    addTodo({ ...draft, title: draft.title.trim(), description: draft.description.trim() });
    // Keep type/category/dates — handy when entering several similar tasks.
    setDraft((d) => ({ ...d, title: '', description: '', recurrence: 'none', recurrenceDays: ['mon'] }));
  };

  return (
    <Grid component="form" container spacing={1.5} onSubmit={handleSubmit}>
      <Grid size={{ xs: 12, sm: 8 }}>
        <TextField label="Title" placeholder="Task title…" value={draft.title} onChange={(e) => set('title', e.target.value)} required />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TypeSelect value={draft.type} onChange={(e) => set('type', e.target.value as TaskType)} />
      </Grid>
      <Grid size={12}>
        <TextField
          label="Description"
          placeholder="Details about this task…"
          multiline
          minRows={3}
          value={draft.description}
          onChange={(e) => set('description', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <CategorySelect value={draft.category} onChange={(e) => set('category', e.target.value as Category)} />
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <DateField label="Start date" value={draft.startDate} onChange={(e) => set('startDate', e.target.value)} required />
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <TimeField label="Start time" value={draft.startTime} onChange={(e) => set('startTime', e.target.value)} />
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }} offset={{ sm: 4 }}>
        <DateField
          label="End date"
          value={draft.endDate}
          onChange={(e) => set('endDate', e.target.value)}
          required
          error={endBeforeStart}
          helperText={endBeforeStart ? 'Ends before it starts' : undefined}
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <TimeField label="End time" value={draft.endTime} onChange={(e) => set('endTime', e.target.value)} error={endBeforeStart} />
      </Grid>

      <Grid size={12}>
        <Divider sx={{ my: 0.5 }} />
      </Grid>

      <Grid size={12}>
        <Stack spacing={1}>
          <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1.5 }}>
            Repeats
          </Typography>
          <ToggleButtonGroup
            exclusive
            size="small"
            color="primary"
            value={draft.recurrence}
            onChange={(_, value: Recurrence | null) => value && set('recurrence', value)}
          >
            <ToggleButton value="none">None</ToggleButton>
            <ToggleButton value="daily">Daily</ToggleButton>
            <ToggleButton value="weekly">Weekly</ToggleButton>
          </ToggleButtonGroup>

          {draft.recurrence === 'weekly' && (
            <ToggleButtonGroup
              size="small"
              color="primary"
              fullWidth
              value={draft.recurrenceDays}
              onChange={(_, days: Weekday[]) => set('recurrenceDays', days)}
              aria-label="Repeat on"
            >
              {WEEKDAYS.map((d) => (
                <ToggleButton key={d.value} value={d.value}>
                  {d.short}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
          {missingWeekdays && (
            <Typography variant="caption" color="error">
              Pick at least one day.
            </Typography>
          )}
        </Stack>
      </Grid>

      <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" startIcon={<AddRounded />} disabled={!canSubmit}>
          Add task
        </Button>
      </Grid>
    </Grid>
  );
}
