'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Globe, Search, Check } from 'lucide-react'
import { LANGUAGES, getLanguageByCode } from '@/lib/i18n'
import { useProgressStore } from '@/lib/store/progress'
import { useTranslation } from '@/hooks/use-translation'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export function LanguageSelector() {
  const { language, setLanguage } = useProgressStore()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const currentLang = getLanguageByCode(language) || LANGUAGES[0]

  const filteredLanguages = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
    l.code.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (code: string) => {
    setLanguage(code)
    const lang = getLanguageByCode(code)
    toast.success(`${lang?.nativeName} ${lang?.flag}`)
    setOpen(false)
    // No reload needed — the language change propagates through the Zustand
    // store and all components re-render with the new translations.
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 px-2">
          <span className="text-lg">{currentLang.flag}</span>
          <span className="hidden md:inline text-xs font-bold">{currentLang.code.toUpperCase()}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {t('lang.select')} ({LANGUAGES.length}+)
          </DialogTitle>
        </DialogHeader>

        <Input
          placeholder={t('lang.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-2"
        />

        <div className="max-h-[50vh] overflow-y-auto space-y-1">
          {filteredLanguages.map((lang) => (
            <motion.button
              key={lang.code + lang.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                language === lang.code
                  ? 'bg-violet-100 border-2 border-violet-400'
                  : 'hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{lang.nativeName}</div>
                <div className="text-xs text-gray-500">{lang.name}</div>
              </div>
              {language === lang.code && (
                <Check className="w-4 h-4 text-violet-600 flex-shrink-0" />
              )}
            </motion.button>
          ))}
          {filteredLanguages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              {t('lang.no_results')}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
