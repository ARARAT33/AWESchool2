/**
 * Համապարփակ թարգմանչական համակարգ
 * Թարգմանում է ամբողջ բովանդակությունը ըստ ընտրված լեզվի
 * Օգտագործում է նախապես թարգմանված բառարան + Google Translate API ֆոլբեք
 */

import { Lesson, Subject, QuizQuestion, LessonContent, LessonSection } from './types'

// Նախապես թարգմանված բառարան (հիմնական բառեր)
const DICTIONARY: Record<string, Record<string, string>> = {
  // Մաթեմատիկա
  'թվեր': { en: 'numbers', ru: 'числа', es: 'números', fr: 'nombres', de: 'Zahlen', zh: '数字', ja: '数', ko: '숫자', ar: 'أرقام', tr: 'sayılar', fa: 'اعداد', hi: 'संख्याएं', it: 'numeri', pt: 'números' },
  'գումարում': { en: 'addition', ru: 'сложение', es: 'suma', fr: 'addition', de: 'Addition', zh: '加法', ja: '足し算', ko: '덧셈', ar: 'الجمع', tr: 'toplama', fa: 'جمع', hi: 'जोड़', it: 'addizione', pt: 'adição' },
  'հանում': { en: 'subtraction', ru: 'вычитание', es: 'resta', fr: 'soustraction', de: 'Subtraktion', zh: '减法', ja: '引き算', ko: '뺄셈', ar: 'الطرح', tr: 'çıkarma', fa: 'تفریق', hi: 'घटाव', it: 'sottrazione', pt: 'subtração' },
  'բազմապատկում': { en: 'multiplication', ru: 'умножение', es: 'multiplicación', fr: 'multiplication', de: 'Multiplikation', zh: '乘法', ja: '掛け算', ko: '곱셈', ar: 'الضرب', tr: 'çarpma', fa: 'ضرب', hi: 'गुणन', it: 'moltiplicazione', pt: 'multiplicação' },
  'բաժանում': { en: 'division', ru: 'деление', es: 'división', fr: 'division', de: 'Division', zh: '除法', ja: '割り算', ko: '나눗셈', ar: 'القسمة', tr: 'bölme', fa: 'تقسیم', hi: 'विभाजन', it: 'divisione', pt: 'divisão' },
  'կոտորակ': { en: 'fraction', ru: 'дробь', es: 'fracción', fr: 'fraction', de: 'Bruch', zh: '分数', ja: '分数', ko: '분수', ar: 'كسر', tr: 'kesir', fa: 'کسر', hi: 'भिन्न', it: 'frazione', pt: 'fração' },
  'տոկոս': { en: 'percent', ru: 'процент', es: 'porcentaje', fr: 'pourcentage', de: 'Prozent', zh: '百分比', ja: 'パーセント', ko: '퍼센트', ar: 'نسبة مئوية', tr: 'yüzde', fa: 'درصد', hi: 'प्रतिशत', it: 'percentuale', pt: 'porcentagem' },
  'երկրաչափություն': { en: 'geometry', ru: 'геометрия', es: 'geometría', fr: 'géométrie', de: 'Geometrie', zh: '几何', ja: '幾何学', ko: '기하학', ar: 'الهندسة', tr: 'geometri', fa: 'هندسه', hi: 'ज्यामिति', it: 'geometria', pt: 'geometria' },
  // Գիտություն
  'ֆիզիկա': { en: 'physics', ru: 'физика', es: 'física', fr: 'physique', de: 'Physik', zh: '物理', ja: '物理', ko: '물리학', ar: 'الفيزياء', tr: 'fizik', fa: 'فیزیک', hi: 'भौतिकी', it: 'fisica', pt: 'física' },
  'քիմիա': { en: 'chemistry', ru: 'химия', es: 'química', fr: 'chimie', de: 'Chemie', zh: '化学', ja: '化学', ko: '화학', ar: 'الكيمياء', tr: 'kimya', fa: 'شیمی', hi: 'रसायन', it: 'chimica', pt: 'química' },
  'կենսաբանություն': { en: 'biology', ru: 'биология', es: 'biología', fr: 'biologie', de: 'Biologie', zh: '生物', ja: '生物', ko: '생물학', ar: 'الأحياء', tr: 'biyoloji', fa: 'زیست‌شناسی', hi: 'जीवविज्ञान', it: 'biologia', pt: 'biologia' },
  // Տեխնոլոգիա
  'ծրագրավորում': { en: 'programming', ru: 'программирование', es: 'programación', fr: 'programmation', de: 'Programmierung', zh: '编程', ja: 'プログラミング', ko: '프로그래밍', ar: 'البرمجة', tr: 'programlama', fa: 'برنامه‌نویسی', hi: 'प्रोग्रामिंग', it: 'programmazione', pt: 'programação' },
  'համակարգիչ': { en: 'computer', ru: 'компьютер', es: 'computadora', fr: 'ordinateur', de: 'Computer', zh: '计算机', ja: 'コンピュータ', ko: '컴퓨터', ar: 'الحاسوب', tr: 'bilgisayar', fa: 'رایانه', hi: 'कंप्यूटर', it: 'computer', pt: 'computador' },
  'ալգորիթմ': { en: 'algorithm', ru: 'алгоритм', es: 'algoritmo', fr: 'algorithme', de: 'Algorithmus', zh: '算法', ja: 'アルゴリズム', ko: '알고리즘', ar: 'خوارزمية', tr: 'algoritma', fa: 'الگوریتم', hi: 'एल्गोरिदम', it: 'algoritmo', pt: 'algoritmo' },
  // Ընդհանուր
  'դաս': { en: 'lesson', ru: 'урок', es: 'lección', fr: 'leçon', de: 'Lektion', zh: '课', ja: 'レッスン', ko: '수업', ar: 'درس', tr: 'ders', fa: 'درس', hi: 'पाठ', it: 'lezione', pt: 'lição' },
  'քննություն': { en: 'exam', ru: 'экзамен', es: 'examen', fr: 'examen', de: 'Prüfung', zh: '考试', ja: '試験', ko: '시험', ar: 'امتحان', tr: 'sınav', fa: 'امتحان', hi: 'परीक्षा', it: 'esame', pt: 'exame' },
  'հարց': { en: 'question', ru: 'вопрос', es: 'pregunta', fr: 'question', de: 'Frage', zh: '问题', ja: '質問', ko: '질문', ar: 'سؤال', tr: 'soru', fa: 'سؤال', hi: 'प्रश्न', it: 'domanda', pt: 'pergunta' },
  'պատասխան': { en: 'answer', ru: 'ответ', es: 'respuesta', fr: 'réponse', de: 'Antwort', zh: '回答', ja: '回答', ko: '답변', ar: 'إجابة', tr: 'cevap', fa: 'پاسخ', hi: 'उत्तर', it: 'risposta', pt: 'resposta' },
  'ճիշտ': { en: 'correct', ru: 'правильно', es: 'correcto', fr: 'correct', de: 'richtig', zh: '正确', ja: '正しい', ko: '맞음', ar: 'صحيح', tr: 'doğru', fa: 'صحیح', hi: 'सही', it: 'corretto', pt: 'correto' },
  'սխալ': { en: 'wrong', ru: 'неправильно', es: 'incorrecto', fr: 'faux', de: 'falsch', zh: '错误', ja: '間違い', ko: '틀림', ar: 'خطأ', tr: 'yanlış', fa: 'غلط', hi: 'गलत', it: 'sbagliato', pt: 'errado' },
  'հուշում': { en: 'hint', ru: 'подсказка', es: 'pista', fr: 'indice', de: 'Hinweis', zh: '提示', ja: 'ヒント', ko: '힌트', ar: 'تلميح', tr: 'ipucu', fa: 'راهنمایی', hi: 'संकेत', it: 'suggerimento', pt: 'dica' },
  'բացատրություն': { en: 'explanation', ru: 'объяснение', es: 'explicación', fr: 'explication', de: 'Erklärung', zh: '解释', ja: '説明', ko: '설명', ar: 'شرح', tr: 'açıklama', fa: 'توضیح', hi: 'व्याख्या', it: 'spiegazione', pt: 'explicação' },
  'ներածություն': { en: 'introduction', ru: 'введение', es: 'introducción', fr: 'introduction', de: 'Einführung', zh: '介绍', ja: 'はじめに', ko: '소개', ar: 'مقدمة', tr: 'giriş', fa: 'مقدمه', hi: 'परिचय', it: 'introduzione', pt: 'introdução' },
  'ամփոփում': { en: 'summary', ru: 'резюме', es: 'resumen', fr: 'résumé', de: 'Zusammenfassung', zh: '总结', ja: 'まとめ', ko: '요약', ar: 'ملخص', tr: 'özet', fa: 'خلاصه', hi: 'सारांश', it: 'riepilogo', pt: 'resumo' },
  'օրինակ': { en: 'example', ru: 'пример', es: 'ejemplo', fr: 'exemple', de: 'Beispiel', zh: '例子', ja: '例', ko: '예시', ar: 'مثال', tr: 'örnek', fa: 'مثال', hi: 'उदाहरण', it: 'esempio', pt: 'exemplo' },
}

// Արագ թարգմանություն բառարանի միջոցով
function quickTranslate(text: string, lang: string): string {
  if (lang === 'hy') return text

  let result = text
  // Փոխարինել բառարանի բառերը
  for (const [hy, translations] of Object.entries(DICTIONARY)) {
    const translated = translations[lang]
    if (translated) {
      // Մեծատառ սկզբում
      const hyCap = hy.charAt(0).toUpperCase() + hy.slice(1)
      const trCap = translated.charAt(0).toUpperCase() + translated.slice(1)
      result = result.replace(new RegExp(hyCap, 'g'), trCap)
      result = result.replace(new RegExp(hy, 'g'), translated)
    }
  }
  return result
}

// Google Translate API-ով թարգմանություն (անվճար, սակայն որոշ սահմանափակումներով)
export async function googleTranslateText(text: string, targetLang: string): Promise<string> {
  if (targetLang === 'hy' || !text) return text

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=hy&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    const response = await fetch(url)
    const data = await response.json()
    
    // Google Translate API-ի պատասխանի ձևաչափ
    if (data && data[0]) {
      return data[0].map((item: any[]) => item[0]).join('')
    }
  } catch (error) {
    console.warn('Google Translate error:', error)
  }
  
  // Ֆոլբեք՝ բառարանի թարգմանություն
  return quickTranslate(text, targetLang)
}

// Սինխրոն թարգմանություն (բառարանով, անմիջապես)
export function translateTextSync(text: string, lang: string): string {
  if (lang === 'hy' || !text) return text
  return quickTranslate(text, lang)
}

// Թարգմանել դասի բովանդակությունը (սինխրոն)
export function translateLesson(lesson: Lesson, lang: string): Lesson {
  if (lang === 'hy') return lesson

  return {
    ...lesson,
    title: translateTextSync(lesson.title, lang),
    subtitle: lesson.subtitle ? translateTextSync(lesson.subtitle, lang) : undefined,
    content: translateLessonContent(lesson.content, lang),
    quiz: lesson.quiz.map(q => translateQuizQuestion(q, lang)),
    usefulLinks: lesson.usefulLinks,
    videos: lesson.videos,
  }
}

function translateLessonContent(content: LessonContent, lang: string): LessonContent {
  return {
    intro: translateTextSync(content.intro, lang),
    sections: content.sections.map(s => translateLessonSection(s, lang)),
    funFact: content.funFact ? translateTextSync(content.funFact, lang) : undefined,
    didYouKnow: content.didYouKnow ? translateTextSync(content.didYouKnow, lang) : undefined,
    realLifeExample: content.realLifeExample ? translateTextSync(content.realLifeExample, lang) : undefined,
    exercises: content.exercises?.map(e => translateTextSync(e, lang)),
    summary: translateTextSync(content.summary, lang),
    keyTerms: content.keyTerms?.map(t => ({
      term: translateTextSync(t.term, lang),
      definition: translateTextSync(t.definition, lang),
    })),
  }
}

function translateLessonSection(section: LessonSection, lang: string): LessonSection {
  return {
    heading: translateTextSync(section.heading, lang),
    body: translateTextSync(section.body, lang),
    visual: section.visual ? {
      ...section.visual,
      description: translateTextSync(section.visual.description, lang),
    } : undefined,
    example: section.example ? translateTextSync(section.example, lang) : undefined,
    codeBlock: section.codeBlock,
    keyPoints: section.keyPoints?.map(p => translateTextSync(p, lang)),
  }
}

function translateQuizQuestion(q: QuizQuestion, lang: string): QuizQuestion {
  return {
    question: translateTextSync(q.question, lang),
    options: q.options.map(o => translateTextSync(o, lang)),
    correctAnswer: q.correctAnswer,
    explanation: q.explanation ? translateTextSync(q.explanation, lang) : undefined,
    hint: q.hint ? translateTextSync(q.hint, lang) : undefined,
    difficulty: q.difficulty,
  }
}

// Թարգմանել առարկան
export function translateSubject(subject: Subject, lang: string): Subject {
  if (lang === 'hy') return subject

  return {
    ...subject,
    name: translateTextSync(subject.name, lang),
    description: translateTextSync(subject.description, lang),
    lessons: subject.lessons.map(l => translateLesson(l, lang)),
  }
}

// Ասինխրոն թարգմանություն Google API-ով (ավելի որակով, բայց դանդաղ)
export async function translateLessonAsync(lesson: Lesson, lang: string): Promise<Lesson> {
  if (lang === 'hy') return lesson

  const translatedTitle = await googleTranslateText(lesson.title, lang)
  const translatedSubtitle = lesson.subtitle ? await googleTranslateText(lesson.subtitle, lang) : undefined
  const translatedIntro = await googleTranslateText(lesson.content.intro, lang)
  
  const translatedSections = await Promise.all(
    lesson.content.sections.map(async s => ({
      heading: await googleTranslateText(s.heading, lang),
      body: await googleTranslateText(s.body, lang),
      visual: s.visual ? { ...s.visual, description: await googleTranslateText(s.visual.description, lang) } : undefined,
      example: s.example ? await googleTranslateText(s.example, lang) : undefined,
      keyPoints: s.keyPoints ? await Promise.all(s.keyPoints.map(p => googleTranslateText(p, lang))) : undefined,
      codeBlock: s.codeBlock,
    }))
  )

  const translatedQuiz = await Promise.all(
    lesson.quiz.map(async q => ({
      question: await googleTranslateText(q.question, lang),
      options: await Promise.all(q.options.map(o => googleTranslateText(o, lang))),
      correctAnswer: q.correctAnswer,
      explanation: q.explanation ? await googleTranslateText(q.explanation, lang) : undefined,
      hint: q.hint ? await googleTranslateText(q.hint, lang) : undefined,
      difficulty: q.difficulty,
    }))
  )

  return {
    ...lesson,
    title: translatedTitle,
    subtitle: translatedSubtitle,
    content: {
      intro: translatedIntro,
      sections: translatedSections,
      funFact: lesson.content.funFact ? await googleTranslateText(lesson.content.funFact, lang) : undefined,
      didYouKnow: lesson.content.didYouKnow ? await googleTranslateText(lesson.content.didYouKnow, lang) : undefined,
      realLifeExample: lesson.content.realLifeExample ? await googleTranslateText(lesson.content.realLifeExample, lang) : undefined,
      exercises: lesson.content.exercises ? await Promise.all(lesson.content.exercises.map(e => googleTranslateText(e, lang))) : undefined,
      summary: await googleTranslateText(lesson.content.summary, lang),
      keyTerms: lesson.content.keyTerms ? await Promise.all(lesson.content.keyTerms.map(async t => ({
        term: await googleTranslateText(t.term, lang),
        definition: await googleTranslateText(t.definition, lang),
      }))) : undefined,
    },
    quiz: translatedQuiz,
    usefulLinks: lesson.usefulLinks,
    videos: lesson.videos,
  }
}
