import { db } from '../db';

interface ErrorFallbackProps {
  error: Error | null;
  onReset: () => void;
}

export default function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  const handleClearData = async () => {
    if (confirm('确定要清除所有数据吗？此操作不可撤销。')) {
      try {
        await db.delete();
        await db.open();
        window.location.reload();
      } catch (err) {
        console.error('Failed to clear data:', err);
        alert('清除数据失败。请尝试手动清除浏览器数据。');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#1a1a1a] rounded-lg p-8 border border-[#ff3e3e]">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-[#ff3e3e] mb-2">出错了</h1>
          <p className="text-gray-400">应用遇到了一个错误</p>
        </div>

        {error && (
          <div className="bg-[#2a2a2a] rounded-lg p-4 mb-6">
            <p className="text-sm font-mono text-gray-300 break-all">{error.message}</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={onReset}
            className="w-full bg-[#00ff9f] hover:bg-[#00d480] text-black font-semibold py-3 rounded-lg transition-colors"
          >
            重试
          </button>

          <button
            onClick={handleClearData}
            className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#ff3e3e] font-semibold py-3 rounded-lg transition-colors border border-[#ff3e3e]"
          >
            清除所有数据
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300 font-semibold py-3 rounded-lg transition-colors"
          >
            刷新页面
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            如果问题持续存在，请尝试清除浏览器缓存或使用隐私模式
          </p>
        </div>
      </div>
    </div>
  );
}
