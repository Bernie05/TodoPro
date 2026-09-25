import { Chip, Stack, Typography } from '@mui/material';

export function SectionHeader({ title, meta }: { title: string; meta?: string }) {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2, px: 0.5 }}>
      <Typography variant="h6" component="h2" sx={{ fontSize: 16 }}>
        {title}
      </Typography>
      {meta && <Chip size="small" label={meta} sx={{ fontWeight: 500, color: 'text.secondary' }} />}
    </Stack>
  );
}
