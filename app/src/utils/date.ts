import { format, parseISO } from 'date-fns';

/**
 * Formats an ISO 8601 date string to a readable date.
 * Example: "2024-02-20T10:30:00Z" → "Feb 20, 2024"
 */
export function formatDate(isoDateString: string): string {
  try {
    const date = parseISO(isoDateString);
    return format(date, 'MMM d, yyyy');
  } catch {
    return 'Unknown date';
  }
}

/**
 * Formats an ISO 8601 date string to a time.
 * Example: "2024-02-20T10:30:00Z" → "10:30 AM"
 */
export function formatTime(isoDateString: string): string {
  try {
    const date = parseISO(isoDateString);
    return format(date, 'h:mm a');
  } catch {
    return 'Unknown time';
  }
}

/**
 * Formats an ISO 8601 date string to both date and time.
 * Example: "2024-02-20T10:30:00Z" → "Feb 20, 2024 at 10:30 AM"
 */
export function formatDateTime(isoDateString: string): string {
  try {
    const date = parseISO(isoDateString);
    return format(date, 'MMM d, yyyy \'at\' h:mm a');
  } catch {
    return 'Unknown date';
  }
}

/**
 * Formats seconds to a human-readable duration.
 * Example: 125.5 → "2:06"
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
