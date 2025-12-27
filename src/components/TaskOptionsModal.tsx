import { useState } from 'react';
import { Task } from '../types';
import { useStore } from '../stores/useStore';
import { validateTaskName, validateIcon } from '../utils/validation';

interface TaskOptionsModalProps {
  task: Task;
  onClose: () => void;
}

export default function TaskOptionsModal({ task, onClose }: TaskOptionsModalProps) {
  const [mode, setMode] = useState<'menu' | 'edit' | 'delete'>('menu');
  const [name, setName] = useState(task.name);
  const [icon, setIcon] = useState(task.icon);
  const [error, setError] = useState<string>('');
  const updateTask = useStore((state) => state.updateTask);
  const deleteTask = useStore((state) => state.deleteTask);

  const nameValidation = validateTaskName(name);
  const isValid = nameValidation.valid;

  const handleUpdate = async () => {
    const nameValidation = validateTaskName(name);
    if (!nameValidation.valid) {
      setError(nameValidation.error || '输入无效');
      return;
    }

    const iconValidation = validateIcon(icon);
    await updateTask(task.id, name.trim(), iconValidation.sanitized);
    onClose();
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    onClose();
  };

  if (mode === 'edit') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="mx-4 w-full max-w-md rounded-lg bg-[#1a1a1a] p-6 shadow-2xl">
          <h2 className="mb-6 text-2xl font-bold text-[#00ff9f]">编辑任务</h2>

          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-400">图标</label>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value.slice(0, 2))}
              className="w-full rounded-lg bg-[#2a2a2a] px-4 py-3 text-4xl text-center text-white outline-none transition focus:ring-2 focus:ring-[#00ff9f]"
              maxLength={2}
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm text-gray-400">任务名称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className="w-full rounded-lg bg-[#2a2a2a] px-4 py-3 text-white outline-none transition focus:ring-2 focus:ring-[#00ff9f]"
              placeholder="输入任务名称"
              autoFocus
              maxLength={50}
            />
            {error && <p className="mt-2 text-sm text-[#ff3e3e]">{error}</p>}
            {!error && name.length > 0 && (
              <p className="mt-1 text-xs text-gray-500">{name.length}/50 字符</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg bg-[#2a2a2a] px-6 py-3 font-medium text-white transition hover:bg-[#3a3a3a]"
            >
              取消
            </button>
            <button
              onClick={handleUpdate}
              disabled={!isValid}
              className="flex-1 rounded-lg bg-[#00ff9f] px-6 py-3 font-medium text-black transition hover:bg-[#00d480] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'delete') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="mx-4 w-full max-w-md rounded-lg bg-[#1a1a1a] p-6 shadow-2xl">
          <h2 className="mb-4 text-2xl font-bold text-[#ff3e3e]">确认删除</h2>
          <p className="mb-2 text-gray-300">
            确定要删除任务 <span className="font-bold text-white">{task.name}</span> 吗？
          </p>
          <p className="mb-6 text-sm text-gray-500">删除任务将同时删除所有相关记录，此操作不可撤销。</p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg bg-[#2a2a2a] px-6 py-3 font-medium text-white transition hover:bg-[#3a3a3a]"
            >
              取消
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 rounded-lg bg-[#ff3e3e] px-6 py-3 font-medium text-white transition hover:bg-[#e02e2e]"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-md rounded-lg bg-[#1a1a1a] p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center gap-3 border-b border-[#2a2a2a] pb-4">
          <span className="text-4xl">{task.icon}</span>
          <span className="text-xl font-medium text-white">{task.name}</span>
        </div>

        <button
          onClick={() => setMode('edit')}
          className="mb-2 w-full rounded-lg bg-[#2a2a2a] px-6 py-3 text-left font-medium text-white transition hover:bg-[#3a3a3a]"
        >
          ✏️ 编辑任务
        </button>

        <button
          onClick={() => setMode('delete')}
          className="mb-2 w-full rounded-lg bg-[#2a2a2a] px-6 py-3 text-left font-medium text-[#ff3e3e] transition hover:bg-[#3a3a3a]"
        >
          🗑️ 删除任务
        </button>

        <button
          onClick={onClose}
          className="w-full rounded-lg bg-[#2a2a2a] px-6 py-3 font-medium text-gray-400 transition hover:bg-[#3a3a3a]"
        >
          取消
        </button>
      </div>
    </div>
  );
}
