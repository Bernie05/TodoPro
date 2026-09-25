import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useMemo } from 'react';
import { TASK_TYPES } from '../constants/taskOptions';
import { useTodos } from '../hooks/useTodos';
import { formatDateTime } from '../utils/date';
import { byStart, getTaskStatus } from '../utils/taskStatus';
import { SectionHeader } from './SectionHeader';
import { StatusChip } from './task-list/TaskChips';

const LIMIT = 5;

export function UpcomingTable({ now }: { now: Date }) {
  const { todos } = useTodos();
  const upcoming = useMemo(() => todos.filter((t) => !t.completed).sort(byStart).slice(0, LIMIT), [todos]);

  return (
    <section>
      <SectionHeader title="Upcoming" />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
              <TableCell>Task</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Type</TableCell>
              <TableCell>Date &amp; Time</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcoming.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography variant="body2" color="text.disabled" align="center">
                    Nothing coming up.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {upcoming.map((todo) => (
              <TableRow key={todo.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                <TableCell sx={{ fontWeight: 500 }}>{todo.title}</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{TASK_TYPES[todo.type].label}</TableCell>
                <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                  {formatDateTime(todo.startDate, todo.startTime)}
                </TableCell>
                <TableCell align="center">
                  <StatusChip status={getTaskStatus(todo, now)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}
