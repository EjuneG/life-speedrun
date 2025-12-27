import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { db } from '../db';
import { ResultData } from '../types';
import { sanitizeTaskName, validateIcon } from '../utils/validation';

interface AppState {
  // Timer state
  activeTaskId: string | null;
  startTime: number | null;
  isRunning: boolean;

  // UI state
  showResult: boolean;
  lastResult: ResultData | null;
  showAddTask: boolean;
  editingTaskId: string | null;

  // Actions
  startTimer: (taskId: string) => void;
  stopTimer: () => Promise<void>;
  abandonTimer: () => void;
  closeResult: () => void;
  setShowAddTask: (show: boolean) => void;
  addTask: (name: string, icon: string) => Promise<void>;
  updateTask: (id: string, name: string, icon: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setEditingTaskId: (id: string | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  activeTaskId: null,
  startTime: null,
  isRunning: false,
  showResult: false,
  lastResult: null,
  showAddTask: false,
  editingTaskId: null,

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

  abandonTimer: () => {
    set({
      activeTaskId: null,
      startTime: null,
      isRunning: false,
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
    const sanitizedName = sanitizeTaskName(name);
    const iconValidation = validateIcon(icon);

    await db.tasks.add({
      id: nanoid(),
      name: sanitizedName,
      icon: iconValidation.sanitized,
      createdAt: Date.now(),
      personalBest: null,
    });
    set({ showAddTask: false });
  },

  updateTask: async (id: string, name: string, icon: string) => {
    const sanitizedName = sanitizeTaskName(name);
    const iconValidation = validateIcon(icon);

    await db.tasks.update(id, {
      name: sanitizedName,
      icon: iconValidation.sanitized,
    });
    set({ editingTaskId: null });
  },

  deleteTask: async (id: string) => {
    // Delete all records associated with this task
    await db.records.where('taskId').equals(id).delete();
    // Delete the task itself
    await db.tasks.delete(id);
    set({ editingTaskId: null });
  },

  setEditingTaskId: (id: string | null) => {
    set({ editingTaskId: id });
  },
}));
