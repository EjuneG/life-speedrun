export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface IconValidationResult {
  valid: boolean;
  sanitized: string;
}

export const validateTaskName = (name: string): ValidationResult => {
  const trimmed = name.trim();
  if (!trimmed) {
    return { valid: false, error: '任务名称不能为空' };
  }
  if (trimmed.length > 50) {
    return { valid: false, error: '任务名称过长 (最多50字符)' };
  }
  return { valid: true };
};

export const validateIcon = (icon: string): IconValidationResult => {
  // Extract first emoji or first 2 chars
  const emojiRegex = /\p{Emoji}/u;
  const match = icon.match(emojiRegex);
  if (match) {
    return { valid: true, sanitized: match[0] };
  }
  // Fallback to first 2 chars or default emoji
  const sanitized = icon.slice(0, 2) || '📝';
  return { valid: true, sanitized };
};

export const sanitizeTaskName = (name: string): string => {
  return name.trim().slice(0, 50);
};
