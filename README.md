# Life Speedrun (生活速通) ⚡

A minimal, gamified timer PWA that helps you speedrun daily tasks by beating your Personal Best (PB) times.

## Features

- **One-tap Start**: Click any task card to instantly start timing
- **Real-time Timer**: Smooth 60fps timer display with PB comparison
- **Delta Tracking**: See how much faster/slower you are vs your PB
- **New Record Celebrations**: Animated celebration when you beat your PB
- **PWA Support**: Install on your phone, works offline
- **Cyberpunk Aesthetic**: Dark theme with neon green/red/blue accents

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v3 (cyberpunk theme)
- **State Management**: Zustand
- **Database**: Dexie.js (IndexedDB wrapper)
- **PWA**: vite-plugin-pwa

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Add a Task**: Click the "添加任务" button to create a new task
2. **Start Timer**: Click any task card to immediately start timing
3. **Complete Task**: Click the "完成" button when done
4. **View Results**: See your time, delta, and PB celebration if you broke your record!

## Project Structure

```
src/
├── components/       # React components
│   ├── TaskList.tsx      # Main task list view
│   ├── TaskCard.tsx      # Individual task card
│   ├── Timer.tsx         # Running timer view
│   ├── ResultModal.tsx   # Result/celebration modal
│   └── AddTaskModal.tsx  # Add new task modal
├── stores/
│   └── useStore.ts       # Zustand state management
├── db/
│   └── index.ts          # Dexie database schema
├── hooks/
│   └── useTimer.ts       # Timer logic hook
├── utils/
│   └── formatTime.ts     # Time formatting utilities
├── types/
│   └── index.ts          # TypeScript definitions
├── App.tsx
├── main.tsx
└── index.css             # Tailwind + custom styles
```

## Database Schema

### Tasks Table
- `id`: unique identifier (nanoid)
- `name`: task name (e.g., "刷牙", "洗碗")
- `icon`: emoji icon
- `createdAt`: creation timestamp
- `personalBest`: best time in milliseconds (null if no records)

### Records Table
- `id`: unique identifier
- `taskId`: reference to task
- `duration`: completion time in milliseconds
- `completedAt`: completion timestamp
- `delta`: difference from PB at completion time
- `isNewPB`: whether this set a new PB

## PWA Configuration

The app is configured as a Progressive Web App with:
- Offline support via service worker
- Installable on mobile devices
- App manifest with icons and theme colors
- Cache-first strategy for static assets

To use as a PWA:
1. Build the app: `npm run build`
2. Deploy the `dist/` folder to a web server (e.g., Vercel)
3. Visit the URL on your phone and "Add to Home Screen"

## Customization

### Colors
Edit `tailwind.config.js` to customize the neon colors:
- `neon-green`: Default accent color
- `neon-red`: Slower time indicator
- `neon-blue`: UI accents
- `cyber-black`: Background

### Fonts
The app uses JetBrains Mono by default. Change in `src/index.css`.

## License

MIT

## Author

Built for speedrunning daily life!
