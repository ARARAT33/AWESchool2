import { useState, useMemo } from "react";
import { LANGUAGES } from "@/lib/languages";
import { useI18nStore } from "@/lib/i18n";
import { Globe, Search, ChevronDown } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage } = useI18nStore();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = useMemo(() => {
    return LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  }, [language]);

  const filtered = useMemo(() => {
    if (!search.trim()) return LANGUAGES;
    const s = search.toLowerCase();
    return LANGUAGES.filter(
      (l) => l.name.toLowerCase().includes(s) || l.code.toLowerCase().includes(s)
    );
  }, [search]);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setOpen(!open)}
        id="lang-select-btn"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-violet-50 text-gray-700 font-medium rounded-xl border border-gray-200 transition-all text-xs md:text-sm shadow-sm"
      >
        <Globe className="w-3.5 h-3.5 text-violet-600 animate-spin-slow" />
        <span>{selected.flag} {selected.name.split(" ")[0]}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 max-h-80 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden flex flex-col z-50 animate-fade-in">
            {/* Search */}
            <div className="p-2 border-b border-gray-100 flex items-center gap-1.5 bg-gray-50">
              <Search className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
              <input
                type="text"
                placeholder="Search language..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs bg-transparent border-0 outline-none focus:ring-0 p-1 text-gray-800"
              />
            </div>

            {/* List */}
            <div className="overflow-y-auto flex-1 max-h-60 py-1">
              {filtered.length > 0 ? (
                filtered.map((l) => (
                  <button
                    key={l.code}
                    id={`lang-opt-${l.code}`}
                    onClick={() => {
                      setLanguage(l.code);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs md:text-sm hover:bg-violet-50 transition-colors ${
                      language === l.code ? "bg-violet-50 text-violet-700 font-semibold" : "text-gray-700"
                    }`}
                  >
                    <span>{l.flag} {l.name}</span>
                    {language === l.code && <span className="w-1.5 h-1.5 bg-violet-600 rounded-full" />}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-xs text-gray-400 text-center">No languages found</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
