import AddRounded from '@mui/icons-material/AddRounded';
import { Button, Grid, TextField } from '@mui/material';
import { useState, type FormEvent } from 'react';
import { useTodos } from '../../hooks/useTodos';
import type { TaskType } from '../../types/todo';
import { todayKey } from '../../utils/date';
import { DateField, TimeField, TypeSelect } from './fields';

export function QuickAddForm() {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TaskType>('onetime');
  const [date, setDate] = useState(todayKey);
  const [time, setTime] = useState('');

  // A real <form> gives us Enter-to-submit and `required` validation for free.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addTodo({
      title: trimmed,
      type,
      category: 'other',
      description: '',
      startDate: date,
      startTime: time,
      endDate: date,
      endTime: '', // due by end of day
      recurrence: 'none',
      recurrenceDays: [],
    });
    setTitle('');
  };

  return (
    <Grid component="form" container spacing={1.5} onSubmit={handleSubmit}>
      <Grid size={{ xs: 12, sm: 8 }}>
        <TextField label="Task" placeholder="Add a quick task…" value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TypeSelect value={type} onChange={(e) => setType(e.target.value as TaskType)} />
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <DateField label="Date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <TimeField label="Time" value={time} onChange={(e) => setTime(e.target.value)} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Button type="submit" variant="contained" fullWidth startIcon={<AddRounded />} sx={{ height: '100%' }}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
}
