import AlarmRounded from '@mui/icons-material/AlarmRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import SnoozeRounded from '@mui/icons-material/SnoozeRounded';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import type { Todo } from '../types/todo';

interface Props {
  todo: Todo | null;
  onDone: (id: string) => void;
  onSnooze: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function ReminderDialog({ todo, onDone, onSnooze, onDismiss }: Props) {
  return (
    <Dialog open={todo !== null} onClose={() => todo && onDismiss(todo.id)} maxWidth="xs" fullWidth>
      {todo && (
        <>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main' }}>
            <AlarmRounded /> Time to start!
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{todo.title}</DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => onSnooze(todo.id)} startIcon={<SnoozeRounded />} color="inherit">
              Snooze 5 min
            </Button>
            <Button onClick={() => onDone(todo.id)} startIcon={<CheckRounded />} variant="contained" color="success">
              Done
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
