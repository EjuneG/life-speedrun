import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { db } from '../db';
import { ResultData } from '../types';

interface AppState {
  // Timer state
  activeTaskId: string | null;
  startTime: number | null;
  isRunning: boolean;

  // UI state
  showResult: boolean;
  lastResult: ResultData | null;
  showAddTask: boolean;

  // Actions
  startTimer: (taskId: string) => void;
  stopTimer: () => Promise<void>;
  closeResult: () => void;
  setShowAddTask: (show: boolean) => void;
  addTask: (name: string, icon: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  activeTaskId: null,
  startTime: null,
  isRunning: false,
  showResult: false,
  lastResult: null,
  showAddTask: false,

  startTimer: (taskId: string) => {
    set({
      activeTaskId: taskId,
      startTime: Date.now(),
      isRunning: true,
    });
  },

  stopTimer: async () => {
    const { activeTaskId, startTime } = get();
    if (!activeTaskId || !startTime) return;

    const duration = Date.now() - startTime;
    const task = await db.tasks.get(activeTaskId);

    if (!task) return;

    const previousPB = task.personalBest;
    const isNewPB = previousPB === null || duration < previousPB;
    const delta = previousPB !== null ? duration - previousPB : null;

    // 保存记录
    await db.records.add({
      id: nanoid(),
      taskId: activeTaskId,
      duration,
      completedAt: Date.now(),
      delta,
      isNewPB,
    });

    // 更新 PB
    if (isNewPB) {
      await db.tasks.update(activeTaskId, {
        personalBest: duration,
      });
    }

    set({
      isRunning: false,
      activeTaskId: null,
      startTime: null,
      showResult: true,
      lastResult: {
        duration,
        delta,
        isNewPB,
        previousPB,
        taskName: task.name,
        taskIcon: task.icon,
      },
    });
  },

  closeResult: () => {
    set({
      showResult: false,
      lastResult: null,
    });
  },

  setShowAddTask: (show: boolean) => {
    set({ showAddTask: show });
  },

  addTask: async (name: string, icon: string) => {
    await db.tasks.add({
      id: nanoid(),
      name,
      icon,
      createdAt: Date.now(),
      personalBest: null,
    });
    set({ showAddTask: false });
  },
}));
