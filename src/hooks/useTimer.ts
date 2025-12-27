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
      const currentTime = Date.now();
      const newElapsed = currentTime - startTime;

      // Prevent negative elapsed time (edge case with clock changes)
      if (newElapsed >= 0) {
        setElapsed(newElapsed);
      }

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
