#!/usr/bin/env python3
"""
Generate fallback translation files for the remaining 245+ languages.

Strategy: For each language without a hand-curated file, generate a tiny
"stub" file that just declares the language code. The runtime translator
will then call Google Translate API on the English source text to translate
UI strings on the fly (cached in localStorage).

Output: /home/z/my-project/src/lib/i18n/translations/<code>.ts
"""

import re
from pathlib import Path
import sys

# Add project root to path
sys.path.insert(0, "/home/z/my-project")

OUT_DIR = Path("/home/z/my-project/src/lib/i18n/translations")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Read the languages list to get all language codes
LANG_FILE = Path("/home/z/my-project/src/lib/i18n/languages.ts")
text = LANG_FILE.read_text(encoding="utf-8")

# Extract all language codes from the file
codes = re.findall(r"code:\s*'([^']+)'", text)
print(f"Found {len(codes)} language codes in languages.ts")

# Already have hand-curated translations for these
HAND_CURATED = {"hy", "en", "ru", "es", "fr", "de"}

# Some codes are duplicated in the original list (e.g. 'pa', 'ne', 'sa')
# We deduplicate while preserving order.
seen = set()
unique_codes = []
for c in codes:
    if c not in seen:
        seen.add(c)
        unique_codes.append(c)
print(f"Unique codes: {len(unique_codes)}")

def is_valid_ts_identifier(code: str) -> bool:
    """Check if the code can be used as a TS variable name (after prefix)."""
    return bool(re.match(r"^[A-Za-z][A-Za-z0-9_]*$", code))

def safe_var_name(code: str) -> str:
    """Convert a code to a safe TS variable name."""
    # Replace non-alphanumeric with underscore
    s = re.sub(r"[^A-Za-z0-9_]", "_", code)
    if s and s[0].isdigit():
        s = "L_" + s
    return s

# Generate fallback stub for each language not in HAND_CURATED
generated = 0
for code in unique_codes:
    if code in HAND_CURATED:
        continue
    if not is_valid_ts_identifier(code):
        # Use a safe var name
        var_name = "L_" + safe_var_name(code)
    else:
        var_name = code

    content = f"""// {code} - UI translations (runtime-translated via Google Translate API)
// Այս լեզվի համար մենք չունենք ձեռքով թարգմանություն:
// Runtime-ում կանենք Google Translate API կանչեր անգլերեն բազայի վրա:
// Թարգմանությունները կcached-ացվեն localStorage-ում:

import {{ createFallbackTranslations }} from '../runtime'

export const {var_name} = createFallbackTranslations('{code}')
"""
    (OUT_DIR / f"{code}.ts").write_text(content, encoding="utf-8")
    generated += 1

print(f"\n✓ Generated {generated} fallback translation files")
print(f"  Total: {len(HAND_CURATED)} hand-curated + {generated} fallback = {len(HAND_CURATED) + generated} files")
