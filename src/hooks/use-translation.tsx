"use client";

import { useEffect, useState, ReactNode } from "react";
import { useI18nStore, UI_DICTIONARY, translateText } from "@/lib/i18n";

export function useTranslation() {
  const { language } = useI18nStore();

  // Static key lookup
  const t = (key: string): string => {
    // try to find in dictionary
    const dict = UI_DICTIONARY[language] || UI_DICTIONARY["hy"] || {};
    if (dict[key]) return dict[key];
    
    // fallback to English dictionary if not found in target
    const enDict = UI_DICTIONARY["en"] || {};
    if (enDict[key]) return enDict[key];

    return key;
  };

  // Dynamic translator for raw Armenian content to chosen language
  const translate = async (text: string): Promise<string> => {
    if (!text) return "";
    if (language === "hy") return text;
    return await translateText(text, language);
  };

  return { t, language, translate };
}

interface TranslateProps {
  text: string;
  fallback?: ReactNode;
}

export function Translate({ text, fallback }: TranslateProps) {
  const { language } = useI18nStore();
  const [translated, setTranslated] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let active = true;

    if (language === "hy" || !text) {
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
      .catch((err) => {
        console.error(err);
        if (active) {
          setTranslated(text);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [text, language]);

  if (loading) {
    return <span className="opacity-60 animate-pulse">{translated || text}</span>;
  }

  return <>{translated || text}</>;
}
