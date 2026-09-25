# TodoPro

A to-do app for organizing tasks and tracking progress, built with React, TypeScript and Material UI.

## Features

- Quick-add and detailed task forms (type, category, description, start/end, recurrence)
- Daily and weekly recurring tasks
- All Tasks view with type filters, and a Today board (Todo / Done)
- Live status: tasks are marked active or overdue as time passes
- Start-time reminders (in-app dialog plus optional browser notifications, with snooze)
- Light/dark theme that follows the system, with a manual toggle
- Tasks persist in `localStorage`

## Getting Started

```bash
git clone https://github.com/Bernie05/TodoPro.git
cd TodoPro
npm install
npm run dev
```

| Script            | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the Vite dev server             |
| `npm run build`   | Type-check and build for production   |
| `npm run preview` | Serve the production build            |
| `npm test`        | Run unit tests (Vitest)               |
| `npm run lint`    | Lint with oxlint                      |

## Project Structure

```
src/
├── types/          Domain types (Todo, TaskType, …)
├── constants/      Labels/colours for types, categories, statuses, weekdays
├── utils/          Pure logic: local-date helpers, task status, recurrence expansion
├── state/          Reducer, localStorage persistence, React context + provider
├── hooks/          useTodos, useNow (ticking clock), useTaskReminders
├── components/     Reusable UI (header, forms, task list, table, dialog)
├── views/          Tab contents: AllTasksView, TodayView
├── data/           Sample tasks shown on first launch
├── theme.ts        MUI theme with light and dark colour schemes
├── App.tsx         Page layout
└── main.tsx        Entry point: providers and root render
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push the branch and open a pull request
