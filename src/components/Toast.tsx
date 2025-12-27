import { useEffect } from 'react';
import { useStore } from '../stores/useStore';

export default function Toast() {
  const { error, clearError } = useStore();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-[#1a1a1a] border-2 border-[#ff3e3e] rounded-lg px-6 py-4 shadow-2xl max-w-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#ff3e3e] mb-1">操作失败</p>
            <p className="text-xs text-gray-400">{error}</p>
          </div>
          <button
            onClick={clearError}
            className="text-gray-500 hover:text-gray-300 transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
