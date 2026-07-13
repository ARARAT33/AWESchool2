/**
 * Runtime translator for fallback languages.
 *
 * When a language doesn't have a hand-curated translation file, we use
 * this module to translate the English source strings on the fly using
 * Google Translate's free public API. Results are cached in localStorage
 * so we don't re-translate the same strings on every render.
 *
 * The cache survives across sessions — once a key has been translated for
 * a given language, it never hits the network again.
 */

import { en } from './translations/en'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TranslationDict = Record<string, string>

// ---------------------------------------------------------------------------
// In-memory + localStorage cache
// ---------------------------------------------------------------------------

const CACHE_PREFIX = 'aweschool-i18n-cache:'

interface CacheEntry {
  v: string        // translated value
  ts: number       // timestamp
}

function readCache(lang: string): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(CACHE_PREFIX + lang)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, CacheEntry>
    const out: Record<string, string> = {}
    for (const [k, v] of Object.entries(parsed)) {
      if (v && typeof v.v === 'string') out[k] = v.v
    }
    return out
  } catch {
    return {}
  }
}

function writeCache(lang: string, cache: Record<string, string>) {
  if (typeof window === 'undefined') return
  try {
    const wrapped: Record<string, CacheEntry> = {}
    const now = Date.now()
    for (const [k, v] of Object.entries(cache)) {
      wrapped[k] = { v, ts: now }
    }
    window.localStorage.setItem(CACHE_PREFIX + lang, JSON.stringify(wrapped))
  } catch {
    // localStorage may be full or blocked — ignore
  }
}

// In-memory cache (per language) for current session
const memCache = new Map<string, Record<string, string>>()
// Pending translation requests — de-dupe so we don't fire N requests for same key
const pending = new Map<string, Promise<string>>()

function getMemCache(lang: string): Record<string, string> {
  let c = memCache.get(lang)
  if (!c) {
    c = readCache(lang)
    memCache.set(lang, c)
  }
  return c
}

// ---------------------------------------------------------------------------
// Google Translate API (free public endpoint)
// ---------------------------------------------------------------------------

async function googleTranslate(text: string, target: string, source: string = 'auto'): Promise<string | null> {
  if (!text || !target) return text
  // Skip translating if text already looks like target language (heuristic:
  // if it has no Latin / Armenian / Cyrillic letters we can't translate anyway)
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(source)}&tl=${encodeURIComponent(target)}&dt=t`
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `q=${encodeURIComponent(text)}`
    })
    if (!resp.ok) throw new Error('HTTP ' + resp.status)
    const data = await resp.json()
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const result = (data[0] as any[][]).map((seg) => seg[0]).filter(Boolean).join('')
      return result || null
    }
  } catch (e) {
    // Network error, blocked, etc.
    console.warn('Translation failed for text:', text, 'error:', e)
    return null
  }
  return null
}

// ---------------------------------------------------------------------------
// Public API: createFallbackTranslations
// ---------------------------------------------------------------------------

/**
 * Create a fallback translations object for a language. Returns a Proxy so
 * that any key access returns the cached translation if available, or the
 * English source if not yet translated. The async translator populates
 * the cache in the background.
 */
export function createFallbackTranslations(lang: string): TranslationDict {
  // We return the English dictionary as a starting point — the UI will
  // re-render with translations as they arrive via `translateMissing`.
  // Using English avoids showing raw keys to users while translations load.
  return { ...en, __fallback_lang__: lang }
}

/**
 * Returns true if the given dict is a fallback (runtime-translated) dict.
 */
export function isFallbackDict(dict: TranslationDict): boolean {
  return !!dict.__fallback_lang__
}

/**
 * Translate all missing keys for the given language in the background.
 * Calls the supplied `onUpdate` whenever new translations come in, so
 * React can re-render.
 */
export async function translateMissing(
  lang: string,
  dict: TranslationDict,
  onUpdate: (newDict: TranslationDict) => void,
): Promise<void> {
  const cache = getMemCache(lang)
  let changed = false

  // First pass: apply anything already in cache
  const updated: TranslationDict = { ...dict }
  for (const key of Object.keys(en)) {
    if (cache[key] && cache[key] !== updated[key]) {
      updated[key] = cache[key]
      changed = true
    }
  }
  if (changed) onUpdate(updated)

  // Second pass: queue async translations for missing keys
  const tasks: Promise<void>[] = []
  for (const key of Object.keys(en)) {
    if (cache[key]) continue
    const enText = en[key]
    if (!enText) continue

    const cacheKey = lang + '|' + key
    let p = pending.get(cacheKey)
    if (!p) {
      p = googleTranslate(enText, lang).then((translated) => {
        if (translated !== null) {
          cache[key] = translated
        }
        return translated || enText
      }).finally(() => {
        // Small delay before clearing so concurrent callers can dedupe
        setTimeout(() => pending.delete(cacheKey), 100)
      })
      pending.set(cacheKey, p)
    }

    tasks.push(p.then((translated) => {
      // Apply translation to a fresh dict and notify
      onUpdate({ ...updated, [key]: translated })
    }))
  }

  // Persist cache after all translations complete
  if (tasks.length > 0) {
    await Promise.all(tasks).catch(() => {})
    writeCache(lang, cache)
  }
}

/**
 * Synchronously translate a single arbitrary text string into the given
 * language. Returns the cached translation if available, otherwise returns
 * the original text and queues an async translation.
 */
export function translateText(
  text: string,
  lang: string,
  onTranslated?: (translated: string) => void,
): string {
  if (!text) return text
  if (lang === 'hy') return text

  // Look up in cache by text (key = lang + '|' + text)
  const cache = getMemCache(lang)
  // Use a simple hash for the cache key to avoid collisions with long texts sharing the same prefix
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }
  const cacheKey = '__text__:' + hash + ':' + text.length
  if (cache[cacheKey]) return cache[cacheKey]

  // Queue async translation
  if (onTranslated) {
    const reqKey = lang + '|text|' + cacheKey
    let p = pending.get(reqKey)
    if (!p) {
      p = googleTranslate(text, lang).then((translated) => {
        if (translated !== null) {
          cache[cacheKey] = translated
          // Also store in localStorage
          writeCache(lang, cache)
        }
        return translated || text
      }).finally(() => {
        setTimeout(() => pending.delete(reqKey), 100)
      })
      pending.set(reqKey, p)
    }
    p.then((translated) => onTranslated(translated))
  }

  return text
}
