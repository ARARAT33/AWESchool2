'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import {
  Settings, Sun, Moon, Monitor, Type, Target, Bell, Globe, BookOpen
} from 'lucide-react'
import { useProgressStore } from '@/lib/store/progress'
import { useTranslation } from '@/hooks/use-translation'
import { toast } from 'sonner'

interface SettingsPanelProps {
  trigger?: React.ReactNode
}

export function SettingsPanel({ trigger }: SettingsPanelProps) {
  const {
    fontSize, setFontSize,
    theme, setTheme,
    dailyGoal, setDailyGoal,
    learningMode, setLearningMode,
  } = useProgressStore()
  const { t, tText } = useTranslation()

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {t('settings.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Թեմա */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              {t('settings.theme')}
            </Label>
            <Select
              value={theme}
              onValueChange={(value: 'light' | 'dark' | 'auto') => {
                setTheme(value)
                toast.success(t('settings.theme'))
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    {t('settings.theme_light')}
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    {t('settings.theme_dark')}
                  </div>
                </SelectItem>
                <SelectItem value="auto">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    {t('settings.theme_auto')}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ֆոնտի չափ */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              {t('settings.font_size')}
            </Label>
            <Select
              value={fontSize}
              onValueChange={(value: 'small' | 'medium' | 'large') => {
                setFontSize(value)
                toast.success(t('settings.font_size'))
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">
                  <span style={{ fontSize: '0.875rem' }}>{t('settings.font_small')}</span>
                </SelectItem>
                <SelectItem value="medium">
                  <span style={{ fontSize: '1rem' }}>{t('settings.font_medium')}</span>
                </SelectItem>
                <SelectItem value="large">
                  <span style={{ fontSize: '1.125rem' }}>{t('settings.font_large')}</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Օրական նպատակ */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                {t('settings.daily_goal')}
              </Label>
              <span className="text-sm font-bold text-violet-600">{dailyGoal} {t('lesson.lessons')}</span>
            </div>
            <Slider
              value={[dailyGoal]}
              onValueChange={([value]) => setDailyGoal(value)}
              min={1}
              max={10}
              step={1}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 {t('lesson.lessons')}</span>
              <span>10 {t('lesson.lessons')}</span>
            </div>
          </div>

          {/* Ուսումնական ռեժիմ */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {t('settings.learning_mode')}
            </Label>
            <Select
              value={learningMode}
              onValueChange={(value: 'school' | 'university') => {
                setLearningMode(value)
                toast.success(t('settings.learning_mode'))
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="school">
                  🎒 {t('mode.school')}
                </SelectItem>
                <SelectItem value="university">
                  🎓 {t('mode.university')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ինֆո */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
            <Globe className="w-4 h-4 inline mr-1" />
            {t('settings.tip')}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
