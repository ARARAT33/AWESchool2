'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/dialog'
import { Lock, CheckCircle2, Star, ChevronRight, Search, BookOpen,
  GraduationCap, School, BookMarked } from 'lucide-react'
import { subjects, searchLessons, getSubject } from '@/lib/data/subjects'
import { useProgressStore } from '@/lib/store/progress'
import { useTranslation } from '@/hooks/use-translation'
import { translateSubjectName, translateSubjectDescription } from '@/lib/content-translations'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface SubjectGridProps {
  onSelectSubject: (subjectId: string) => void
  onSelectLesson?: (subjectId: string, lessonId: string) => void
  onSelectUniversity?: (subjectId: string) => void
}

export function SubjectGrid({ onSelectSubject, onSelectLesson, onSelectUniversity }: SubjectGridProps) {
  const [modeDialogSubject, setModeDialogSubject] = useState<string | null>(null)
  const { getSubjectProgress, getLessonScore } = useProgressStore()
  const { t, language, tText, tSubject, tLesson } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const categoryLabels: Record<string, { title: string; icon: string; description: string }> = {
    core: { title: t('subjects.core'), icon: '📚', description: '' },
    science: { title: t('subjects.science'), icon: '🔬', description: '' },
    language: { title: t('subjects.language'), icon: '📖', description: '' },
    computer: { title: t('subjects.computer'), icon: '💻', description: '' },
    advanced: { title: t('subjects.advanced'), icon: '🚀', description: '' },
    art: { title: t('subjects.art') || (t('subjects.language') + ' 🎨'), icon: '🎨', description: '' },
    business: { title: t('subjects.business') || '💼', icon: '💼', description: '' },
  }

  const categories = ['core', 'science', 'language', 'computer', 'advanced']

  // Որոնման արդյունքներ
  const searchResults = searchQuery.trim().length > 1
    ? searchLessons(searchQuery).slice(0, 10)
    : []

  return (
    <div className="max-w-6xl mx-auto">
      {/* Որոնման բար */}
      <div className="mb-8 flex gap-2">
        <Input
          placeholder={t('search.placeholder') + '...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSearch(true)}
          className="text-base py-3"
        />
        {searchQuery && (
          <Button variant="outline" onClick={() => { setSearchQuery(''); setShowSearch(false) }}>
            {tText('Մաքրել')}
          </Button>
        )}
      </div>

      {/* Որոնման արդյունքներ */}
      {showSearch && searchQuery.trim().length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-lg font-bold mb-3 text-gray-700 flex items-center gap-2">
            <Search className="w-5 h-5" />
            {tText('Որոնման արդյունքներ')} ({searchResults.length})
          </h3>
          {searchResults.length > 0 ? (
            <div className="grid gap-2">
              {searchResults.map((result) => {
                const score = getLessonScore(result.id)
                const translatedLesson = tLesson(result)
                const translatedSubject = tSubject(result.subject)
                return (
                  <Card
                    key={result.id}
                    className="p-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      if (onSelectLesson) {
                        onSelectLesson(result.subject.id, result.id)
                      } else {
                        onSelectSubject(result.subject.id)
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{translatedLesson.icon || result.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 truncate">{translatedLesson.title}</div>
                        <div className="text-sm text-gray-500">
                          {translatedSubject.icon} {translatedSubject.name}
                        </div>
                      </div>
                      {score !== null && (
                        <div className="text-sm font-bold text-green-600">
                          {score}%
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="p-6 text-center text-gray-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              {t('lang.no_results')}
            </Card>
          )}
        </motion.div>
      )}

      {/* Առարկաների կատեգորիաներով */}
      <div className="space-y-12">
        {categories.map((category) => {
          const categorySubjects = subjects.filter(s => s.category === category)
          if (categorySubjects.length === 0) return null

          const catInfo = categoryLabels[category]

          return (
            <section key={category}>
              <h2 className="text-xl md:text-2xl font-bold mb-1 text-gray-800 flex items-center gap-2">
                <span>{catInfo.icon}</span>
                {catInfo.title}
              </h2>
              <p className="text-gray-600 mb-4 text-sm">{catInfo.description}</p>

              <div className={`grid gap-4 md:gap-6 ${
                category === 'core' ? 'grid-cols-1 md:grid-cols-3' :
                category === 'advanced' ? 'grid-cols-1 md:grid-cols-2' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {categorySubjects.map((subject, index) => {
                  const progress = getSubjectProgress(subject.id, subject.lessons.length)
                  const completed = subject.lessons.filter(
                    l => (getLessonScore(l.id) ?? 0) >= 60
                  ).length

                  // Թարգմանված անուն և նկարագրություն
                  const translatedName = tText(subject.name)
                  const translatedDesc = tText(subject.description)

                  return (
                    <motion.div
                      key={subject.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setModeDialogSubject(subject.id)}
                      className="cursor-pointer"
                    >
                      <Card className={`p-4 md:p-6 bg-gradient-to-br ${subject.color} text-white border-0 hover:shadow-2xl transition-shadow shadow-lg h-full relative overflow-hidden`}>
                        {/* Դեկորատիվ ֆոնային էլեմենտ */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10" />

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-3 md:mb-4">
                            <motion.div
                              animate={{ rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 3, repeat: Infinity, delay: index * 0.1 }}
                              className="text-4xl md:text-5xl"
                            >
                              {subject.icon}
                            </motion.div>
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white/70" />
                          </div>
                          <h3 className="text-lg md:text-xl font-bold mb-1">{translatedName}</h3>
                          <p className="text-white/90 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{translatedDesc}</p>
                          <div className="text-xs md:text-sm mb-1 md:mb-2">
                            <span className="font-bold text-lg">{subject.lessons.length}</span> {t('lesson.lessons')}
                          </div>
                          <Progress value={progress} className="bg-white/20 mb-1 md:mb-2 h-1.5" />
                          <div className="flex justify-between text-xs text-white/90">
                            <span>{completed} {t('lesson.completed')}</span>
                            <span className="font-bold">{progress}%</span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {/* Ուսումնական ռեժիմի ընտրության դիալոգ */}
      <Dialog open={!!modeDialogSubject} onOpenChange={(open) => !open && setModeDialogSubject(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {modeDialogSubject && getSubject(modeDialogSubject)?.icon}
              {modeDialogSubject && tText(getSubject(modeDialogSubject)?.name || '')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {/* Դպրոցական տարբերակ */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => {
                if (modeDialogSubject) {
                  onSelectSubject(modeDialogSubject)
                  setModeDialogSubject(null)
                }
              }}
              className="w-full p-4 rounded-xl border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                  <School className="w-6 h-6 text-violet-600" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800">🎒 {t('mode.school')}</div>
                  <div className="text-sm text-gray-500">
                    {t('mode.school_desc')}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.button>

            {/* Համալսարանային տարբերակ */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => {
                if (modeDialogSubject) {
                  if (onSelectUniversity) {
                    onSelectUniversity(modeDialogSubject)
                  } else {
                    toast.info(t('mode.university'))
                  }
                  setModeDialogSubject(null)
                }
              }}
              className="w-full p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800">🎓 {t('mode.university')}</div>
                  <div className="text-sm text-gray-500">
                    {t('mode.university_desc')}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    📖 10 {t('university.chapter')} • 120+ {t('university.page')} • {t('university.pass_threshold')}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.button>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
              💡 {t('mode.school')} - {t('mode.school_desc')}. {t('mode.university')} - {t('mode.university_desc')}.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
