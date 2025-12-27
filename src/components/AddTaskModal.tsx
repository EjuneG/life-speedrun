import { useState } from 'react';
import { useStore } from '../stores/useStore';

const EMOJI_SUGGESTIONS = [
  '🪥', '☀️', '🍽️', '🧹', '📚', '💪', '🏃', '🧘',
  '🚿', '🥗', '☕', '💻', '🎮', '🛌', '🧺', '🚗',
  '🐕', '🌱', '🎨', '🎵', '📝', '🔧', '🍳', '🧼'
];

export function AddTaskModal() {
  const { showAddTask, setShowAddTask, addTask } = useStore();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🪥');

  if (!showAddTask) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addTask(name.trim(), icon);
    setName('');
    setIcon('🪥');
  };

  const handleClose = () => {
    setShowAddTask(false);
    setName('');
    setIcon('🪥');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-6 z-50 backdrop-blur-sm">
      <div className="bg-cyber-dark border-2 border-neon-blue shadow-neon-blue rounded-lg p-8 max-w-md w-full animate-slide-up">
        <h2 className="text-2xl font-bold text-neon-blue mb-6">添加新任务</h2>

        <form onSubmit={handleSubmit}>
          {/* Icon Selector */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-3">选择图标</label>
            <div className="grid grid-cols-8 gap-2 mb-3">
              {EMOJI_SUGGESTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`text-3xl p-2 rounded transition-all ${
                    icon === emoji
                      ? 'bg-neon-blue bg-opacity-20 scale-110'
                      : 'hover:bg-cyber-gray'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">或输入: </span>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value.slice(0, 2))}
                className="bg-cyber-gray text-white px-3 py-2 rounded text-2xl w-20 text-center border border-transparent focus:border-neon-blue outline-none"
              />
            </div>
          </div>

          {/* Task Name */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">任务名称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如: 刷牙、晨起、洗碗"
              className="w-full bg-cyber-gray text-white px-4 py-3 rounded border border-transparent focus:border-neon-blue outline-none transition-colors"
              autoFocus
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-cyber-gray hover:bg-opacity-80 text-white font-semibold py-3 rounded transition-all"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 bg-neon-blue hover:bg-opacity-90 text-cyber-black font-bold py-3 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
