import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines classnames with Tailwind CSS utility classes.
 *
 * @param inputs - Classnames to combine.
 * @returns Combined classnames.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
