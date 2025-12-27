import Dexie, { Table } from 'dexie';
import { Task, Record } from '../types';

class LifeSpeedrunDB extends Dexie {
  tasks!: Table<Task>;
  records!: Table<Record>;

  constructor() {
    super('life-speedrun');
    this.version(1).stores({
      tasks: 'id, createdAt',
      records: 'id, taskId, completedAt'
    });
  }
}

export const db = new LifeSpeedrunDB();
