import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { TaskCard } from './TaskCard';
import { useStore } from '../stores/useStore';

export function TaskList() {
  const tasks = useLiveQuery(() => db.tasks.orderBy('createdAt').reverse().toArray());
  const setShowAddTask = useStore((state) => state.setShowAddTask);

  return (
    <div className="min-h-screen bg-cyber-black p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-green text-glow-green mb-2">
            生活速通
          </h1>
          <p className="text-gray-400 text-sm">LIFE SPEEDRUN</p>
        </div>

        {/* Add Task Button */}
        <button
          onClick={() => setShowAddTask(true)}
          className="w-full bg-cyber-dark border-2 border-dashed border-cyber-gray hover:border-neon-blue text-neon-blue hover:text-white transition-all duration-300 rounded-lg p-6 mb-6 flex items-center justify-center gap-2 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="font-semibold">添加任务</span>
        </button>

        {/* Task List */}
        <div className="space-y-4">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">暂无任务</p>
              <p className="text-sm">点击上方按钮添加你的第一个任务</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
