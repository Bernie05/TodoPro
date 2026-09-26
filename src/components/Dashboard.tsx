import AssignmentRounded from '@mui/icons-material/AssignmentRounded';
import DoneAllRounded from '@mui/icons-material/DoneAllRounded';
import LocalFireDepartmentRounded from '@mui/icons-material/LocalFireDepartmentRounded';
import PendingActionsRounded from '@mui/icons-material/PendingActionsRounded';
import TodayRounded from '@mui/icons-material/TodayRounded';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTodos } from '../hooks/useTodos';
import { getCompletionStreak, getDayStreak, getTaskStats } from '../utils/stats';
import { SectionHeader } from './SectionHeader';

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  accent: string;
  suffix?: string;
}

function StatCard({ label, value, icon, accent, suffix }: StatCardProps) {
  return (
    <Paper
      component="dl"
      sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, m: 0, borderColor: accent, borderTopWidth: 3 }}
    >
      <Stack sx={{ color: accent, alignItems: 'center', justifyContent: 'center' }}>{icon}</Stack>
      <Stack spacing={0}>
        <Typography component="dt" variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography component="dd" variant="h5" sx={{ m: 0, fontWeight: 600 }}>
          {value}
          {suffix && (
            <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {suffix}
            </Typography>
          )}
        </Typography>
      </Stack>
    </Paper>
  );
}

export function Dashboard({ now }: { now: Date }) {
  const { todos } = useTodos();

  const { stats, completionStreak, dayStreak } = useMemo(
    () => ({
      stats: getTaskStats(todos),
      completionStreak: getCompletionStreak(todos, now),
      dayStreak: getDayStreak(todos, now),
    }),
    [todos, now],
  );

  return (
    <section aria-label="Dashboard">
      <SectionHeader title="Dashboard" />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard label="Total tasks" value={stats.total} icon={<AssignmentRounded />} accent="primary.main" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard label="Completed" value={stats.completed} icon={<DoneAllRounded />} accent="success.main" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard label="Pending" value={stats.pending} icon={<PendingActionsRounded />} accent="warning.main" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <StatCard
            label="Completion streak"
            value={completionStreak}
            suffix={completionStreak === 1 ? 'day' : 'days'}
            icon={<LocalFireDepartmentRounded />}
            accent="error.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <StatCard
            label="Day streak"
            value={dayStreak}
            suffix={dayStreak === 1 ? 'day' : 'days'}
            icon={<TodayRounded />}
            accent="info.main"
          />
        </Grid>
      </Grid>
    </section>
  );
}
