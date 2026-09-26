import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { UPCOMING_DAY_LIMIT } from '../constants/ui';
import { useTodos } from '../hooks/useTodos';
import { friendlyDateLabel } from '../utils/date';
import { groupUpcomingByDate } from '../utils/upcoming';
import { SectionHeader } from './SectionHeader';
import { TaskList } from './task-list/TaskList';

export function UpcomingTable({ now }: { now: Date }) {
  const { todos } = useTodos();
  const groups = useMemo(
    () => groupUpcomingByDate(todos.filter((t) => !t.completed), UPCOMING_DAY_LIMIT),
    [todos],
  );
  // The nearest upcoming day is open by default; the rest start collapsed.
  const [expanded, setExpanded] = useState<string | false>(groups[0]?.dateKey ?? false);

  return (
    <section>
      <SectionHeader title="Upcoming" />
      {groups.length === 0 ? (
        <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center', py: 4 }}>
          Nothing coming up.
        </Typography>
      ) : (
        <Stack spacing={1}>
          {groups.map((group) => (
            <Accordion
              key={group.dateKey}
              expanded={expanded === group.dateKey}
              onChange={(_, isExpanded) => setExpanded(isExpanded ? group.dateKey : false)}
              disableGutters
            >
              <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls={`upcoming-${group.dateKey}-content`} id={`upcoming-${group.dateKey}-header`}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Typography variant="subtitle2">{friendlyDateLabel(group.dateKey, now)}</Typography>
                  <Chip size="small" label={group.todos.length} />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <TaskList todos={group.todos} now={now} compact empty="Nothing coming up." />
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      )}
    </section>
  );
}
