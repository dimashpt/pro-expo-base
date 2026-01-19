import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

// Load all supported languages
require('dayjs/locale/en');
require('dayjs/locale/id');

// Extend dayjs with required plugins
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);

/**
 * Formats a date for display with smart relative/absolute formatting
 * @param date - The date to format (string, Date, or dayjs object)
 * @param absoluteDate - If true, shows absolute format "D MMMM YYYY HH:mm"
 * @returns Formatted date string
 *
 * @example
 * // Yesterday
 * formatDisplayDate('2024-01-14 14:30:00') // "yesterday"
 *
 * // Relative dates
 * formatDisplayDate('2024-01-10 14:30:00') // "5 days ago"
 * formatDisplayDate('2023-12-15 14:30:00') // "1 month ago"
 * formatDisplayDate('2022-01-15 14:30:00') // "2 years ago"
 *
 * // Absolute format
 * formatDisplayDate('2024-01-15 14:30:00', true) // "15 January 2024 14:30"
 */
export function formatDisplayDate(
  date: string | Date | dayjs.Dayjs,
  absoluteDate: boolean = true,
): string {
  const targetDate = dayjs(date);

  // Validate the date
  if (!targetDate.isValid()) {
    return '-';
  }

  // If absoluteDate is true, return formatted absolute date
  if (absoluteDate) {
    return targetDate.format('D MMMM YYYY HH:mm');
  }

  // For other dates, use relative time
  return targetDate.fromNow();
}
