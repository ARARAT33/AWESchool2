/**
 * Backward-compatible wrapper for legacy imports.
 *
 * The real i18n implementation now lives in `./i18n/index.ts`.
 * This file re-exports the public API so existing imports like
 *   `import { t, LANGUAGES, getLanguageByCode, UI_TRANSLATIONS } from '@/lib/i18n'`
 * keep working.
 *
 * New code should import from `@/lib/i18n` directly (which resolves to
 * `./i18n/index.ts`).
 */

export {
  LANGUAGES,
  getLanguageByCode,
  normalizeLangCode,
  t,
  hasStaticTranslation,
  getTranslations,
  subscribeToTranslations,
  translateText,
  STATIC_TRANSLATIONS,
} from './i18n/index'

export type { Language } from './i18n/languages'
export type { TranslationDict } from './i18n/index'

// Legacy export — components used to read UI_TRANSLATIONS directly.
// We expose the same shape so anything that imports it still works.
import { STATIC_TRANSLATIONS } from './i18n/index'
export const UI_TRANSLATIONS: Record<string, Record<string, string>> = STATIC_TRANSLATIONS
