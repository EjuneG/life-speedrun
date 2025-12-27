export interface Task {
  id: string; // nanoid()
  name: string; // "刷牙", "晨起", "洗碗"
  icon: string; // emoji, 如 "🪥", "☀️", "🍽️"
  createdAt: number; // timestamp ms
  personalBest: number | null; // 毫秒, null = 无记录
}

export interface Record {
  id: string;
  taskId: string;
  duration: number; // 毫秒
  completedAt: number; // timestamp ms
  delta: number | null; // 与完成时 PB 的差值 (正=慢, 负=快)
  isNewPB: boolean;
}

// Runtime state (不持久化)
export interface TimerState {
  activeTaskId: string | null;
  startTime: number | null;
  isRunning: boolean;
}

export interface ResultData {
  duration: number;
  delta: number | null;
  isNewPB: boolean;
  previousPB: number | null;
  taskName: string;
  taskIcon: string;
}
