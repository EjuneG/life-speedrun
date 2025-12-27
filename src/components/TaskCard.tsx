import { Task } from '../types';
import { formatTime } from '../utils/formatTime';
import { useStore } from '../stores/useStore';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const startTimer = useStore((state) => state.startTimer);

  const handleClick = () => {
    startTimer(task.id);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-cyber-dark border border-cyber-gray hover:border-neon-green transition-all duration-300 rounded-lg p-6 text-left shadow-lg hover:shadow-neon-green group"
    >
      <div className="flex items-center gap-4">
        <div className="text-5xl">{task.icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-green transition-colors">
            {task.name}
          </h3>
          {task.personalBest !== null ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">PB:</span>
              <span className="text-neon-green font-mono text-lg font-semibold">
                {formatTime(task.personalBest)}
              </span>
            </div>
          ) : (
            <span className="text-gray-500 text-sm italic">No record yet</span>
          )}
        </div>
        <div className="text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
