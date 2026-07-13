'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { useTranslation } from '@/hooks/use-translation'
import {
  Lock, CheckCircle2, Play, Star, ArrowLeft,
  Search, Filter, Bookmark, BookmarkCheck
} from 'lucide-react'
import { Subject } from '@/lib/types'
import { useProgressStore } from '@/lib/store/progress'
import { motion } from 'framer-motion'
import { useDeviceDetect } from '@/hooks/use-device-detect'

interface LessonListProps {
  subject: Subject
  onBack: () => void
  onSelectLesson: (lessonId: string) => void
}

type FilterType = 'all' | 'completed' | 'available' | 'locked' | 'favorites'

export function LessonList({ subject, onBack, onSelectLesson }: LessonListProps) {
  const { isLessonUnlocked, getLessonScore, getSubjectProgress, isFavorite } = useProgressStore()
  const { t, tSubject, tText } = useTranslation()
  const translatedSubject = tSubject(subject)
  const [showAll, setShowAll] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const device = useDeviceDetect()

  const filterOptions: { value: FilterType; label: string; icon?: string }[] = [
    { value: 'all', label: t('filter.all') },
    { value: 'completed', label: t('filter.completed'), icon: '✅' },
    { value: 'available', label: t('filter.available'), icon: '▶️' },
    { value: 'locked', label: t('filter.locked'), icon: '🔒' },
    { value: 'favorites', label: t('filter.favorites'), icon: '⭐' },
  ]

  const progress = getSubjectProgress(subject.id, subject.lessons.length)
  const completedCount = subject.lessons.filter(l => (getLessonScore(l.id) ?? 0) >= 60).length

  // Ֆիլտրել դասերը (թարգմանված)
  const allLessons = translatedSubject.lessons
  const filteredLessons = allLessons.filter(lesson => {
    // Որոնման ֆիլտր
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      if (!lesson.title.toLowerCase().includes(query) &&
          !lesson.subtitle?.toLowerCase().includes(query)) {
        return false
      }
    }

    // Կատեգորիայի ֆիլտր
    if (filter === 'completed') {
      return (getLessonScore(lesson.id) ?? 0) >= 60
    }
    if (filter === 'available') {
      return isLessonUnlocked(subject.id, lesson.id, lesson.order) &&
             (getLessonScore(lesson.id) ?? 0) < 60
    }
    if (filter === 'locked') {
      return !isLessonUnlocked(subject.id, lesson.id, lesson.order)
    }
    if (filter === 'favorites') {
      return isFavorite(lesson.id)
    }
    return true
  })

  const visibleLessons = showAll ? filteredLessons : filteredLessons.slice(0, 30)

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2" size="sm">
        <ArrowLeft className="w-4 h-4 mr-2" />
        ← {t('subjects.core').split(' ')[0]}
      </Button>

      {/* Առարկայի վերնագիր */}
      <Card className={`p-4 md:p-6 mb-6 bg-gradient-to-r ${subject.color} text-white border-0`}>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="text-4xl md:text-6xl">{subject.icon}</div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-3xl font-bold">{translatedSubject.name}</h1>
            <p className="text-white/90 text-sm md:text-base">{translatedSubject.description}</p>
            <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-3 text-xs md:text-sm">
              <div>
                <span className="font-bold">{subject.lessons.length}</span> {t('lesson.lessons')}
              </div>
              <div>
                <span className="font-bold">{completedCount}</span> {t('lesson.completed')}
              </div>
              <div>
                <span className="font-bold">{progress}%</span>
              </div>
            </div>
          </div>
        </div>
        <Progress value={progress} className="mt-3 md:mt-4 bg-white/20 h-1.5" />
      </Card>

      {/* Որոնման և ֆիլտրի բար */}
      <div className="mb-4 space-y-2">
        <Input
          placeholder={t('search.placeholder') + '...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-sm"
        />
        <div className="flex flex-wrap gap-1 md:gap-2">
          {filterOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={filter === opt.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(opt.value)}
              className={`text-xs ${filter === opt.value ? 'bg-violet-600' : ''}`}
            >
              {opt.icon && <span className="mr-1">{opt.icon}</span>}
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Դասերի ցուցակ */}
      {visibleLessons.length > 0 ? (
        <div className="grid gap-2 md:gap-3">
          {visibleLessons.map((lesson, index) => {
            const unlocked = isLessonUnlocked(subject.id, lesson.id, lesson.order)
            const score = getLessonScore(lesson.id)
            const completed = score !== null && score >= 60
            const perfectScore = score === 100
            const favorite = isFavorite(lesson.id)

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.02, 0.5) }}
              >
                <Card
                  className={`p-3 md:p-4 transition-all ${
                    unlocked
                      ? 'hover:shadow-md hover:border-violet-300 cursor-pointer'
                      : 'opacity-60 cursor-not-allowed'
                  } ${completed ? 'border-green-200 bg-green-50/30' : ''}`}
                  onClick={() => unlocked && onSelectLesson(lesson.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {completed ? (
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center">
                          {perfectScore ? (
                            <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-yellow-500" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                          )}
                        </div>
                      ) : unlocked ? (
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-violet-100 flex items-center justify-center">
                          <Play className="w-4 h-4 md:w-5 md:h-5 text-violet-600 fill-violet-600" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <Lock className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-violet-600">
                          {t('lesson.lessons')} {lesson.order}
                        </span>
                        {completed && (
                          <Badge variant="secondary" className="text-xs">
                            {score}%
                          </Badge>
                        )}
                        {favorite && (
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-800 truncate text-sm md:text-base">
                        {lesson.icon} {lesson.title}
                      </h3>
                      {lesson.subtitle && (
                        <p className="text-xs md:text-sm text-gray-500 truncate">{lesson.subtitle}</p>
                      )}
                    </div>

                    <div className="text-right text-xs md:text-sm text-gray-500 flex-shrink-0">
                      <div>{lesson.duration} {tText('ր')}</div>
                      <div className="text-xs">{lesson.quiz.length} {t('exam.question')}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <Card className="p-8 text-center text-gray-500">
          <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>{tText('Այս ֆիլտրով դասեր չկան:')}</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => { setFilter('all'); setSearchQuery('') }}>
            {tText('Մաքրել ֆիլտրերը')}
          </Button>
        </Card>
      )}

      {!showAll && filteredLessons.length > 30 && (
        <div className="text-center mt-6">
          <Button onClick={() => setShowAll(true)} variant="outline" size="lg">
            {tText('Ցույց տալ բոլոր')} {filteredLessons.length} {t('lesson.lessons')}
          </Button>
        </div>
      )}
    </div>
  )
}
