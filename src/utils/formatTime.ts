/**
 * 将毫秒格式化为 "HH:MM:SS.ms", "MM:SS.ms" 或 "SS.ms"
 * 例: 3675123 -> "1:01:15.12" (1 hour+)
 * 例: 75123 -> "1:15.12"
 * 例: 5123 -> "5.12"
 */
export function formatTime(ms: number): string {
  // Prevent negative times
  const safems = Math.max(0, ms);

  const totalSeconds = Math.floor(safems / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((safems % 1000) / 10); // 取两位小数

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  } else if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  } else {
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
  }
}

/**
 * 格式化 delta，带符号
 * 例: -2660 -> "-02.66"
 * 例: 8450 -> "+08.45"
 */
export function formatDelta(ms: number): string {
  const absMs = Math.abs(ms);
  const totalSeconds = Math.floor(absMs / 1000);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((absMs % 1000) / 10);

  const sign = ms < 0 ? '-' : '+';
  return `${sign}${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}
