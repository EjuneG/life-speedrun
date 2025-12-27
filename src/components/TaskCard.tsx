import { useState } from 'react';
import { Task } from '../types';
import { formatTime } from '../utils/formatTime';
import { useStore } from '../stores/useStore';
import TaskOptionsModal from './TaskOptionsModal';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const startTimer = useStore((state) => state.startTimer);
  const [showOptions, setShowOptions] = useState(false);

  const handleClick = () => {
    startTimer(task.id);
  };

  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(true);
  };

  return (
    <>
      <div className="relative w-full bg-cyber-dark border border-cyber-gray hover:border-neon-green transition-all duration-300 rounded-lg p-6 shadow-lg hover:shadow-neon-green group">
        <button
          onClick={handleOptionsClick}
          className="absolute top-3 right-3 p-2 text-gray-500 hover:text-[#00ff9f] transition-colors opacity-0 group-hover:opacity-100 z-10"
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>

        <button onClick={handleClick} className="w-full text-left">
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
      </div>

      {showOptions && <TaskOptionsModal task={task} onClose={() => setShowOptions(false)} />}
    </>
  );
}
