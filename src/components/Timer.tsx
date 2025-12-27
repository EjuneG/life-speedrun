import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { useStore } from '../stores/useStore';
import { useTimer } from '../hooks/useTimer';
import { formatTime, formatDelta } from '../utils/formatTime';

export function Timer() {
  const { activeTaskId, stopTimer } = useStore();
  const elapsed = useTimer();
  const task = useLiveQuery(() => {
    if (!activeTaskId) return undefined;
    return db.tasks.get(activeTaskId);
  }, [activeTaskId]);

  if (!task) return null;

  const currentDelta = task.personalBest !== null ? elapsed - task.personalBest : null;

  const handleStop = async () => {
    await stopTimer();
  };

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={handleStop}
          className="text-gray-400 hover:text-neon-blue transition-colors mb-8 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>返回</span>
        </button>

        {/* Task Info */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4">{task.icon}</div>
          <h2 className="text-2xl font-semibold text-white">{task.name}</h2>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className="font-mono text-7xl font-bold text-neon-green text-glow-green mb-6">
            {formatTime(elapsed)}
          </div>

          {/* PB and Delta */}
          {task.personalBest !== null && (
            <div className="space-y-2 text-lg">
              <div className="text-gray-400">
                <span>PB: </span>
                <span className="font-mono text-white">{formatTime(task.personalBest)}</span>
              </div>
              {currentDelta !== null && (
                <div
                  className={`font-mono font-semibold ${
                    currentDelta < 0
                      ? 'text-neon-green text-glow-green'
                      : 'text-neon-red text-glow-red'
                  }`}
                >
                  Delta: {formatDelta(currentDelta)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stop Button */}
        <button
          onClick={handleStop}
          className="w-full bg-neon-green hover:bg-opacity-90 text-cyber-black font-bold text-xl py-6 rounded-lg transition-all duration-300 shadow-neon-green hover:shadow-lg"
        >
          ■ 完成
        </button>
      </div>
    </div>
  );
}
