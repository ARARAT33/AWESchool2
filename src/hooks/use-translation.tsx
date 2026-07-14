"use client";

import { useEffect, useState } from "react";
import { useI18nStore, UI_DICTIONARY, translateText } from "@/lib/i18n";

export function useTranslation() {
  const { language, setLanguage } = useI18nStore();

  const t = (key: string): string => {
    return (
      UI_DICTIONARY[language]?.[key] ||
      UI_DICTIONARY["en"]?.[key] ||
      UI_DICTIONARY["hy"]?.[key] ||
      key
    );
  };

  return { t, language, setLanguage };
}

interface TranslateProps {
  text: string;
}

/**
 * A highly performant Client Component that dynamically translates any raw text 
 * into the currently selected language using cached translation pipelines.
 * It features a smooth fade-in transitions.
 */
export function Translate({ text }: TranslateProps) {
  const { language } = useI18nStore();
  const [translated, setTranslated] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    if (!text) return;

    if (language === "hy") {
      setTranslated(text);
      setLoading(false);
      return;
    }

    setLoading(true);
    translateText(text, language)
      .then((res) => {
        if (active) {
          setTranslated(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [text, language]);

  return (
    <span
      className={`transition-all duration-300 ${
        loading ? "opacity-50 blur-[1px]" : "opacity-100 blur-0"
      }`}
    >
      {translated}
    </span>
  );
}
