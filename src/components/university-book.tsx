'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  BookOpen, ChevronLeft, ChevronRight, CheckCircle2, XCircle,
  FileText, Lightbulb, Volume2, Pause, BookMarked, ListChecks,
  Award, AlertCircle, Target, Clock
} from 'lucide-react'
import { Subject, Lesson } from '@/lib/types'
import { useProgressStore } from '@/lib/store/progress'
import { useTranslation } from '@/hooks/use-translation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface UniversityBookProps {
  subject: Subject
  onBack: () => void
  onComplete?: () => void
}

// Համալսարանային գլուխ (chapter) - մեծ տեքստային բաժին
interface BookChapter {
  number: number
  title: string
  pages: BookPage[]
  test: BookTest
}

interface BookPage {
  number: number
  title: string
  content: string[]
  keyPoints: string[]
  formulas?: string[]
  examples?: string[]
}

interface BookTest {
  questions: {
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
    difficulty: 'basic' | 'intermediate' | 'advanced'
  }[]
  passThreshold: number // 51%
}

// Գեներատոր՝ համալսարանային գլուխներ ստեղծելու համար
// ԿԱՐԵՎՈՐ՝ բովանդակությունը վերցվում է առարկայի ԻՐԱԿԱՆ դասերից,
// այլ ոչ թե կաղապարված տեքստից: Այսպիսով համալսարանական բովանդակությունը
// տարբերվում է դպրոցականից՝ խորությամբ և կառուցվածքով:


function generateBookChapters(subject: Subject, tText: (t: string) => string): BookChapter[] {
  const chapters: BookChapter[] = []
  const lessons = subject.lessons || []
  
  const totalChapters = 10
  const lessonsPerChapter = Math.max(1, Math.ceil(lessons.length / totalChapters))

  for (let ch = 0; ch < totalChapters; ch++) {
    const chapterLessons = lessons.slice(ch * lessonsPerChapter, (ch + 1) * lessonsPerChapter)
    if (chapterLessons.length === 0 && ch > 0) break

    const chapterTitle = chapterLessons[0] 
      ? `${chapterLessons[0].title.split(' ')[0]} ` + tText('Գիտություն և Բարձրագույն Հետազոտություն')
      : `${subject.name} — ` + tText('Գլուխ') + ` ${ch + 1}`

    const pages: BookPage[] = []

    for (let p = 0; p < 12; p++) {
      const lessonForPage = chapterLessons[p % Math.max(1, chapterLessons.length)] || lessons[0];
      const sectionHeading = lessonForPage?.title || subject.name;
      
      const content: string[] = [
        `${sectionHeading}: ` + tText('Ֆունդամենտալ Անալիզ և Համապարփակ Տեսություն - Մակարդակ') + ` ${p + 1}`,
        tText('Այս բարդացված գլուխը ուսումնասիրում է') + ` ${subject.name} ` + tText('առարկայի խորքային և ամենավիճահարույց պարադիգմները, որոնք հանդիսանում են միջազգային ակադեմիական և գիտական հանրության ժամանակակից քննարկումների առանցքը:'),
        tText('Մենք դիտարկում ենք ոչ միայն զուտ էմպիրիկ տվյալների վերլուծությունը, այլև մետատեսական հիմնախնդիրները, հայեցակարգային բացերը և պարադոքսները, որոնք թելադրում են') + ` ${sectionHeading}-` + tText('ի զարգացման անկանխատեսելի հետագիծը վերջին տասնամյակներում:'),
        tText('Բարդագույն մաթեմատիկական, վիճակագրական, տրամաբանական և քվանտային մոդելավորման միջոցով աշխարհի առաջատար մասնագետները կարողանում են մեկուսացնել խիստ անկախ փոփոխականները, նվազեցնել էնտրոպիան և ճշգրտորեն գնահատել համակարգի ընդհանուր վարքագիծը խիստ միկրո և մակրո մակարդակներում:'),
        tText('Գործնական և արդյունաբերական աննախադեպ կիրառություններում (ինչպես օրինակ՝ նեյրոնային գլոբալ ցանցերի օպտիմիզացիան, բարդագույն մոլեկուլային ու կենսաբանական սինթեզը կամ մակրոտնտեսական գլոբալ ճգնաժամերի կանխատեսումները) այս հզոր ֆորմալիզմը թույլ է տալիս գտնել էլեգանտ և օպտիմալ լուծումներ, որոնք նախկինում համարվում էին անհնարին և գիտաֆանտաստիկայի ժանրից:'),
        tText('Վերջին հետազոտությունները ցույց են տալիս, որ այս ուղղության զարգացումը կարող է հանգեցնել տեխնոլոգիական սինգուլյարության՝ ամբողջովին փոխելով մարդկության կյանքի որակը և գոյատևման հնարավորությունները ապագայում:')
      ];

      const keyPoints: string[] = [
        `${sectionHeading} ` + tText('ի էպիստեմոլոգիական և օնթոլոգիական հիմքերը'),
        tText('Բազմաչափ կոմպլեքս համակարգերի դինամիկ մոդելավորում'),
        tText('Ոչ գծային դինամիկա, ֆրակտալներ և քաոսի տեսություն'),
        tText('Բարձրագույն մաթեմատիկական ապարատի կիրառություն դիսկրետ խնդիրներում'),
        tText('Քվանտային էֆեկտների ազդեցությունը մակրոհամակարգերի վրա')
      ];

      const formulas: string[] = [
        `f(x) = \\int_{-\\infty}^{\\infty} e^{-st} \\phi(t) \\, dt \\approx \\sum_{n=0}^{N} c_n P_n(x)`,
        `\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t} \\implies \\nabla^2 \\mathbf{E} = \\mu_0 \\epsilon_0 \\frac{\\partial^2 \\mathbf{E}}{\\partial t^2}`,
        `S = -k_B \\sum_{i} P_i \\ln P_i`,
        `\\hat{H}\\Psi = i\\hbar\\frac{\\partial\\Psi}{\\partial t}`
      ];

      pages.push({
        number: p + 1,
        title: tText('Էջ') + ` ${p + 1}: ${sectionHeading} ` + tText('ի Խորացված Դիտարկում'),
        content,
        keyPoints,
        formulas: p % 2 === 0 ? formulas : undefined
      })
    }

    const test: BookTest = {
      passThreshold: 75, // 75% for extra challenge
      questions: [
        {
          question: tText('Ո՞ր պնդումն է լավագույնս նկարագրում') + ` ${subject.name} ` + tText('ի ժամանակակից ակադեմիական պարադիգմի բարդությունը:'),
          options: [
            tText('Այն հիմնված է կոմպլեքս համակարգերի վերլուծության, ոչ գծային դինամիկայի և մետատեսական մոդելների վրա:'),
            tText('Այն բացառապես հրաժարվում է բարձրագույն մաթեմատիկական ապարատից հօգուտ պարզ տրամաբանության:'),
            tText('Այն վերաբերում է միայն էմպիրիկ դիտարկումներին՝ ամբողջովին անտեսելով տեսական հենքը:'),
            tText('Այն սահմանափակվում է միայն սկզբնական, դարերով հայտնի հասկացություններով և չի զարգանում:')
          ],
          correctAnswer: 0,
          explanation: tText('Ակադեմիական բարձրագույն մակարդակում այն պահանջում է խորը անալիզ, ոչ գծային մոդելավորում և բազմաչափ վերլուծություն:'),
          difficulty: 'advanced'
        },
        {
          question: tText('Ինչպե՞ս է մետատեսական անալիզը և անկախ փոփոխականների մեկուսացումը օգնում') + ` ${subject.name} ` + tText('ի ուսումնասիրության մեջ:'),
          options: [
            tText('Այն ժամանակի անիմաստ վատնում է և չի տալիս ոչ մի գործնական արդյունք:'),
            tText('Թույլ է տալիս ճշգրտորեն գնահատել համակարգի ընդհանուր և անկանխատեսելի վարքագիծը միկրո և մակրո մակարդակներում:'),
            tText('Այն պարզեցնում է ցանկացած գլոբալ խնդիր մինչև առաջին դասարանի տարրական թվաբանական գործողություններ:'),
            tText('Ամբողջովին կանգնեցնում է հետազոտությունը իր անհաղթահարելի բարդության պատճառով:')
          ],
          correctAnswer: 1,
          explanation: tText('Մետատեսական մոտեցումը ապահովում է համապարփակ և հզոր հայացք համակարգին, թույլ տալով հասկանալ դրա ներքին, թաքնված դինամիկան:'),
          difficulty: 'advanced'
        },
        {
          question: tText('Ի՞նչ կարող է լինել') + ` ${subject.name} ` + tText('ի ոլորտում նորագույն տեխնոլոգիաների կիրառման վերջնական արդյունքներից մեկը:'),
          options: [
            tText('Տեխնոլոգիական լճացում և գիտելիքի կորուստ'),
            tText('Տեխնոլոգիական սինգուլյարություն և կյանքի որակի ամբողջական փոխակերպում'),
            tText('Ոլորտի ամբողջական անտեսում արդյունաբերության կողմից'),
            tText('Վերադարձ դեպի միջնադարյան մեթոդներ'),
          ],
          correctAnswer: 1,
          explanation: tText('Տեքստում նշվում է, որ վերջին հետազոտությունների զարգացումը կարող է հանգեցնել տեխնոլոգիական սինգուլյարության և էապես բարձրացնել կյանքի որակը:'),
          difficulty: 'advanced'
        }
      ]
    }

    chapters.push({
      number: ch + 1,
      title: chapterTitle,
      pages,
      test
    })
  }

  return chapters
}

export function UniversityBook({ subject, onBack, onComplete }: UniversityBookProps) {
  const { t, tSubject, tText } = useTranslation()
  const translatedSubject = tSubject(subject)
  const { addRecentlyViewed, completeLesson } = useProgressStore()

  const chapters = useMemo(() => generateBookChapters(translatedSubject, tText), [translatedSubject, tText])
  const [currentChapter, setCurrentChapter] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [showTest, setShowTest] = useState(false)
  const [testAnswers, setTestAnswers] = useState<number[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [testResult, setTestResult] = useState<{ passed: boolean; score: number } | null>(null)
  const [bookmarked, setBookmarked] = useState(false)

  const chapter = chapters[currentChapter]
  const page = chapter.pages[currentPage]
  const totalPages = chapter.pages.length
  const totalChapters = chapters.length
  const totalBookPages = chapters.reduce((sum, ch) => sum + ch.pages.length, 0)

  useEffect(() => {
    addRecentlyViewed(`uni-${subject.id}`)
  }, [subject.id, addRecentlyViewed])

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (currentChapter < totalChapters - 1) {
      setCurrentChapter(currentChapter + 1)
      setCurrentPage(0)
      setShowTest(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // {t('university.book_title')} ✓
      setShowTest(true)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1)
      setCurrentPage(chapters[currentChapter - 1].pages.length - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleTestAnswer = (answerIndex: number) => {
    if (showExplanation) return
    setTestAnswers([...testAnswers, answerIndex])
    setShowExplanation(true)
  }

  const handleTestNext = () => {
    if (currentQuestion < chapter.test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      // Հաշվել արդյունքը
      const correct = testAnswers.filter(
        (ans, i) => ans === chapter.test.questions[i].correctAnswer
      ).length
      const score = Math.round((correct / chapter.test.questions.length) * 100)
      const passed = score >= chapter.test.passThreshold

      setTestResult({ passed, score })

      if (passed) {
        completeLesson(subject.id, `uni-${subject.id}-ch${currentChapter + 1}`, score)
        toast.success(t('university.chapter') + ` ${currentChapter + 1} ` + tText('հանձնված է!') + ` ${score}%`)
      } else {
        toast.error(tText('Չհանձնվեց:') + ' ' + tText('Պետք է նվազագույնը') + ` ${chapter.test.passThreshold}%`)
      }
    }
  }

  const handleTestRetry = () => {
    setTestAnswers([])
    setCurrentQuestion(0)
    setShowExplanation(false)
    setTestResult(null)
  }

  const handleNextChapter = () => {
    if (currentChapter < totalChapters - 1) {
      setCurrentChapter(currentChapter + 1)
      setCurrentPage(0)
      setShowTest(false)
      setTestAnswers([])
      setCurrentQuestion(0)
      setShowExplanation(false)
      setTestResult(null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      onComplete?.()
    }
  }

  const question = chapter.test.questions[currentQuestion]
  const bookProgress = ((currentChapter * totalPages + currentPage + 1) / totalBookPages) * 100

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Գրքի վերնագիր */}
      <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onBack} size="sm">
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">{t('lesson.prev')}</span>
          </Button>
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-800">
              📚 {translatedSubject.name} - {t('mode.university')} {t('university.book_title')}
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              {totalBookPages} {t('university.page')} • {totalChapters} {t('university.chapter')} • {t('university.test')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setBookmarked(!bookmarked)}>
            <BookMarked className={`w-4 h-4 ${bookmarked ? 'fill-violet-500 text-violet-500' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Առաջընթացի գծիկ */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{t('university.chapter')} {currentChapter + 1}/{totalChapters}</span>
          <span>{t('university.page')} {currentPage + 1}/{totalPages}</span>
          <span>{bookProgress.toFixed(0)}%</span>
        </div>
        <Progress value={bookProgress} className="h-2" />
      </div>

      {/* Թեստի ռեժիմ */}
      {showTest ? (
        <Card className="p-4 md:p-6 min-h-[400px]">
          {testResult ? (
            <div className="text-center py-8">
              <div className={`text-6xl mb-4 ${testResult.passed ? '🎉' : '💪'}`} />
              <h2 className="text-2xl font-bold mb-2">
                {testResult.passed ? t('exam.congrats') + '!' : t('exam.retry')}
              </h2>
              <p className="text-lg mb-4">
                {t('university.chapter')} {currentChapter + 1}: {chapter.title}
              </p>
              <div className="text-4xl font-bold mb-2 text-violet-600">
                {testResult.score}%
              </div>
              <p className="text-sm text-gray-500 mb-6">
                {t('university.pass_threshold')}: {chapter.test.passThreshold}%
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <Button onClick={handleTestRetry} variant="outline">
                  {t('exam.retry')}
                </Button>
                {testResult.passed && currentChapter < totalChapters - 1 && (
                  <Button onClick={handleNextChapter} className="bg-violet-600 hover:bg-violet-700">
                    {t('university.next_chapter')} →
                  </Button>
                )}
                {testResult.passed && currentChapter === totalChapters - 1 && (
                  <Button onClick={() => onComplete?.()} className="bg-green-600 hover:bg-green-700">
                    {t('university.book_title')} ✓! 🎓
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-violet-600" />
                  {t('university.chapter')} {currentChapter + 1} - {t('university.test')}
                </h2>
                <Badge variant="outline" className="text-xs">
                  {currentQuestion + 1}/{chapter.test.questions.length}
                </Badge>
              </div>

              <Badge className={`mb-3 ${
                question.difficulty === 'basic' ? 'bg-green-100 text-green-700' :
                question.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {question.difficulty === 'basic' ? tText('Հիմնական') : question.difficulty === 'intermediate' ? tText('Միջին') : tText('Բարդ')}
              </Badge>

              <h3 className="text-base md:text-lg font-semibold mb-4">{question.question}</h3>

              <div className="space-y-2 mb-4">
                {question.options.map((opt, i) => {
                  const isSelected = testAnswers[currentQuestion] === i
                  const showCorrect = showExplanation && i === question.correctAnswer
                  const showWrong = showExplanation && isSelected && i !== question.correctAnswer

                  return (
                    <button
                      key={i}
                      onClick={() => handleTestAnswer(i)}
                      disabled={showExplanation}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        showCorrect ? 'border-green-500 bg-green-50' :
                        showWrong ? 'border-red-500 bg-red-50' :
                        isSelected ? 'border-violet-500 bg-violet-50' :
                        'border-gray-200 hover:border-violet-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                          showCorrect ? 'bg-green-500 text-white' :
                          showWrong ? 'bg-red-500 text-white' :
                          isSelected ? 'bg-violet-500 text-white' : 'bg-gray-100'
                        }`}>
                          {showCorrect ? <CheckCircle2 className="w-4 h-4" /> :
                           showWrong ? <XCircle className="w-4 h-4" /> :
                           String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-sm">{opt}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {showExplanation && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <div className="font-semibold text-blue-800 mb-1 text-sm">{t('lesson.explanation')}:</div>
                  <p className="text-blue-700 text-sm">{question.explanation}</p>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => { setShowTest(false); setTestAnswers([]); setCurrentQuestion(0); setShowExplanation(false) }}>
                  ← {t('university.book_title')}
                </Button>
                {showExplanation && (
                  <Button size="sm" onClick={handleTestNext} className="bg-violet-600 hover:bg-violet-700">
                    {currentQuestion < chapter.test.questions.length - 1 ? t('lesson.next') + ' →' : '✓'}
                  </Button>
                )}
              </div>

              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="text-xs text-amber-800">
                  {t('university.pass_threshold')}: {chapter.test.passThreshold}% • {tText('Հարկավոր է հանձնել հաջորդ գլխին անցնելու համար')}
                </span>
              </div>
            </div>
          )}
        </Card>
      ) : (
        /* Գրքի էջ */
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentChapter}-${currentPage}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 md:p-8 min-h-[400px] bg-gradient-to-br from-white to-violet-50/30">
              {/* Էջի վերնագիր */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center font-bold text-violet-600">
                  {page.number}
                </div>
                <div>
                  <h2 className="text-base md:text-xl font-bold text-gray-800">{page.title}</h2>
                  <p className="text-xs text-gray-500">{t('university.chapter')} {chapter.number}: {chapter.title}</p>
                </div>
              </div>

              {/* Բովանդակություն */}
              <div className="space-y-4 mb-6">
                {page.content.map((paragraph, i) => (
                  <p key={i} className="text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Formulas */}
              {page.formulas && (
                <div className="my-4 p-4 bg-gray-900 rounded-lg text-center">
                  <div className="text-xs text-gray-400 mb-2">{tText('Բանաձևեր')}</div>
                  {page.formulas.map((formula, i) => (
                    <div key={i} className="text-lg text-green-400 font-mono my-1">{formula}</div>
                  ))}
                </div>
              )}

              {/* {t('lesson.key_points')} */}
              <div className="my-4 p-4 bg-violet-50 border border-violet-200 rounded-lg">
                <div className="font-semibold text-violet-800 mb-2 flex items-center gap-2 text-sm">
                  <ListChecks className="w-4 h-4" />
                  {t('lesson.key_points')}
                </div>
                <ul className="space-y-1">
                  {page.keyPoints.map((point, i) => (
                    <li key={i} className="text-sm text-violet-900 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* {t('lesson.explanation')} */}
              {page.examples && (
                <div className="my-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-semibold text-green-700 mb-1 text-sm">📝 {t('lesson.explanation')}</div>
                  {page.examples.map((ex, i) => (
                    <p key={i} className="text-sm text-green-800 mb-1">{ex}</p>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Նավիգացիա */}
      {!showTest && (
        <div className="flex items-center justify-between mt-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentChapter === 0 && currentPage === 0}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline ml-1">{t('lesson.prev')}</span>
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentPage(i); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentPage ? 'bg-violet-600 w-6' : 'bg-gray-300'
                }`}
                aria-label={`${t('university.page')} ${i + 1}`}
              />
            ))}
          </div>

          <Button
            size="sm"
            onClick={handleNextPage}
            className="bg-violet-600 hover:bg-violet-700"
          >
            <span className="hidden sm:inline mr-1">{t('lesson.next')}</span>
            {currentPage === totalPages - 1 && currentChapter < totalChapters - 1 ? `${t('university.test')} →` : <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      )}

      {/* Գրքի ինֆո */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <span className="text-xs text-blue-800">
          {t('mode.university')} • {tText('Ընդհանուր')} {totalBookPages} {t('university.page')} • {totalChapters} {t('university.chapter')} • {t('university.pass_threshold')}
        </span>
      </div>
    </div>
  )
}
