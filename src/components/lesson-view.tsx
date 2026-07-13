'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Volume2, VolumeX, Pause, Play, ArrowLeft, ArrowRight,
  BookOpen, Lightbulb, CheckCircle, ExternalLink, Clock,
  ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Star,
  Video, FileText, ListChecks, BookMarked, Maximize2, Minimize2,
  Sparkles, Info
} from 'lucide-react'
import { Lesson } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgressStore } from '@/lib/store/progress'
import { useDeviceDetect } from '@/hooks/use-device-detect'
import { useTranslation } from '@/hooks/use-translation'

interface LessonViewProps {
  lesson: Lesson
  subjectId: string
  onStartExam: () => void
  onBack: () => void
  isUnlocked: boolean
}

type Page = 'intro' | number | 'funFact' | 'summary' | 'keyTerms' | 'exercises'

export function LessonView({
  lesson, subjectId, onStartExam, onBack, isUnlocked
}: LessonViewProps) {
  const [currentPage, setCurrentPage] = useState<Page>('intro')
  const [fullscreen, setFullscreen] = useState(false)
  const { toggleFavorite, isFavorite, toggleBookmark, isBookmarked, addStudyTime } = useProgressStore()
  const device = useDeviceDetect()
  const { t, tLesson, tText } = useTranslation()

  // Թարգմանել դասը ընթացիկ լեզվով
  const translatedLesson = tLesson(lesson)

  // Ստեղծել էջերի ցանկը
  const pages: { id: Page; title: string; icon: string }[] = [
    { id: 'intro', title: t('lesson.intro'), icon: '📖' },
    ...translatedLesson.content.sections.map((_, i) => ({
      id: i as Page,
      title: `${i + 1}`,
      icon: `${i + 1}`,
    })),
    ...(translatedLesson.content.funFact ? [{ id: 'funFact' as Page, title: t('lesson.fun_fact'), icon: '💡' }] : []),
    ...(translatedLesson.content.keyTerms && translatedLesson.content.keyTerms.length > 0
      ? [{ id: 'keyTerms' as Page, title: t('lesson.key_points'), icon: '📚' }]
      : []),
    ...(translatedLesson.content.exercises && translatedLesson.content.exercises.length > 0
      ? [{ id: 'exercises' as Page, title: '✏️', icon: '✏️' }]
      : []),
    { id: 'summary', title: t('lesson.summary'), icon: '📋' },
  ]

  const currentIndex = pages.findIndex(p => p.id === currentPage)
  const totalPages = pages.length

  // Ուսումնական ժամանակի հաշվարկ
  useEffect(() => {
    const startTime = Date.now()
    return () => {
      const minutes = Math.round((Date.now() - startTime) / 60000)
      if (minutes > 0) {
        addStudyTime(lesson.id, minutes)
      }
    }
  }, [lesson.id, addStudyTime])

  const goNextPage = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentPage(pages[currentIndex + 1].id)
      // Սքրոլ վերև
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goPrevPage = () => {
    if (currentIndex > 0) {
      setCurrentPage(pages[currentIndex - 1].id)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!isUnlocked) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <Card className="p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2">{tText('Այս դասը կողպված է')}</h2>
          <p className="text-gray-600 mb-6">
            {t('exam.need_60')}
          </p>
          <Button onClick={onBack}>{t('back_to_subjects')}</Button>
        </Card>
      </div>
    )
  }

  const favorite = isFavorite(lesson.id)
  const bookmarked = isBookmarked(lesson.id)
  const progressPercent = ((currentIndex + 1) / totalPages) * 100

  return (
    <div className={`max-w-4xl mx-auto px-4 ${fullscreen ? 'fixed inset-0 bg-white z-50 overflow-y-auto pt-4 pb-20' : ''}`}>
      {/* Վերնագիր */}
      <div className="mb-4 flex items-start justify-between gap-2 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" onClick={onBack} size="sm" className="-ml-2">
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">{t('back_to_subjects')}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFullscreen(!fullscreen)}
              title={fullscreen ? tText('Դուրս գալ լիաէկրանից') : tText('Լիաէկրան')}
            >
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFavorite(lesson.id)}
              title={t('stats.favorites')}
            >
              <Star className={`w-4 h-4 ${favorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleBookmark(lesson.id)}
              title={t('stats.bookmarks')}
            >
              {bookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-violet-600" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl">{lesson.icon}</span>
            <div className="min-w-0">
              <h1 className="text-xl md:text-3xl font-bold text-gray-800 truncate">{translatedLesson.title}</h1>
              {translatedLesson.subtitle && (
                <p className="text-gray-600 text-sm md:text-base">{translatedLesson.subtitle}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {lesson.duration} {tText('ր')}
          </Badge>
        </div>
      </div>

      {/* Առաջընթացի գծիկ */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-violet-600 h-2 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {currentIndex + 1}/{totalPages}
        </span>
      </div>

      {/* Էջերի նավիգացիա - միայն desktop-ում */}
      {!device.isMobile && (
        <div className="mb-4 flex flex-wrap gap-1">
          {pages.map((p, i) => (
            <button
              key={String(p.id)}
              onClick={() => setCurrentPage(p.id)}
              className={`px-2 py-1 rounded text-xs transition-all ${
                i === currentIndex
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {p.icon}
            </button>
          ))}
        </div>
      )}

      {/* Հիմնական բովանդակություն - էջային */}
      <AnimatePresence mode="wait">
        <motion.div
          key={String(currentPage)}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-4 md:p-8 mb-4 min-h-[300px]">
            {/* Ներածություն */}
            {currentPage === 'intro' && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-violet-600" />
                  <h2 className="text-xl md:text-2xl font-semibold text-violet-800">{t('lesson.intro')}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">{translatedLesson.content.intro}</p>
                {translatedLesson.content.didYouKnow && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700 font-medium mb-1">
                      <Info className="w-4 h-4" />
                      {tText('Գիտեի՞ր որ')}
                    </div>
                    <p className="text-blue-800">{translatedLesson.content.didYouKnow}</p>
                  </div>
                )}
                {translatedLesson.content.realLifeExample && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 font-medium mb-1">
                      <Sparkles className="w-4 h-4" />
                      {tText('Իրական կյանքում')}
                    </div>
                    <p className="text-green-800">{translatedLesson.content.realLifeExample}</p>
                  </div>
                )}
              </div>
            )}

            {/* Բաժիններ */}
            {typeof currentPage === 'number' && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center font-bold text-violet-600">
                    {currentPage + 1}
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex-1">
                    {translatedLesson.content.sections[currentPage].heading}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                  {translatedLesson.content.sections[currentPage].body}
                </p>

                {translatedLesson.content.sections[currentPage].visual && (
                  <div className="my-4 p-4 md:p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 text-center">
                    <div className="text-4xl md:text-5xl mb-2">{translatedLesson.content.sections[currentPage].visual!.emoji}</div>
                    <p className="text-sm text-gray-600">{translatedLesson.content.sections[currentPage].visual!.description}</p>
                  </div>
                )}

                {translatedLesson.content.sections[currentPage].codeBlock && (
                  <div className="my-4 p-4 bg-gray-900 rounded-lg overflow-x-auto">
                    <pre className="text-green-400 text-sm font-mono">
                      <code>{translatedLesson.content.sections[currentPage].codeBlock}</code>
                    </pre>
                  </div>
                )}

                {translatedLesson.content.sections[currentPage].keyPoints && (
                  <div className="my-4 p-4 bg-violet-50 border border-violet-200 rounded-lg">
                    <div className="font-semibold text-violet-800 mb-2 flex items-center gap-2">
                      <ListChecks className="w-4 h-4" />
                      {t('lesson.key_points')}
                    </div>
                    <ul className="space-y-1">
                      {translatedLesson.content.sections[currentPage].keyPoints!.map((point, i) => (
                        <li key={i} className="text-violet-900 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0 mt-1" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {translatedLesson.content.sections[currentPage].example && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 font-medium text-sm mb-1">
                      <CheckCircle className="w-4 h-4" />
                      {tText('Օրինակ')}
                    </div>
                    <p className="text-green-800">{translatedLesson.content.sections[currentPage].example}</p>
                  </div>
                )}
              </div>
            )}

            {/* Հետաքրքիր փաստ */}
            {currentPage === 'funFact' && translatedLesson.content.funFact && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h2 className="text-xl md:text-2xl font-semibold text-amber-800">💡 {t('lesson.fun_fact')}</h2>
                </div>
                <div className="p-4 md:p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-900 text-base md:text-lg leading-relaxed">{translatedLesson.content.funFact}</p>
                </div>
              </div>
            )}

            {/* Հիմնական տերմիններ */}
            {currentPage === 'keyTerms' && translatedLesson.content.keyTerms && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookMarked className="w-5 h-5 text-violet-600" />
                  <h2 className="text-xl md:text-2xl font-semibold text-violet-800">📚 {t('lesson.key_points')}</h2>
                </div>
                <div className="space-y-3">
                  {translatedLesson.content.keyTerms.map((term, i) => (
                    <div key={i} className="p-3 bg-violet-50 border border-violet-200 rounded-lg">
                      <div className="font-bold text-violet-800">{term.term}</div>
                      <div className="text-violet-700 text-sm mt-1">{term.definition}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Վարժություններ */}
            {currentPage === 'exercises' && translatedLesson.content.exercises && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl md:text-2xl font-semibold text-green-800">✏️ {tText('Գործնական վարժություններ')}</h2>
                </div>
                <div className="space-y-3">
                  {translatedLesson.content.exercises.map((exercise, i) => (
                    <div key={i} className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-green-900">{exercise}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ամփոփում */}
            {currentPage === 'summary' && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl md:text-2xl font-semibold text-emerald-800">📋 {t('lesson.summary')}</h2>
                </div>
                <div className="p-4 md:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                  <p className="text-emerald-900 text-base md:text-lg leading-relaxed">{translatedLesson.content.summary}</p>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Էջերի նավիգացիա - ներքևի */}
      <div className="flex items-center justify-between mb-6 gap-2">
        <Button
          variant="outline"
          onClick={goPrevPage}
          disabled={currentIndex === 0}
          size="sm"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">{t('lesson.prev')}</span>
        </Button>

        <div className="flex gap-1">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(pages[i].id)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-violet-600 w-6' : 'bg-gray-300'
              }`}
              aria-label={`${t('university.page')} ${i + 1}`}
            />
          ))}
        </div>

        <Button
          variant={currentIndex === totalPages - 1 ? 'default' : 'outline'}
          onClick={currentIndex === totalPages - 1 ? onStartExam : goNextPage}
          size="sm"
          className={currentIndex === totalPages - 1 ? 'bg-violet-600 hover:bg-violet-700' : ''}
        >
          {currentIndex === totalPages - 1 ? (
            <>
              <span className="hidden sm:inline">{t('lesson.start_exam')}</span>
              <span className="sm:hidden">{t('university.test')}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              <span className="hidden sm:inline">{t('lesson.next')}</span>
              <span className="sm:hidden">→</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>

      {/* Տեսանյութերի և հղումների բաժին - միայն վերջին էջում */}
      {currentPage === 'summary' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Տեսանյութեր */}
          {lesson.videos && lesson.videos.length > 0 && (
            <Card className="p-4 md:p-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500" />
                📹 {tText('Տեսանյութեր')}
              </h3>
              <div className="grid gap-2">
                {lesson.videos.map((video, i) => (
                  <a
                    key={i}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-red-900 text-sm truncate">{video.title}</div>
                      <div className="text-xs text-red-600">
                        {video.platform} • {video.duration}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-red-400 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </Card>
          )}

          {/* Օգտակար հղումներ */}
          {lesson.usefulLinks && lesson.usefulLinks.length > 0 && (
            <Card className="p-4 md:p-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-blue-500" />
                🔗 {tText('Օգտակար հղումներ')}
              </h3>
              <div className="grid gap-2">
                {lesson.usefulLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-blue-900 text-sm">{link.title}</div>
                      {link.description && (
                        <div className="text-xs text-blue-600 mt-0.5">{link.description}</div>
                      )}
                    </div>
                    <ExternalLink className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                  </a>
                ))}
              </div>
            </Card>
          )}

          {/* Քննության սկսման կոճակ */}
          <div className="text-center py-4">
            <Button
              onClick={onStartExam}
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg"
            >
              {t('lesson.start_exam')} ({lesson.quiz.length} {t('exam.question')})
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              {t('exam.need_60')}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
