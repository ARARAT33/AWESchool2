/**
 * i18n entry point.
 *
 * Loads translations from per-language files in `./translations/`.
 * Falls back to English (then Armenian / source key) when a translation
 * is missing.
 *
 * For ~30 top languages we ship hand-curated files.
 * For the other 220+ languages we ship "fallback" stubs that use the
 * Google Translate API at runtime (see `./runtime.ts`).
 */

import { LANGUAGES, getLanguageByCode, normalizeLangCode } from './languages'
import { en } from './translations/en'
import { hy } from './translations/hy'
import { ru } from './translations/ru'
import { es } from './translations/es'
import { fr } from './translations/fr'
import { de } from './translations/de'

// Top 30+ languages with full hand-curated translations
import { it } from './translations/it'
import { pt } from './translations/pt'
import { zh } from './translations/zh'
import { ja } from './translations/ja'
import { ko } from './translations/ko'
import { ar } from './translations/ar'
import { tr } from './translations/tr'
import { fa } from './translations/fa'
import { hi } from './translations/hi'
import { ur } from './translations/ur'
import { bn } from './translations/bn'
import { id } from './translations/id'
import { ms } from './translations/ms'
import { th } from './translations/th'
import { vi } from './translations/vi'
import { pl } from './translations/pl'
import { uk } from './translations/uk'
import { nl } from './translations/nl'
import { sv } from './translations/sv'
import { no } from './translations/no'
import { da } from './translations/da'
import { fi } from './translations/fi'
import { cs } from './translations/cs'
import { sk } from './translations/sk'
import { hu } from './translations/hu'
import { ro } from './translations/ro'
import { bg } from './translations/bg'
import { el } from './translations/el'
import { he } from './translations/he'
import { ka } from './translations/ka'

// All other languages use runtime fallback (Google Translate API)
import {
  createFallbackTranslations,
  isFallbackDict,
  translateMissing,
  translateText as runtimeTranslateText,
  type TranslationDict,
} from './runtime'

export type { TranslationDict }
export { LANGUAGES, getLanguageByCode, normalizeLangCode }
export type { Language } from './languages'

// ---------------------------------------------------------------------------
// Static registry: hand-curated translations
// ---------------------------------------------------------------------------

const STATIC_TRANSLATIONS: Record<string, TranslationDict> = {
  en, hy, ru, es, fr, de,
  it, pt, zh, ja, ko, ar, tr, fa, hi, ur, bn,
  id, ms, th, vi, pl, uk, nl, sv, no, da, fi,
  cs, sk, hu, ro, bg, el, he, ka,
}

/**
 * Returns true if we have a hand-curated static translation file for this
 * language. False means the language uses runtime fallback translation.
 */
export function hasStaticTranslation(lang: string): boolean {
  return !!STATIC_TRANSLATIONS[lang]
}

/**
 * Get the translation dictionary for a language. For hand-curated languages
 * this returns the static dict. For other languages it returns a fallback
 * dict (English source) that will be progressively translated at runtime.
 */
export function getTranslations(lang: string): TranslationDict {
  const code = normalizeLangCode(lang)
  return STATIC_TRANSLATIONS[code] || makeFallback(code)
}

// ---------------------------------------------------------------------------
// Fallback dict cache (one per language)
// ---------------------------------------------------------------------------

const fallbackCache = new Map<string, TranslationDict>()

/**
 * Get or create a reactive fallback translations object for a language.
 * This proxy ensures that any access to a key triggers async translation
 * if needed, and the cache is updated in real-time.
 */
function makeFallback(lang: string): TranslationDict {
  let d = fallbackCache.get(lang)
  if (!d) {
    d = createFallbackTranslations(lang)
    fallbackCache.set(lang, d)
  }
  return d
}

/**
 * Refresh the fallback cache for a language with newly translated values.
 * This is called by subscribeToTranslations when new translations arrive.
 */
export function refreshFallbackCache(lang: string, newDict: TranslationDict): void {
  fallbackCache.set(lang, newDict)
}

// ---------------------------------------------------------------------------
// Synchronous translate (t) — used by React components
// ---------------------------------------------------------------------------

/**
 * Translate a UI key into the given language. Falls back to English, then
 * to the key itself.
 */
export function t(key: string, lang: string = 'en'): string {
  const code = normalizeLangCode(lang)
  const dict = getTranslations(code)
  return dict[key] || STATIC_TRANSLATIONS.en[key] || STATIC_TRANSLATIONS.hy[key] || key
}

// ---------------------------------------------------------------------------
// Async translation hook (for fallback languages)
// ---------------------------------------------------------------------------

/**
 * Subscribe to async translations for the given language. Calls `onUpdate`
 * whenever new translations arrive. Returns an unsubscribe function.
 *
 * For static languages this is a no-op.
 */
export function subscribeToTranslations(
  lang: string,
  onUpdate: (newDict: TranslationDict) => void,
): () => void {
  const code = normalizeLangCode(lang)
  if (hasStaticTranslation(code)) {
    return () => {}
  }

  let cancelled = false
  const dict = getTranslations(code)
  if (!isFallbackDict(dict)) return () => {}

  // Kick off background translation. Each call to onUpdate replaces the
  // fallback cache entry for this language, so future t() calls pick up
  // the new translations.
  translateMissing(code, dict, (newDict) => {
    if (cancelled) return
    refreshFallbackCache(code, newDict)
    onUpdate(newDict)
  })

  return () => { cancelled = true }
}

// ---------------------------------------------------------------------------
// Free-text translation (for content that isn't a UI key)
// ---------------------------------------------------------------------------

/**
 * Translate an arbitrary text string into the given language. For Armenian
 * source language returns the text unchanged. For all other languages
 * (static or fallback) uses the runtime Google Translate translator.
 */
export function translateText(
  text: string,
  lang: string,
  onTranslated?: (translated: string) => void,
): string {
  const code = normalizeLangCode(lang)
  if (code === 'hy') return text
  return runtimeTranslateText(text, code, onTranslated)
}

// Re-export commonly used symbols
export { STATIC_TRANSLATIONS }
