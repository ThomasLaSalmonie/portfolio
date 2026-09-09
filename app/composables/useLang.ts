import type { Lang } from '~/utils/types/common.types';

/**
 * The active locale narrowed to our `Lang` union, for passing to the
 * locale-aware `portfolio.ts` read helpers. Reactive — recomputes on switch.
 */
export function useLang() {
  const { locale } = useI18n();
  return computed<Lang>(() => (locale.value === 'fr' ? 'fr' : 'en'));
}
