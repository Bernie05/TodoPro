import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import LightModeRounded from '@mui/icons-material/LightModeRounded';
import NotificationsActiveRounded from '@mui/icons-material/NotificationsActiveRounded';
import NotificationsOffRounded from '@mui/icons-material/NotificationsOffRounded';
import TaskAltRounded from '@mui/icons-material/TaskAltRounded';
import { Avatar, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { useState } from 'react';

const notificationsSupported = typeof window !== 'undefined' && 'Notification' in window;

export function AppHeader() {
  const { mode, systemMode, setMode } = useColorScheme();
  const resolvedMode = mode === 'system' ? systemMode : mode;
  const [permission, setPermission] = useState(() =>
    notificationsSupported ? Notification.permission : 'denied',
  );

  // Browsers only allow permission prompts from a user gesture, so this is a button — not on page load.
  const requestNotifications = async () => setPermission(await Notification.requestPermission());

  return (
    <Stack component="header" spacing={1} sx={{ alignItems: 'center', py: 3, position: 'relative' }}>
      <Stack direction="row" sx={{ position: 'absolute', top: 16, right: 0 }}>
        {notificationsSupported && (
          <Tooltip title={permission === 'granted' ? 'Notifications on' : 'Enable notifications'}>
            <span>
              <IconButton onClick={requestNotifications} disabled={permission !== 'default'}>
                {permission === 'granted' ? <NotificationsActiveRounded /> : <NotificationsOffRounded />}
              </IconButton>
            </span>
          </Tooltip>
        )}
        <Tooltip title="Toggle theme">
          <IconButton onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}>
            {resolvedMode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
          </IconButton>
        </Tooltip>
      </Stack>

      <Avatar
        variant="rounded"
        sx={{ width: 56, height: 56, borderRadius: 4, bgcolor: 'primary.main', boxShadow: 3 }}
      >
        <TaskAltRounded fontSize="large" />
      </Avatar>
      <Typography variant="h4" component="h1">
        Todo Notes Pro
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
        Organize tasks with smart scheduling
      </Typography>
    </Stack>
  );
}
