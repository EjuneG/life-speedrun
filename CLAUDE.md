# Life Speedrun

Gamified timer PWA for speedrunning daily tasks. Users compete against their Personal Best (PB) times.

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v3
- Zustand (state management)
- Dexie.js (IndexedDB wrapper)
- PWA (vite-plugin-pwa)

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── components/  # React components
├── stores/      # Zustand store
├── db/          # Dexie database schema
├── hooks/       # Custom hooks (useTimer)
├── utils/       # formatTime, formatDelta
├── types/       # TypeScript interfaces
└── App.tsx
```

## Core Types

```typescript
interface Task {
  id: string;                   // nanoid()
  name: string;
  icon: string;                 // emoji
  createdAt: number;
  personalBest: number | null;  // milliseconds
}

interface Record {
  id: string;
  taskId: string;
  duration: number;             // milliseconds
  completedAt: number;
  delta: number | null;         // positive = slower, negative = faster
  isNewPB: boolean;
}
```

## Design Guidelines

- Dark theme: background #0a0a0a
- Accent colors: green #00ff9f (fast), red #ff3e3e (slow), blue #00d4ff
- Timer digits: large, monospace font (JetBrains Mono or Space Mono)
- Minimal UI, cyberpunk/gaming aesthetic
- Cards with subtle glow effects

## Key Behaviors

- Clicking a task card immediately starts timer (no confirmation)
- Timer uses requestAnimationFrame or 16ms interval for smooth display
- On stop: calculate delta, update PB if new record, save to IndexedDB
- "New Record!" celebration when beating PB

## File References

- Detailed specs: @docs/SPEC.md (if exists)
- UI mockups: ASCII layouts in original planning conversation
