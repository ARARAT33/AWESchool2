'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight,
  Lightbulb, Eye, EyeOff, Zap, Award
} from 'lucide-react'
import { Lesson } from '@/lib/types'
import { useProgressStore } from '@/lib/store/progress'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/hooks/use-translation'

interface ExamViewProps {
  lesson: Lesson
  subjectId: string
  nextLessonId?: string
  onComplete: () => void
  onCancel: () => void
}

export function ExamView({ lesson, subjectId, nextLessonId, onComplete, onCancel }: ExamViewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [hintsUsedInThisExam, setHintsUsedInThisExam] = useState(0)
  const { completeLesson, useHint: recordHintUsage, getHintsUsed } = useProgressStore()
  const { t, tLesson, tText } = useTranslation()

  // Թարգմանել դասը ընթացիկ լեզվով
  const translatedLesson = tLesson(lesson)

  const question = translatedLesson.quiz[currentQuestion]
  const isLastQuestion = currentQuestion === translatedLesson.quiz.length - 1
  const totalHintsUsed = getHintsUsed(lesson.id)

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    setShowExplanation(true)
    setAnswers([...answers, selectedAnswer])
  }

  const handleNext = () => {
    if (isLastQuestion) {
      const correctCount = [...answers].filter(
        (ans, i) => ans === translatedLesson.quiz[i].correctAnswer
      ).length
      const score = Math.round((correctCount / translatedLesson.quiz.length) * 100)
      completeLesson(subjectId, lesson.id, score, nextLessonId)
      setShowResult(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setShowHint(false)
    }
  }

  const handleShowHint = () => {
    if (!showHint) {
      // recordHintUsage-ը կանչում ենք միայն մեկ անգամ
      recordHintUsage(lesson.id)
      setHintsUsedInThisExam(hintsUsedInThisExam + 1)
    }
    setShowHint(!showHint)
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowExplanation(false)
    setShowResult(false)
    setShowHint(false)
    setHintsUsedInThisExam(0)
  }

  if (showResult) {
    const correctCount = answers.filter(
      (ans, i) => ans === translatedLesson.quiz[i].correctAnswer
    ).length
    const score = Math.round((correctCount / translatedLesson.quiz.length) * 100)
    const passed = score >= 60
    const perfectScore = score === 100
    const noHints = hintsUsedInThisExam === 0

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto px-4"
      >
        <Card className="p-6 md:p-8 text-center bg-gradient-to-br from-white to-violet-50 border-2 border-violet-200">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-green-100' : 'bg-amber-100'}`}>
            {passed ? (
              <Trophy className="w-12 h-12 text-green-600" />
            ) : (
              <RotateCcw className="w-12 h-12 text-amber-600" />
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
            {passed ? t('exam.congrats') + ' 🎉' : t('exam.retry') + ' 💪'}
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            {passed
              ? t('exam.passed')
              : t('exam.need_60')}
          </p>
          <div className="text-5xl md:text-6xl font-bold mb-2 text-violet-600">{score}%</div>
          <p className="text-gray-600 mb-4">
            {correctCount} / {translatedLesson.quiz.length}
          </p>

          {/* Լրացուցիչ նշաններ */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {perfectScore && (
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                <Award className="w-3 h-3 mr-1" /> {tText('Կատարյալ')}
              </Badge>
            )}
            {noHints && (
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                <Zap className="w-3 h-3 mr-1" /> {tText('Առանց հուշման')}
              </Badge>
            )}
            {hintsUsedInThisExam > 0 && (
              <Badge variant="secondary">
                <Lightbulb className="w-3 h-3 mr-1" /> {hintsUsedInThisExam} {t('lesson.hint')}
              </Badge>
            )}
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <Button onClick={handleRetry} variant="outline" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              {t('exam.retry')}
            </Button>
            {passed && (
              <Button onClick={onComplete} size="lg" className="bg-violet-600 hover:bg-violet-700">
                {nextLessonId ? t('lesson.next') : '✓'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-4"
    >
      <Card className="p-4 md:p-8">
        <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-2">
          <div>
            <Badge variant="secondary" className="mb-2">
              {t('exam.question') + ':'}
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{translatedLesson.title}</h2>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">{t('exam.question')}</div>
            <div className="text-xl md:text-2xl font-bold text-violet-600">
              {currentQuestion + 1}/{translatedLesson.quiz.length}
            </div>
          </div>
        </div>

        <Progress
          value={((currentQuestion + (showExplanation ? 1 : 0)) / translatedLesson.quiz.length) * 100}
          className="mb-6"
        />

        <div className="space-y-4 md:space-y-6">
          <div className="flex items-start gap-2">
            {question.difficulty && (
              <Badge variant="outline" className={`flex-shrink-0 ${
                question.difficulty === 'easy' ? 'text-green-600 border-green-300' :
                question.difficulty === 'medium' ? 'text-amber-600 border-amber-300' :
                'text-red-600 border-red-300'
              }`}>
                {question.difficulty === 'easy' ? tText('Հեշտ') : question.difficulty === 'medium' ? tText('Միջին') : tText('Բարդ')}
              </Badge>
            )}
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed flex-1">
              {question.question}
            </h3>
          </div>

          <div className="grid gap-2 md:gap-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correctAnswer
              const showCorrect = showExplanation && isCorrect
              const showWrong = showExplanation && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`p-3 md:p-4 rounded-lg border-2 text-left transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showWrong
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50/50'
                  } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div
                      className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm ${
                        showCorrect
                          ? 'bg-green-500 text-white'
                          : showWrong
                          ? 'bg-red-500 text-white'
                          : isSelected
                          ? 'bg-violet-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {showCorrect ? (
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                      ) : showWrong ? (
                        <XCircle className="w-4 h-4 md:w-5 md:h-5" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">{option}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Հուշման բաժին */}
          {question.hint && !showExplanation && (
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShowHint}
                className="text-amber-600 hover:text-amber-700"
              >
                {showHint ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-1" /> {tText('Թաքցնել հուշումը')}
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4 mr-1" /> {t('lesson.hint')}
                  </>
                )}
              </Button>
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                  >
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800">{question.hint}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 md:p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <div className="font-semibold text-blue-800 mb-1 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {t('lesson.explanation')}:
              </div>
              <p className="text-blue-700 text-sm md:text-base">{question.explanation}</p>
            </motion.div>
          )}

          <div className="flex justify-between pt-4 gap-2">
            <Button variant="outline" onClick={onCancel} size="sm" className="md:size-default">
              {t('exam.exit')}
            </Button>
            {!showExplanation ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                size="sm"
                className="md:size-default"
              >
                {t('exam.check')}
              </Button>
            ) : (
              <Button onClick={handleNext} size="sm" className="md:size-default">
                {isLastQuestion ? '✓' : t('lesson.next')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
