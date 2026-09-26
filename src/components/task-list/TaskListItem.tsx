import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import EventRounded from '@mui/icons-material/EventRounded';
import WhatshotRounded from '@mui/icons-material/WhatshotRounded';
import { Checkbox, IconButton, Paper, Stack, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { ConfirmDialog } from '../ConfirmDialog';
import { DAY_END_TIME, DAY_START_TIME } from '../../constants/time';
import type { TaskStatus, Todo } from '../../types/todo';
import { formatDateTime } from '../../utils/date';
import { CategoryChip, RecurrenceChip, TypeChip } from './TaskChips';

interface Props {
  todo: Todo;
  status: TaskStatus;
  /** Compact rows (Today board) hide chips and description. */
  compact?: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const statusBorder: Record<TaskStatus, string> = {
  upcoming: 'divider',
  active: 'success.main',
  overdue: 'error.main',
  done: 'divider',
};

/** `memo` + stable callbacks: toggling one task doesn't re-render the others. */
export const TaskListItem = memo(function TaskListItem({ todo, status, compact, onToggle, onDelete }: Props) {
  const done = status === 'done';
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Paper
      component="li"
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        p: compact ? 1 : 1.5,
        listStyle: 'none',
        borderColor: statusBorder[status],
        transition: (t) => t.transitions.create(['border-color', 'box-shadow']),
        '&:hover': { borderColor: 'primary.main', boxShadow: 1 },
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        color={compact ? 'success' : 'primary'}
        slotProps={{ input: { 'aria-label': `Mark "${todo.title}" as ${done ? 'not done' : 'done'}` } }}
        sx={{ p: 0.5 }}
      />

      <Stack spacing={0.75} sx={{ flex: 1, minWidth: 0, pt: 0.5 }}>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              wordBreak: 'break-word',
              textDecoration: done ? 'line-through' : 'none',
              color: done ? 'text.secondary' : 'text.primary',
            }}
          >
            {todo.title}
          </Typography>
          {!compact && (
            <>
              <TypeChip type={todo.type} />
              <CategoryChip category={todo.category} />
              <RecurrenceChip todo={todo} />
            </>
          )}
        </Stack>

        {!compact && todo.description && (
          <Typography variant="caption" color="text.secondary">
            {todo.description}
          </Typography>
        )}

        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'text.secondary' }}>
          {status === 'active' ? (
            <WhatshotRounded sx={{ fontSize: 14, color: 'success.main' }} />
          ) : (
            <EventRounded sx={{ fontSize: 14 }} />
          )}
          <Typography variant="caption">
            {compact
              ? `${todo.startTime || DAY_START_TIME} – ${todo.endTime || DAY_END_TIME}`
              : `${formatDateTime(todo.startDate, todo.startTime)} → ${formatDateTime(todo.endDate, todo.endTime)}`}
          </Typography>
        </Stack>
      </Stack>

      <IconButton size="small" color="error" aria-label={`Delete "${todo.title}"`} onClick={() => setConfirmOpen(true)}>
        <DeleteOutlineRounded fontSize="small" />
      </IconButton>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete task?"
        description={`"${todo.title}" will be permanently deleted.`}
        confirmLabel="Delete"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete(todo.id);
        }}
      />
    </Paper>
  );
});
