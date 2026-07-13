'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { SubjectGrid } from '@/components/subject-grid'
import { LessonList } from '@/components/lesson-list'
import { LessonView } from '@/components/lesson-view'
import { ExamView } from '@/components/exam-view'
import { SettingsPanel } from '@/components/settings-panel'
import { FileExportImport } from '@/components/file-export-import'
import { LanguageSelector } from '@/components/language-selector'
import { GuidesPage } from '@/components/guides-page'
import { UniversityBook } from '@/components/university-book'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { subjects, getSubject, getLesson } from '@/lib/data/subjects'
import { useProgressStore } from '@/lib/store/progress'
import { generateUserId, generateShareCode, importSignedData } from '@/lib/data-migration'
import {
  Trophy, Flame, Star, Zap, Award, BookOpen,
  RefreshCw, Clock, Target, HelpCircle,
  Share2, FileUp, Menu
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useThemeAndFont } from '@/hooks/use-theme-font'
import { useTranslation } from '@/hooks/use-translation'
import { toast } from 'sonner'

type View =
  | { type: 'home' }
  | { type: 'subject', subjectId: string }
  | { type: 'lesson', subjectId: string, lessonId: string }
  | { type: 'exam', subjectId: string, lessonId: string }
  | { type: 'university', subjectId: string }
  | { type: 'guides' }

const AVATARS = ['🦊', '🐼', '🦁', '🐯', '🦄', '🐸', '🐵', '🐰', '🐱', '🐶',
  '🦉', '🐙', '🦋', '🐢', '🦜', '🐲', '🦕', '🐬', '🦚', '🌟']

export default function Home() {
  const [view, setView] = useState<View>({ type: 'home' })
  const [mounted, setMounted] = useState(false)
  const {
    userName, setUserName,
    totalPoints, achievements, streak,
    completedLessons, resetProgress,
    avatar, setAvatar,
    favoriteLessons, bookmarks,
    totalStudyTime, lastVisitedSubject,
    setLastVisitedSubject,
    userId, shareCode, setUserId, setShareCode,
    dailyGoal, dailyProgress, recentlyViewed,
    resetDailyProgress,
  } = useProgressStore()

  useThemeAndFont()
  const { t, tText, tLesson } = useTranslation()

  // 1. Հաշվարկները տեղափոխում ենք ամենավերև, որպեսզի հասանելի լինեն բոլոր էջերի Header-ի համար
  const { totalLessons, completedCount, studyHours, studyMinutes } = useMemo(() => {
    const total = subjects.reduce((sum, s) => sum + s.lessons.length, 0)
    const completed = Object.keys(completedLessons).filter(
      id => completedLessons[id] >= 60
    ).length
    return {
      totalLessons: total,
      completedCount: completed,
      studyHours: Math.floor(totalStudyTime / 60),
      studyMinutes: totalStudyTime % 60
    }
  }, [completedLessons, totalStudyTime])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
      resetDailyProgress()
    }, 0)
    return () => clearTimeout(timer)
  }, [resetDailyProgress])

  useEffect(() => {
    if (mounted && userName && !userId) {
      setUserId(generateUserId())
      setShareCode(generateShareCode())
    }
  }, [mounted, userName, userId, setUserId, setShareCode])

  if (!mounted) {
    return null
  }

  if (!userName) {
    return <WelcomeScreen setUserName={setUserName} setAvatar={setAvatar} avatar={avatar} />
  }

  if (view.type === 'guides') {
    return <GuidesPage onBack={() => setView({ type: 'home' })} />
  }

  if (view.type === 'university') {
    const subject = getSubject(view.subjectId)
    if (!subject) {
      setView({ type: 'home' })
      return null
    }
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 p-3 md:p-6 py-6 md:py-8">
        <UniversityBook
          subject={subject}
          onBack={() => setView({ type: 'subject', subjectId: subject.id })}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 flex flex-col">
      {/* 2. Header-ը դուրս բերեցինք հիմնական layout-ի մեջ, որպեսզի երևա բոլոր էջերում */}
      <header className="bg-white/70 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView({ type: 'home' })}>
            <div className="text-3xl filter drop-shadow-md">{avatar || '🎓'}</div>
            <div>
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
                AWESchool
              </h1>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm bg-orange-100/80 px-3 py-1.5 rounded-full shadow-inner border border-orange-200/50" title={t('stats.streak')}>
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span className="font-bold text-orange-700">{streak}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm bg-violet-100/80 px-3 py-1.5 rounded-full shadow-inner border border-violet-200/50" title={t('stats.points')}>
              <Star className="w-4 h-4 text-violet-500" />
              <span className="font-bold text-violet-700">{totalPoints}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm bg-emerald-100/80 px-3 py-1.5 rounded-full shadow-inner border border-emerald-200/50" title={t('stats.lessons')}>
              <Trophy className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-emerald-700">{completedCount}</span>
            </div>

            <FileExportImport variant="buttons" />
            <LanguageSelector />

            <Button variant="ghost" size="sm" onClick={() => setView({ type: 'guides' })} title={t('guides.title')} className="hover:bg-violet-100/50 transition-colors">
              <HelpCircle className="w-5 h-5 text-violet-600" />
            </Button>

            <Button variant="ghost" size="sm" onClick={async () => {
              try {
                toast.info(t('share.creating'))
                const summary = `🎓 AWESchool - ${userName}\n\n📊 ${t('share.summary')}:\n✅ ${t('share.completed_lessons')}: ${completedCount}\n🔥 ${t('share.streak')}: ${streak}\n⭐ ${t('share.points')}: ${totalPoints}\n🏆 ${t('share.achievements')}: ${achievements.length}\n📚 ${t('share.total_lessons')}: ${totalLessons}\n⏱️ ${t('share.study_time')}: ${studyHours}h ${studyMinutes}m`
                if (navigator.share) {
                  await navigator.share({ title: `AWESchool - ${userName}`, text: summary })
                } else {
                  await navigator.clipboard.writeText(summary)
                  toast.success(t('share.copied'))
                }
              } catch {}
            }} title={t('share.button')} className="hover:bg-blue-100/50 transition-colors">
              <Share2 className="w-5 h-5 text-blue-600" />
            </Button>

            <SettingsPanel />

            <div className="text-sm font-semibold text-slate-700 pl-2 border-l border-slate-200">
              {userName} 👋
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center gap-1 text-xs bg-orange-100/80 px-2 py-1 rounded-full border border-orange-200/50">
              <Flame className="w-3 h-3 text-orange-500 animate-pulse" />
              <span className="font-bold text-orange-700">{streak}</span>
            </div>
            <div className="flex items-center gap-1 text-xs bg-violet-100/80 px-2 py-1 rounded-full border border-violet-200/50">
              <Star className="w-3 h-3 text-violet-500" />
              <span className="font-bold text-violet-700">{totalPoints}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-slate-100/50">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl">
                <DropdownMenuItem onClick={() => setView({ type: 'guides' })} className="gap-2 font-medium cursor-pointer">
                  <HelpCircle className="h-4 w-4 text-violet-500" /> {t('guides.title')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={async () => {
                  const summary = `🎓 AWESchool - ${userName}\n\n📊 ${t('share.summary')}:\n✅ ${t('share.completed_lessons')}: ${completedCount}\n🔥 ${t('share.streak')}: ${streak}\n⭐ ${t('share.points')}: ${totalPoints}\n🏆 ${t('share.achievements')}: ${achievements.length}\n📚 ${t('share.total_lessons')}: ${totalLessons}\n⏱️ ${t('share.study_time')}: ${studyHours}h ${studyMinutes}m`
                  if (navigator.share) await navigator.share({ title: `AWESchool - ${userName}`, text: summary })
                  else { await navigator.clipboard.writeText(summary); toast.success(t('share.copied')) }
                }} className="gap-2 font-medium cursor-pointer">
                  <Share2 className="h-4 w-4 text-blue-500" /> {t('share.button')}
                </DropdownMenuItem>
                <div className="p-2 border-t mt-1">
                  <div className="mb-2"><LanguageSelector /></div>
                  <SettingsPanel />
                  <div className="mt-2 text-xs font-semibold text-center text-slate-500">{userName}</div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* 3. Էջերի ռենդերինգը ըստ ընտրված view-ի */}
      {view.type === 'home' && (
        <main className="p-3 md:p-6 py-6 md:py-8 flex-1">
          {/* Բարի գալուստի քարտ */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto mb-6 md:mb-8">
            <Card className="p-4 md:p-8 bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                    {t('home.greeting')}, {userName}! {avatar || '🌟'}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base">{t('home.subtitle')}</p>
                  <div className="flex flex-wrap gap-2 md:gap-4 mt-3 md:mt-4 text-xs md:text-sm">
                    <div className="bg-white/20 px-2 md:px-3 py-1 rounded-full">📚 {totalLessons} {t('lesson.lessons')}</div>
                    <div className="bg-white/20 px-2 md:px-3 py-1 rounded-full">✅ {completedCount} {t('lesson.completed')}</div>
                    <div className="bg-white/20 px-2 md:px-3 py-1 rounded-full">🏆 {achievements.length} {t('stats.achievements')}</div>
                    {totalStudyTime > 0 && (
                      <div className="bg-white/20 px-2 md:px-3 py-1 rounded-full">⏱️ {studyHours}h {studyMinutes}m</div>
                    )}
                  </div>
                </div>
                <div className="text-5xl md:text-7xl">🚀</div>
              </div>
            </Card>
          </motion.div>

          {/* Շարունակել ուսումը */}
          {lastVisitedSubject && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto mb-6 md:mb-8">
              <Card className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">📖</div>
                    <div>
                      <div className="text-sm text-gray-500">{t('continue_learning')}</div>
                      <div className="font-bold text-gray-800">
                        {getSubject(lastVisitedSubject)?.icon} {tText(getSubject(lastVisitedSubject)?.name || '')}
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => setView({ type: 'subject', subjectId: lastVisitedSubject })} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    {t('continue_learning')} →
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Օրական նպատակ */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto mb-6 md:mb-8">
            <Card className="p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <div className="text-sm text-gray-500">{t('daily_goal')}</div>
                    <div className="font-bold text-gray-800">{dailyProgress} / {dailyGoal} {t('lesson.lessons')}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">{Math.min(100, Math.round((dailyProgress / dailyGoal) * 100))}%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (dailyProgress / dailyGoal) * 100)}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {dailyProgress >= dailyGoal ? t('daily_goal_done') : t('daily_goal_remaining').replace('{n}', String(dailyGoal - dailyProgress))}
              </p>
            </Card>
          </motion.div>

          {/* Վերջերս դիտված դասեր */}
          {recentlyViewed.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-500" /> {t('recently_viewed')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentlyViewed.slice(0, 5).map(lessonId => {
                  for (const subject of subjects) {
                    const lesson = subject.lessons.find(l => l.id === lessonId)
                    if (lesson) {
                      const translatedLesson = tLesson(lesson)
                      return (
                        <button key={lessonId} onClick={() => setView({ type: 'lesson', subjectId: subject.id, lessonId })} className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs md:text-sm hover:bg-gray-50 hover:border-violet-300 transition-colors">
                          <span>{translatedLesson.icon || lesson.icon}</span>
                          <span className="truncate max-w-[120px]">{translatedLesson.title}</span>
                        </button>
                      )
                    }
                  }
                  return null
                })}
              </div>
            </motion.div>
          )}

          {/* Նվաճումներ */}
          {achievements.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-700 flex items-center gap-2">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-amber-500" /> {t('my_achievements')} ({achievements.length})
              </h3>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {achievements.map((ach, i) => (
                  <div key={i} className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium text-amber-800">
                    {ach}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Առարկաների ցանկ */}
          <SubjectGrid
            onSelectSubject={(subjectId) => {
              setLastVisitedSubject(subjectId)
              setView({ type: 'subject', subjectId })
            }}
            onSelectLesson={(subjectId, lessonId) => setView({ type: 'lesson', subjectId, lessonId })}
            onSelectUniversity={(subjectId) => setView({ type: 'university', subjectId })}
          />

          {/* Վիճակագրություն */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto mt-8 md:mt-12">
            <Card className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-gray-700 flex items-center gap-2">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-violet-500" /> {t('stats.title')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <StatCard icon={<BookOpen className="w-6 h-6 md:w-8 md:h-8 text-violet-500 mx-auto mb-1 md:mb-2" />} value={completedCount} label={t('stats.lessons')} bg="bg-violet-50" />
                <StatCard icon={<Flame className="w-6 h-6 md:w-8 md:h-8 text-amber-500 mx-auto mb-1 md:mb-2" />} value={streak} label={t('stats.streak')} bg="bg-amber-50" />
                <StatCard icon={<Star className="w-6 h-6 md:w-8 md:h-8 text-pink-500 mx-auto mb-1 md:mb-2" />} value={totalPoints} label={t('stats.points')} bg="bg-pink-50" />
                <StatCard icon={<Trophy className="w-6 h-6 md:w-8 md:h-8 text-green-500 mx-auto mb-1 md:mb-2" />} value={achievements.length} label={t('stats.achievements')} bg="bg-green-50" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 md:mt-4 pt-3 md:pt-4 border-t">
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">{t('stats.study_time')} {studyHours}h {studyMinutes}m</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <Target className="w-4 h-4 text-red-500" />
                  <span className="text-gray-600">{favoriteLessons.length} {t('stats.favorites')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <span className="text-gray-600">{bookmarks.length} {t('stats.bookmarks')}</span>
                </div>
              </div>

              <div className="mt-4 md:mt-6 text-center">
                <Button variant="outline" size="sm" onClick={() => {
                  if (confirm(t('confirm_reset'))) {
                    resetProgress()
                    setUserName('')
                  }
                }}>
                  <RefreshCw className="w-4 h-4 mr-2" /> {t('reset')}
                </Button>
              </div>
            </Card>
          </motion.div>
        </main>
      )}

      {view.type === 'subject' && (
        <main className="p-3 md:p-6 flex-1">
          {(() => {
            const subject = getSubject(view.subjectId)
            if (!subject) { setTimeout(() => setView({ type: 'home' }), 0); return null }
            return (
              <LessonList
                subject={subject}
                onBack={() => setView({ type: 'home' })}
                onSelectLesson={(lessonId) => setView({ type: 'lesson', subjectId: subject.id, lessonId })}
              />
            )
          })()}
        </main>
      )}

      {view.type === 'lesson' && (
        <main className="p-3 md:p-6 py-6 md:py-8 flex-1">
          {(() => {
            const subject = getSubject(view.subjectId)
            const lesson = getLesson(view.subjectId, view.lessonId)
            if (!subject || !lesson) { setTimeout(() => setView({ type: 'home' }), 0); return null }
            const { isLessonUnlocked } = useProgressStore.getState()
            const unlocked = isLessonUnlocked(subject.id, lesson.id, lesson.order)
            return (
              <LessonView
                lesson={lesson}
                subjectId={subject.id}
                isUnlocked={unlocked}
                onBack={() => setView({ type: 'subject', subjectId: subject.id })}
                onStartExam={() => setView({ type: 'exam', subjectId: subject.id, lessonId: lesson.id })}
              />
            )
          })()}
        </main>
      )}

      {view.type === 'exam' && (
        <main className="p-3 md:p-6 py-6 md:py-8 flex-1">
          {(() => {
            const subject = getSubject(view.subjectId)
            const lesson = getLesson(view.subjectId, view.lessonId)
            if (!subject || !lesson) { setTimeout(() => setView({ type: 'home' }), 0); return null }
            const nextLesson = subject.lessons.find(l => l.order === lesson.order + 1)
            return (
              <ExamView
                lesson={lesson}
                subjectId={subject.id}
                nextLessonId={nextLesson?.id}
                onCancel={() => setView({ type: 'lesson', subjectId: subject.id, lessonId: lesson.id })}
                onComplete={() => {
                  if (nextLesson) setView({ type: 'lesson', subjectId: subject.id, lessonId: nextLesson.id })
                  else setView({ type: 'subject', subjectId: subject.id })
                }}
              />
            )
          })()}
        </main>
      )}

      <footer className="mt-auto py-4 md:py-6 text-center text-xs md:text-sm text-gray-500 px-4 border-t bg-white/30 backdrop-blur-sm">
        <p>{t('footer.copyright')}</p>
        <p className="mt-1">💻 {t('footer.tagline')} 🌟</p>
      </footer>
    </div>
  )
}

function StatCard({ icon, value, label, bg }: { icon: React.ReactNode; value: number; label: string; bg: string }) {
  return (
    <div className={`text-center p-3 md:p-4 ${bg} rounded-lg shadow-sm border border-slate-100`}>
      {icon}
      <div className="text-xl md:text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs md:text-sm text-gray-600">{label}</div>
    </div>
  )
}

function WelcomeScreen({
  setUserName, setAvatar, avatar
}: {
  setUserName: (name: string) => void
  setAvatar: (avatar: string) => void
  avatar?: string
}) {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(avatar || '🦊')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleStart = () => {
    if (name.trim()) {
      setAvatar(selectedAvatar)
      setUserName(name.trim())
    }
  }

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const result = importSignedData(content)
        if (result.success) {
          toast.success(t('file.imported'))
          setTimeout(() => window.location.reload(), 500)
        } else {
          toast.error(result.error || t('file.invalid'))
        }
      } catch {
        toast.error(t('file.read_error'))
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-200 via-purple-100 to-pink-100 relative overflow-hidden"
      style={{ backgroundImage: 'radial-gradient(circle at 50% -20%, #d8b4fe 0%, transparent 50%), radial-gradient(circle at 120% 80%, #93c5fd 0%, transparent 50%)' }}>
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>
      
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-pink-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] bg-indigo-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="max-w-md w-full relative z-10"
      >
        <Card className="p-6 md:p-8 text-center pt-8">
          <div className="text-7xl mb-4">🎓</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            AWESchool
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-6">
            {t('welcome.desc')}
          </p>

          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-3">{t('welcome.choose_avatar')}</div>
            <div className="grid grid-cols-5 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setSelectedAvatar(av)}
                  className={`text-3xl p-2 rounded-lg transition-all ${
                    selectedAvatar === av
                      ? 'bg-violet-100 ring-2 ring-violet-500 scale-110'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Input
              placeholder={t('welcome.name_placeholder')}
              className="text-center text-base md:text-lg py-4 md:py-6"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleStart()
              }}
              autoFocus
            />
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-base md:text-lg py-4 md:py-6"
              onClick={handleStart}
              disabled={!name.trim()}
            >
              {t('welcome.start')} 🚀
            </Button>

            <Button
              variant="outline"
              type="button"
              className="w-full text-sm border-violet-300 hover:bg-violet-50"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileUp className="w-4 h-4 mr-1" />
              {t('welcome.restore_file')}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileImport}
              className="hidden"
            />
          </div>

          {/* 4. Այստեղ tText-ի փոխարեն օգտագործեցի սովորական t(), որպեսզի ReferenceError չտա */}
          <div className="mt-6 grid grid-cols-4 gap-2 text-xs text-gray-500">
            <div className="p-2 bg-violet-50 rounded">
              <div className="text-lg">📚</div>
              <div>200+ {t('lesson.lessons')}</div>
            </div>
            <div className="p-2 bg-amber-50 rounded">
              <div className="text-lg">🏆</div>
              <div>🏆 {t('stats.achievements')}</div>
            </div>
            <div className="p-2 bg-pink-50 rounded">
              <div className="text-lg">🌍</div>
              <div>{t('mode.languages || "Multi-lang"')}</div>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <div className="text-lg">🎓</div>
              <div>🎓 2 {t('mode.school')}/{t('mode.university')}</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
