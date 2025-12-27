import { useStore } from '../stores/useStore';
import { formatTime, formatDelta } from '../utils/formatTime';

export function ResultModal() {
  const { showResult, lastResult, closeResult } = useStore();

  if (!showResult || !lastResult) return null;

  const { duration, delta, isNewPB, previousPB, taskName, taskIcon } = lastResult;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-6 z-50 backdrop-blur-sm">
      <div className="bg-cyber-dark border-2 border-neon-green shadow-neon-green rounded-lg p-8 max-w-md w-full animate-slide-up">
        {/* New Record Animation */}
        {isNewPB && (
          <div className="text-center mb-6 animate-pulse-glow">
            <div className="text-5xl mb-2">🎉</div>
            <h2 className="text-2xl font-bold text-neon-green text-glow-green">
              NEW RECORD!
            </h2>
          </div>
        )}

        {/* Task Info */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">{taskIcon}</div>
          <h3 className="text-xl text-white mb-1">{taskName}</h3>
        </div>

        {/* Time Display */}
        <div className="text-center mb-6">
          <div className="font-mono text-5xl font-bold text-white mb-4">
            {formatTime(duration)}
          </div>

          {/* Delta */}
          {delta !== null && (
            <div className="space-y-2">
              <div
                className={`text-2xl font-mono font-bold flex items-center justify-center gap-2 ${
                  delta < 0
                    ? 'text-neon-green text-glow-green'
                    : 'text-neon-red text-glow-red'
                }`}
              >
                {delta < 0 ? (
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
                      strokeWidth={3}
                      d="M19 14l-7-7m0 0l-7 7m7-7v18"
                    />
                  </svg>
                ) : (
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
                      strokeWidth={3}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                )}
                <span>{formatDelta(delta)}</span>
                <span className="text-sm text-gray-400">
                  {delta < 0 ? 'faster' : 'slower'}
                </span>
              </div>
              {previousPB !== null && (
                <p className="text-gray-400 text-sm">
                  Previous PB: {formatTime(previousPB)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* OK Button */}
        <button
          onClick={closeResult}
          className="w-full bg-neon-green hover:bg-opacity-90 text-cyber-black font-bold text-lg py-4 rounded-lg transition-all duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
}
