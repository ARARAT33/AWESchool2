'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft, BookOpen, GraduationCap, Volume2,
  Download, Upload, Globe, Settings, Trophy, Target,
  PlayCircle, Lightbulb, Users, Award, Sparkles,
  School, FileUp, FileDown, Search, CheckCircle2, Star, Flame
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/hooks/use-translation'

interface GuidesPageProps {
  onBack: () => void
}

interface Guide {
  id: string
  title: string
  description: string
  icon: string
  steps: { title: string; description: string; emoji: string }[]
  color: string
}

function useGuides(): Guide[] {
  const { t, tText } = useTranslation()
  return [
  {
    id: 'start',
    title: '🚀 ' + t('guides.start'),
    description: t('guides.start_desc'),
    icon: '🚀',
    color: 'from-violet-500 to-purple-600',
    steps: [
      { title: tText('Մուտքագրեք անունը'), description: tText('Գրեք ձեր անունը և ընտրեք կերպարը'), emoji: '✍️' },
      { title: tText('Ընտրեք առարկան'), description: tText('Սեղմեք որևէ առարկայի վրա՝ սկսելու համար'), emoji: '📚' },
      { title: tText('Կարդացեք դասը'), description: tText('Անցեք էջերով՝ սովորելու նոր բան'), emoji: '📖' },
      { title: tText('Անցեք քննություն'), description: tText('Պատասխանեք հարցերին՝ հաջորդ դասը բացելու'), emoji: '✅' },
    ],
  },
  {
    id: 'modes',
    title: '🏫 ' + t('guides.modes'),
    description: t('guides.modes_desc'),
    icon: '🎓',
    color: 'from-blue-500 to-cyan-600',
    steps: [
      { title: t('mode.school'), description: t('mode.school_desc'), emoji: '🎒' },
      { title: t('mode.university'), description: t('mode.university_desc'), emoji: '📚' },
      { title: tText('Փոխարկեք ռեժիմը'), description: tText('Սեղմեք առարկայի վրա՝ ընտրելու ռեժիմը'), emoji: '🔄' },
      { title: t('university.pass_threshold'), description: tText('Համալսարանայինում պետք է հանձնել 51%+'), emoji: '🎯' },
    ],
  },

  {
    id: 'share',
    title: '📤 ' + t('guides.share'),
    description: t('guides.share_desc'),
    icon: '📤',
    color: 'from-green-500 to-emerald-600',
    steps: [
      { title: tText('Սեղմեք Share'), description: tText('Վերևում սեղմեք share կոճակը'), emoji: '📤' },
      { title: t('share.summary'), description: tText('Անուն, դասեր, միավորներ, նվաճումներ'), emoji: '📊' },
      { title: t('share.button'), description: tText('Ուղարկեք ընկերներին՝ share համակարգով'), emoji: '✨' },
      { title: tText('Կամ պատճենեք'), description: tText('Պատճենեք clipboard-ից'), emoji: '📋' },
    ],
  },
  {
    id: 'export',
    title: '💾 ' + t('guides.export'),
    description: t('guides.export_desc'),
    icon: '💾',
    color: 'from-pink-500 to-rose-600',
    steps: [
      { title: t('export'), description: t('file.export_desc'), emoji: '📤' },
      { title: tText('Պահպանեք ֆայլը'), description: tText('Պահպանեք անվտանգ տեղում'), emoji: '🔒' },
      { title: t('import'), description: t('file.import_desc'), emoji: '📥' },
      { title: tText('Ընտրեք ֆայլը'), description: tText('Ընտրեք նախկինում արտահանված ֆայլը'), emoji: '📂' },
    ],
  },
  {
    id: 'languages',
    title: '🌐 ' + t('guides.languages'),
    description: t('guides.languages_desc'),
    icon: '🌐',
    color: 'from-indigo-500 to-blue-600',
    steps: [
      { title: tText('Սեղմեք դրոշը'), description: tText('Վերևում սեղմեք լեզվի կոճակը'), emoji: '🏳️' },
      { title: t('lang.search'), description: tText('200+ լեզուներից ընտրեք ձերը'), emoji: '🔍' },
      { title: t('lang.select'), description: tText('Սեղմեք լեզվի վրա'), emoji: '✅' },
      { title: tText('Ամբողջ կայքը փոխվում է'), description: tText('Տեքստերը, դասերը այսօրվա լեզվով'), emoji: '🌍' },
    ],
  },
  {
    id: 'achievements',
    title: '🏆 ' + t('guides.achievements'),
    description: t('guides.achievements_desc'),
    icon: '🏆',
    color: 'from-yellow-500 to-amber-600',
    steps: [
      { title: tText('Ավարտեք դասեր'), description: tText('Ստացեք նվաճումներ յուրաքանչյուր դասի համար'), emoji: '⭐' },
      { title: t('stats.streak'), description: tText('Ամեն օր սովորեք՝ պահպանելու շարքը'), emoji: '🔥' },
      { title: t('stats.points'), description: tText('Հավաքեք միավորներ և բարձրացրեք մակարդակը'), emoji: '📈' },
      { title: tText('Մրցույթ'), description: tText('Տեսեք ձեր տեղը այլ մասնակիցների մեջ'), emoji: '🥇' },
    ],
  },
  {
    id: 'profile',
    title: '👤 ' + t('profile.title'),
    description: tText('Կիսվեք ձեր առաջընթարով'),
    icon: '👤',
    color: 'from-purple-500 to-violet-600',
    steps: [
      { title: t('profile.title'), description: tText('Սեղմեք 👤 վերևում'), emoji: '👤' },
      { title: tText('Մշտական հղում'), description: tText('Ձեր պրոֆիլի URL-ը միշտ նույնն է'), emoji: '🔗' },
      { title: t('share.button'), description: tText('Ուղարկեք ընկերներին'), emoji: '📤' },
      { title: tText('Ցուցադրական'), description: tText('Առանց գրանցման տեսնում են ձեր վիճակագրությունը'), emoji: '👁️' },
    ],
  },
  ]
}

export function GuidesPage({ onBack }: GuidesPageProps) {
  const { t } = useTranslation()
  const guides = useGuides()
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null)

  if (selectedGuide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 p-4">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" onClick={() => setSelectedGuide(null)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('guides.all_guides')}
          </Button>

          <Card className={`p-6 md:p-8 bg-gradient-to-br ${selectedGuide.color} text-white border-0 mb-6`}>
            <div className="text-5xl mb-3">{selectedGuide.icon}</div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{selectedGuide.title}</h1>
            <p className="text-white/90">{selectedGuide.description}</p>
          </Card>

          <div className="space-y-3">
            {selectedGuide.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-4 flex items-start gap-3">
                  <div className="text-3xl flex-shrink-0">{step.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">{i + 1}</Badge>
                      <h3 className="font-bold text-gray-800">{step.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Անիմացիոն ցուցադրություն - GIF-ի նման կենդանի ցուցադրություն */}
          <AnimatedGuideDemo guideId={selectedGuide.id} steps={selectedGuide.steps} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('guides.main')}
        </Button>

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📖</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {t('guides.title')}
          </h1>
          <p className="text-gray-600">
            {t('guides.how_to_use')} AWESchool
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedGuide(guide)}
              className="cursor-pointer"
            >
              <Card className={`p-6 bg-gradient-to-br ${guide.color} text-white border-0 hover:scale-105 transition-transform h-full`}>
                <div className="text-4xl mb-3">{guide.icon}</div>
                <h3 className="text-lg font-bold mb-1">{guide.title}</h3>
                <p className="text-white/90 text-sm">{guide.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-white/70">
                  <PlayCircle className="w-4 h-4" />
                  {guide.steps.length} {t('guides.step')}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Անիմացիոն ցուցադրություն - կենդանի GIF-ի նման դեմո
function AnimatedGuideDemo({ guideId, steps }: { guideId: string; steps: { title: string; description: string; emoji: string }[] }) {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <Card className="p-6 mt-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-600">🎬 {t('guides.live_demo')}</span>
        </div>
        <Badge variant="secondary" className="text-xs">
          {t('guides.step')} {currentStep + 1}/{steps.length}
        </Badge>
      </div>

      {/* Անիմացված դեմո տարածք */}
      <div className="relative h-64 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 rounded-xl overflow-hidden border-2 border-violet-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6"
          >
            {/* Մեծ emoji անիմացիայով */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              {steps[currentStep].emoji}
            </motion.div>

            {/* Տեքստ */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="font-bold text-lg text-gray-800 mb-1">
                {steps[currentStep].title}
              </div>
              <div className="text-sm text-gray-600 max-w-xs">
                {steps[currentStep].description}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Առաջընթացի կետեր */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentStep ? 'w-8 bg-violet-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Բոլոր քայլերի ցուցադրություն */}
      <div className="flex justify-center gap-2 mt-4">
        {steps.map((step, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentStep(i)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
              i === currentStep
                ? 'bg-violet-600 text-white shadow-lg scale-110'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {step.emoji}
          </motion.button>
        ))}
      </div>
    </Card>
  )
}
