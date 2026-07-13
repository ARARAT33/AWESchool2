#!/usr/bin/env python3
"""
Add missing lesson-related UI keys to all language translation files.

Adds:
  - lesson.intro
  - lesson.summary
  - lesson.fun_fact
  - lesson.key_points

For hand-curated languages we provide proper translations.
For fallback languages we just append the keys with English source text
(the runtime translator will translate them on the fly).
"""

import re
from pathlib import Path

OUT_DIR = Path("/home/z/my-project/src/lib/i18n/translations")

# Hand-curated translations for the new keys
NEW_KEYS = {
    "hy": {
        "lesson.intro": "Ներածություն",
        "lesson.summary": "Ամփոփում",
        "lesson.fun_fact": "Հետաքրքիր փաստ",
        "lesson.key_points": "Հիմնական եզրակացություններ",
    },
    "en": {
        "lesson.intro": "Introduction",
        "lesson.summary": "Summary",
        "lesson.fun_fact": "Fun Fact",
        "lesson.key_points": "Key Points",
    },
    "ru": {
        "lesson.intro": "Введение",
        "lesson.summary": "Резюме",
        "lesson.fun_fact": "Интересный факт",
        "lesson.key_points": "Ключевые моменты",
    },
    "es": {
        "lesson.intro": "Introducción",
        "lesson.summary": "Resumen",
        "lesson.fun_fact": "Dato Curioso",
        "lesson.key_points": "Puntos Clave",
    },
    "fr": {
        "lesson.intro": "Introduction",
        "lesson.summary": "Résumé",
        "lesson.fun_fact": "Fait Amusant",
        "lesson.key_points": "Points Clés",
    },
    "de": {
        "lesson.intro": "Einleitung",
        "lesson.summary": "Zusammenfassung",
        "lesson.fun_fact": "Interessanter Fakt",
        "lesson.key_points": "Hauptpunkte",
    },
    "it": {
        "lesson.intro": "Introduzione",
        "lesson.summary": "Riepilogo",
        "lesson.fun_fact": "Fatto Curioso",
        "lesson.key_points": "Punti Chiave",
    },
    "pt": {
        "lesson.intro": "Introdução",
        "lesson.summary": "Resumo",
        "lesson.fun_fact": "Fato Curioso",
        "lesson.key_points": "Pontos-Chave",
    },
    "zh": {
        "lesson.intro": "介绍",
        "lesson.summary": "总结",
        "lesson.fun_fact": "趣味事实",
        "lesson.key_points": "要点",
    },
    "ja": {
        "lesson.intro": "はじめに",
        "lesson.summary": "まとめ",
        "lesson.fun_fact": "面白い事実",
        "lesson.key_points": "要点",
    },
    "ko": {
        "lesson.intro": "소개",
        "lesson.summary": "요약",
        "lesson.fun_fact": "재미있는 사실",
        "lesson.key_points": "핵심 포인트",
    },
    "ar": {
        "lesson.intro": "مقدمة",
        "lesson.summary": "ملخص",
        "lesson.fun_fact": "حقيقة ممتعة",
        "lesson.key_points": "النقاط الرئيسية",
    },
    "tr": {
        "lesson.intro": "Giriş",
        "lesson.summary": "Özet",
        "lesson.fun_fact": "İlginç Bilgi",
        "lesson.key_points": "Ana Noktalar",
    },
    "fa": {
        "lesson.intro": "مقدمه",
        "lesson.summary": "خلاصه",
        "lesson.fun_fact": "حقیقت جالب",
        "lesson.key_points": "نکات کلیدی",
    },
    "hi": {
        "lesson.intro": "परिचय",
        "lesson.summary": "सारांश",
        "lesson.fun_fact": "रोचक तथ्य",
        "lesson.key_points": "मुख्य बिंदु",
    },
    "uk": {
        "lesson.intro": "Вступ",
        "lesson.summary": "Підсумок",
        "lesson.fun_fact": "Цікавий факт",
        "lesson.key_points": "Ключові моменти",
    },
    "pl": {
        "lesson.intro": "Wstęp",
        "lesson.summary": "Podsumowanie",
        "lesson.fun_fact": "Ciekawostka",
        "lesson.key_points": "Kluczowe punkty",
    },
    "nl": {
        "lesson.intro": "Inleiding",
        "lesson.summary": "Samenvatting",
        "lesson.fun_fact": "Leuk feit",
        "lesson.key_points": "Kernpunten",
    },
    "sv": {
        "lesson.intro": "Introduktion",
        "lesson.summary": "Sammanfattning",
        "lesson.fun_fact": "Rolig fakta",
        "lesson.key_points": "Huvudpunkter",
    },
    "no": {
        "lesson.intro": "Introduksjon",
        "lesson.summary": "Sammendrag",
        "lesson.fun_fact": "Morsom fakta",
        "lesson.key_points": "Hovedpunkter",
    },
    "da": {
        "lesson.intro": "Introduktion",
        "lesson.summary": "Opsummering",
        "lesson.fun_fact": "Sjov fakta",
        "lesson.key_points": "Hovedpunkter",
    },
    "fi": {
        "lesson.intro": "Johdanto",
        "lesson.summary": "Yhteenveto",
        "lesson.fun_fact": "Hauska fakta",
        "lesson.key_points": "Keskeiset kohdat",
    },
    "cs": {
        "lesson.intro": "Úvod",
        "lesson.summary": "Shrnutí",
        "lesson.fun_fact": "Zajímavost",
        "lesson.key_points": "Klíčové body",
    },
    "el": {
        "lesson.intro": "Εισαγωγή",
        "lesson.summary": "Σύνοψη",
        "lesson.fun_fact": "Διασκεδαστικό γεγονός",
        "lesson.key_points": "Βασικά σημεία",
    },
    "he": {
        "lesson.intro": "הקדמה",
        "lesson.summary": "סיכום",
        "lesson.fun_fact": "עובדה מעניינת",
        "lesson.key_points": "נקודות עיקריות",
    },
    "hu": {
        "lesson.intro": "Bevezetés",
        "lesson.summary": "Összegzés",
        "lesson.fun_fact": "Érdekesség",
        "lesson.key_points": "Fő pontok",
    },
    "ro": {
        "lesson.intro": "Introducere",
        "lesson.summary": "Rezumat",
        "lesson.fun_fact": "Fapt amuzant",
        "lesson.key_points": "Puncte cheie",
    },
    "bg": {
        "lesson.intro": "Въведение",
        "lesson.summary": "Обобщение",
        "lesson.fun_fact": "Интересен факт",
        "lesson.key_points": "Ключови точки",
    },
    "ur": {
        "lesson.intro": "تعارف",
        "lesson.summary": "خلاصہ",
        "lesson.fun_fact": "دلچسپ حقیقت",
        "lesson.key_points": "اہم نکات",
    },
    "bn": {
        "lesson.intro": "ভূমিকা",
        "lesson.summary": "সারাংশ",
        "lesson.fun_fact": "মজার তথ্য",
        "lesson.key_points": "মূল পয়েন্ট",
    },
    "ms": {
        "lesson.intro": "Pengenalan",
        "lesson.summary": "Ringkasan",
        "lesson.fun_fact": "Fakta Menarik",
        "lesson.key_points": "Poin Utama",
    },
    "th": {
        "lesson.intro": "บทนำ",
        "lesson.summary": "สรุป",
        "lesson.fun_fact": "เรื่องสนุก",
        "lesson.key_points": "ประเด็นสำคัญ",
    },
    "vi": {
        "lesson.intro": "Giới thiệu",
        "lesson.summary": "Tóm tắt",
        "lesson.fun_fact": "Sự thật thú vị",
        "lesson.key_points": "Điểm chính",
    },
    "id": {
        "lesson.intro": "Pengenalan",
        "lesson.summary": "Ringkasan",
        "lesson.fun_fact": "Fakta Menarik",
        "lesson.key_points": "Poin Utama",
    },
    "sk": {
        "lesson.intro": "Úvod",
        "lesson.summary": "Zhrnutie",
        "lesson.fun_fact": "Zaujímavosť",
        "lesson.key_points": "Kľúčové body",
    },
    "ka": {
        "lesson.intro": "შესავალი",
        "lesson.summary": "შეჯამება",
        "lesson.fun_fact": "საინტერესო ფაქტი",
        "lesson.key_points": "ძირითადი წერტილები",
    },
}

# Also add 'subjects.art' and 'subjects.business' that we referenced
EXTRA_KEYS = {
    "hy": {"subjects.art": "Արվեստ", "subjects.business": "Բիզնես"},
    "en": {"subjects.art": "Arts", "subjects.business": "Business"},
    "ru": {"subjects.art": "Искусство", "subjects.business": "Бизнес"},
    "es": {"subjects.art": "Artes", "subjects.business": "Negocios"},
    "fr": {"subjects.art": "Arts", "subjects.business": "Affaires"},
    "de": {"subjects.art": "Kunst", "subjects.business": "Geschäft"},
    "it": {"subjects.art": "Arti", "subjects.business": "Affari"},
    "pt": {"subjects.art": "Artes", "subjects.business": "Negócios"},
    "zh": {"subjects.art": "艺术", "subjects.business": "商业"},
    "ja": {"subjects.art": "芸術", "subjects.business": "ビジネス"},
    "ko": {"subjects.art": "예술", "subjects.business": "비즈니스"},
    "ar": {"subjects.art": "الفنون", "subjects.business": "الأعمال"},
    "tr": {"subjects.art": "Sanat", "subjects.business": "İş"},
    "fa": {"subjects.art": "هنر", "subjects.business": "تجارت"},
    "hi": {"subjects.art": "कला", "subjects.business": "व्यवसाय"},
    "uk": {"subjects.art": "Мистецтво", "subjects.business": "Бізнес"},
    "pl": {"subjects.art": "Sztuka", "subjects.business": "Biznes"},
    "nl": {"subjects.art": "Kunst", "subjects.business": "Zakelijk"},
}

def quote(s: str) -> str:
    s = s.replace("\\", "\\\\").replace("'", "\\'")
    return f"'{s}'"

def patch_file(code: str):
    """Add missing keys to a translation file."""
    path = OUT_DIR / f"{code}.ts"
    if not path.exists():
        return False
    text = path.read_text(encoding="utf-8")
    additions = []
    for key, val in NEW_KEYS.get(code, {}).items():
        if f"'{key}'" not in text and f'"{key}"' not in text:
            additions.append(f"  {quote(key)}: {quote(val)},")
    for key, val in EXTRA_KEYS.get(code, {}).items():
        if f"'{key}'" not in text and f'"{key}"' not in text:
            additions.append(f"  {quote(key)}: {quote(val)},")
    if not additions:
        return False
    # Insert before the closing brace
    if text.rstrip().endswith("}"):
        new_text = text.rstrip()[:-1] + "\n" + "\n".join(additions) + "\n}\n"
        path.write_text(new_text, encoding="utf-8")
        return True
    return False

# Patch hand-curated languages
patched = 0
for code in list(NEW_KEYS.keys()) + list(EXTRA_KEYS.keys()):
    if patch_file(code):
        patched += 1
        print(f"  ✓ patched {code}.ts")

print(f"\n✓ Patched {patched} hand-curated files with new keys")

# For fallback files, the new keys will be translated at runtime since
# they're not in the en dictionary the fallback uses. Let me update en.ts
# to include them so fallback languages also benefit.
en_path = OUT_DIR / "en.ts"
en_text = en_path.read_text(encoding="utf-8")
existing = en_text
for key, val in NEW_KEYS["en"].items():
    if f"'{key}'" not in existing:
        existing = existing.rstrip()[:-1] + f"\n  {quote(key)}: {quote(val)},\n}}\n"
en_path.write_text(existing, encoding="utf-8")
print("  ✓ patched en.ts (used as runtime fallback source)")
