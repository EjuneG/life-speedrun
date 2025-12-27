import { useState, useEffect } from 'react';
import { useStore } from '../stores/useStore';

export function useTimer() {
  const { startTime, isRunning } = useStore();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isRunning || !startTime) {
      setElapsed(0);
      return;
    }

    // 使用 requestAnimationFrame 保证流畅
    let animationFrameId: number;

    const updateElapsed = () => {
      setElapsed(Date.now() - startTime);
      animationFrameId = requestAnimationFrame(updateElapsed);
    };

    animationFrameId = requestAnimationFrame(updateElapsed);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRunning, startTime]);

  return elapsed;
}
