import type { Lang, LocalizedText } from '~/utils/types/common.types';

const DEFAULT_LANG: Lang = 'en';

/**
 * Resolve a `LocalizedText` to a plain string for `locale`, falling back to
 * English, then to whatever value is present. Used by the `portfolio.ts` read
 * helpers so components keep receiving plain strings.
 */
export function loc(value: LocalizedText | undefined, locale: Lang): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[locale] ?? value[DEFAULT_LANG] ?? Object.values(value)[0] ?? '';
}
