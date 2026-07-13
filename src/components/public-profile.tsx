'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Trophy, Flame, Star, BookOpen, Clock, Award, Target,
  TrendingUp, Calendar, Download, ArrowLeft, Share2, User
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useProgressStore } from '@/lib/store/progress'
import { toast } from 'sonner'
import { useTranslation } from '@/hooks/use-translation'

interface PublicProfileProps {
  onBack: () => void
  onImport?: () => void
}

export function PublicProfile({ onBack, onImport }: PublicProfileProps) {
  const {
    userName, avatar, userId, shareCode, createdAt,
    totalPoints, achievements, completedLessons, streak,
    totalStudyTime, favoriteLessons, bookmarks,
    dailyGoal, dailyProgress, lastGoalDate,
  } = useProgressStore()
  const { t, tText, language } = useTranslation()

  const completedCount = Object.keys(completedLessons).filter(
    id => completedLessons[id] >= 60
  ).length

  const studyHours = Math.floor(totalStudyTime / 60)
  const studyMinutes = totalStudyTime % 60

  // Մասնագիտական մակարդակ հաշվել
  const level = Math.floor(completedCount / 10) + 1
  const levelProgress = (completedCount % 10) * 10

  // Մակարդակի անվանում
  const getLevelName = (lvl: number) => {
    if (lvl >= 20) return tText('Վարպետ 👑')
    if (lvl >= 15) return tText('Փորձագետ 🎓')
    if (lvl >= 10) return tText('Առաջադիմող 🚀')
    if (lvl >= 5) return tText('Աշակերտ 📚')
    if (lvl >= 3) return tText('Սկսնակ 🌱')
    return tText('Նորեկ ⭐')
  }

  const handleShare = async () => {
    const url = `${window.location.origin}?u=${shareCode}`
    try {
      if (navigator.share) {
        await navigator.share({
          title: tText(`${userName}ի ուսումնական պրոֆիլը`),
          text: tText(`Տեսեք ${userName}ի առաջընթարը AWESchool-ում`),
          url: url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success(t('share.copied'))
      }
    } catch (err) {
      // user cancelled
    }
  }

  // Ամսաթվի ձևաչափ
  const formatDate = (dateStr: string) => {
    if (!dateStr) return tText('Այսօր')
    try {
      const date = new Date(dateStr)
      const localeMap: Record<string, string> = {
        hy: 'hy-AM', en: 'en-US', ru: 'ru-RU', es: 'es-ES', fr: 'fr-FR',
        de: 'de-DE', it: 'it-IT', pt: 'pt-PT', zh: 'zh-CN', ja: 'ja-JP',
        ko: 'ko-KR', ar: 'ar-SA', tr: 'tr-TR', fa: 'fa-IR', hi: 'hi-IN',
      }
      const locale = localeMap[language] || 'en-US'
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  // Օրական նպատակի տոկոս
  const dailyGoalPercent = dailyGoal > 0 ? Math.min(100, (dailyProgress / dailyGoal) * 100) : 0
  const isToday = lastGoalDate === new Date().toDateString()

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {tText('Հետ')}
        </Button>

        {/* Գլխավոր պրոֆիլ քարտ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 md:p-8 bg-gradient-to-br from-violet-600 to-purple-600 text-white border-0 mb-6">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="text-6xl md:text-7xl">{avatar || '🎓'}</div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold">{userName}</h1>
                <p className="text-white/90 text-sm md:text-base mt-1">
                  {getLevelName(level)} • {tText('Մակարդակ')} {level}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-white/20 text-white border-0">
                    ID: {userId}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0">
                    {tText('Կոդ')}: {shareCode}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(createdAt)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Մակարդակի առաջընթաց */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{tText('Մակարդակ')} {level}</span>
                <span>{levelProgress}% → {tText('Մակարդակ')} {level + 1}</span>
              </div>
              <Progress value={levelProgress} className="bg-white/20 h-2" />
            </div>

            {/* Կիսման կոճակներ */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <Button
                onClick={handleShare}
                size="sm"
                className="bg-white text-violet-600 hover:bg-white/90"
              >
                <Share2 className="w-4 h-4 mr-1" />
                {tText('Կիսվել պրոֆիլով')}
              </Button>
              {onImport && (
                <Button
                  onClick={onImport}
                  size="sm"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  <Download className="w-4 h-4 mr-1" />
                  {t('file.imported').replace('!', '') + '...'}
                </Button>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Վիճակագրություն */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <StatCard
            icon={<BookOpen className="w-6 h-6 md:w-8 md:h-8 text-violet-500 mx-auto mb-1 md:mb-2" />}
            value={completedCount}
            label={t('stats.lessons')}
            bg="bg-violet-50"
          />
          <StatCard
            icon={<Flame className="w-6 h-6 md:w-8 md:h-8 text-amber-500 mx-auto mb-1 md:mb-2" />}
            value={streak}
            label={t('stats.streak')}
            bg="bg-amber-50"
          />
          <StatCard
            icon={<Star className="w-6 h-6 md:w-8 md:h-8 text-pink-500 mx-auto mb-1 md:mb-2" />}
            value={totalPoints}
            label={t('stats.points')}
            bg="bg-pink-50"
          />
          <StatCard
            icon={<Trophy className="w-6 h-6 md:w-8 md:h-8 text-green-500 mx-auto mb-1 md:mb-2" />}
            value={achievements.length}
            label={t('stats.achievements')}
            bg="bg-green-50"
          />
        </div>

        {/* Օրական նպատակ */}
        <Card className="p-4 md:p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-violet-600" />
            <h3 className="text-lg font-bold text-gray-800">{t('daily_goal')}</h3>
            {!isToday && (
              <Badge variant="outline" className="ml-auto text-xs">
                {tText('Վերջին՝')} {formatDate(lastGoalDate)}
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-violet-600">
              {isToday ? dailyProgress : 0}
              <span className="text-base text-gray-500"> / {dailyGoal}</span>
            </span>
            <span className="text-sm text-gray-500">
              {dailyGoalPercent.toFixed(0)}% {t('lesson.completed')}
            </span>
          </div>
          <Progress value={dailyGoalPercent} className="h-2 mb-2" />
          <p className="text-xs text-gray-500">
            {dailyGoalPercent >= 100
              ? t('daily_goal_done')
              : t('daily_goal_remaining').replace('{n}', String(Math.max(0, dailyGoal - (isToday ? dailyProgress : 0))))}
          </p>
        </Card>

        {/* Հավելյալ վիճակագրություն */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600">{t('stats.study_time')}</span>
            </div>
            <div className="text-xl font-bold text-gray-800 mt-1">
              {studyHours}h {studyMinutes}m
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-600">{t('stats.favorites')}</span>
            </div>
            <div className="text-xl font-bold text-gray-800 mt-1">
              {favoriteLessons.length} {t('lesson.lessons')}
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span className="text-gray-600">{t('stats.bookmarks')}</span>
            </div>
            <div className="text-xl font-bold text-gray-800 mt-1">
              {bookmarks.length} {t('lesson.lessons')}
            </div>
          </Card>
        </div>

        {/* Նվաճումներ */}
        {achievements.length > 0 && (
          <Card className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-gray-800">
                {t('stats.achievements')} ({achievements.length})
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {achievements.map((ach, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 px-3 py-1.5 rounded-full text-sm font-medium text-amber-800"
                >
                  {tText(ach)}
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        {/* Մշտական հղումի ինֆո */}
        <Card className="p-4 mt-6 bg-violet-50 border-violet-200">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-violet-800 mb-1">
                {tText('Ձեր մշտական պրոֆիլի հղումը')}
              </div>
              <div className="text-xs text-violet-700 mb-2">
                {tText('Այս հղումը միշտ նույնն է: Կիսվեք ընկերների հետ, որպեսզի տեսնեն ձեր առաջընթարը:')}
              </div>
              <div className="bg-white p-2 rounded border border-violet-200 font-mono text-xs break-all">
                {typeof window !== 'undefined' ? `${window.location.origin}?u=${shareCode}` : `?u=${shareCode}`}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label, bg }: { icon: React.ReactNode; value: number; label: string; bg: string }) {
  return (
    <div className={`text-center p-3 md:p-4 ${bg} rounded-lg`}>
      {icon}
      <div className="text-xl md:text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs md:text-sm text-gray-600">{label}</div>
    </div>
  )
}
