
'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useProgressStore } from '@/lib/store/progress'
import {
  t as translate,
  getLanguageByCode,
  getTranslations,
  subscribeToTranslations,
  translateText as i18nTranslateText,
  hasStaticTranslation,
  refreshFallbackCache,
} from '@/lib/i18n'
import { Lesson, Subject, LessonSection, QuizQuestion, LessonContent } from '@/lib/types'

export function useTranslation() {
  const language = useProgressStore((state) => state.language)
  const [, setTick] = useState(0)
  const [translationsLoaded, setTranslationsLoaded] = useState(false)

  // Force re-render when translations are updated
  useEffect(() => {
    if (hasStaticTranslation(language)) {
      setTranslationsLoaded(true)
      return
    }
    
    const unsubscribe = subscribeToTranslations(language, () => {
      setTick((n) => n + 1)
      setTranslationsLoaded(true)
    })
    
    // Mark as loaded after a short delay to allow initial cache check
    const timer = setTimeout(() => setTranslationsLoaded(true), 100)
    
    return () => {
      unsubscribe()
      clearTimeout(timer)
    }
  }, [language])

  const t = useCallback((key: string) => translate(key, language), [language])
  const langInfo = getLanguageByCode(language)

  const tText = useCallback((text: string): string => {
    if (!text) return text
    if (language === 'hy') return text
    return i18nTranslateText(text, language, () => {
      setTick((n) => n + 1)
    })
  }, [language])

  const tLesson = useCallback((lesson: Lesson): Lesson => {
    if (language === 'hy') return lesson
    return {
      ...lesson,
      title: tText(lesson.title),
      subtitle: lesson.subtitle ? tText(lesson.subtitle) : undefined,
      content: {
        intro: tText(lesson.content.intro),
        sections: lesson.content.sections.map(s => ({
          ...s,
          heading: tText(s.heading),
          body: tText(s.body),
          example: s.example ? tText(s.example) : undefined,
          visual: s.visual ? { ...s.visual, description: tText(s.visual.description) } : undefined,
          keyPoints: s.keyPoints ? s.keyPoints.map(p => tText(p)) : undefined,
        })),
        funFact: lesson.content.funFact ? tText(lesson.content.funFact) : undefined,
        didYouKnow: lesson.content.didYouKnow ? tText(lesson.content.didYouKnow) : undefined,
        realLifeExample: lesson.content.realLifeExample ? tText(lesson.content.realLifeExample) : undefined,
        summary: tText(lesson.content.summary),
        exercises: lesson.content.exercises ? lesson.content.exercises.map(e => tText(e)) : undefined,
        keyTerms: lesson.content.keyTerms ? lesson.content.keyTerms.map(kt => ({ term: tText(kt.term), definition: tText(kt.definition) })) : undefined,
      },
      quiz: lesson.quiz.map(q => ({
        ...q,
        question: tText(q.question),
        options: q.options.map(o => tText(o)),
        explanation: q.explanation ? tText(q.explanation) : undefined,
        hint: q.hint ? tText(q.hint) : undefined,
      })),
    }
  }, [language, tText])

  const tSubject = useCallback((subject: Subject): Subject => {
    if (language === 'hy') return subject
    return {
      ...subject,
      name: tText(subject.name),
      description: tText(subject.description),
      lessons: subject.lessons.map(l => tLesson(l)),
    }
  }, [language, tText, tLesson])

  return { t, language, langInfo, tLesson, tSubject, tText, translationsLoaded }
}
