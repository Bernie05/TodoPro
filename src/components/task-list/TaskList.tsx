import { Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { useTodos } from '../../hooks/useTodos';
import type { Todo } from '../../types/todo';
import { getTaskStatus } from '../../utils/taskStatus';
import { TaskListItem } from './TaskListItem';

interface Props {
  todos: Todo[];
  now: Date;
  compact?: boolean;
  empty: ReactNode;
  maxHeight?: number;
}

export function TaskList({ todos, now, compact, empty, maxHeight = 420 }: Props) {
  const { toggleTodo, deleteTodo } = useTodos();

  if (todos.length === 0) {
    return (
      <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center', py: compact ? 3 : 6 }}>
        {empty}
      </Typography>
    );
  }

  return (
    <Stack component="ul" spacing={1.25} sx={{ m: 0, p: 0, pr: 0.5, maxHeight, overflowY: 'auto' }}>
      {todos.map((todo) => (
        <TaskListItem
          key={todo.id}
          todo={todo}
          status={getTaskStatus(todo, now)}
          compact={compact}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </Stack>
  );
}
