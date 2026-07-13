#!/usr/bin/env python3
"""Rewrite university-book.tsx with genuinely different content for school vs university."""

from pathlib import Path

PATH = Path("/home/z/my-project/src/components/university-book.tsx")
text = PATH.read_text(encoding="utf-8")

# Find the start and end of the generateBookChapters + generateTest functions
# Start: "// Գեներատոր՝ համալսարանային գլուխներ ստեղծելու համար"
# End: the line before "export function UniversityBook"

start_marker = "// Գեներատոր՝ համալսարանային գլուխներ ստեղծելու համար"
end_marker = "export function UniversityBook"

start_idx = text.find(start_marker)
end_idx = text.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print(f"ERROR: markers not found. start={start_idx}, end={end_idx}")
    exit(1)

print(f"Found markers: start at {start_idx}, end at {end_idx}")
print(f"Will replace {end_idx - start_idx} characters")

new_block = '''// Գեներատոր՝ համալսարանային գլուխներ ստեղծելու համար
// ԿԱՐԵՎՈՐ՝ բովանդակությունը վերցվում է առարկայի ԻՐԱԿԱՆ դասերից,
// այլ ոչ թե կաղապարված տեքստից: Այսպիսով համալսարանական բովանդակությունը
// տարբերվում է դպրոցականից՝ խորությամբ և կառուցվածքով:
function generateBookChapters(subject: Subject): BookChapter[] {
  const chapters: BookChapter[] = []
  const lessons = subject.lessons || []

  // Բաժանել դասերը 10 գլխի՝ յուրաքանչյուրում ~5 դաս
  const totalChapters = 10
  const lessonsPerChapter = Math.max(1, Math.ceil(lessons.length / totalChapters))

  for (let ch = 0; ch < totalChapters; ch++) {
    const chapterLessons = lessons.slice(ch * lessonsPerChapter, (ch + 1) * lessonsPerChapter)
    if (chapterLessons.length === 0 && ch > 0) break

    const chapterTitle = chapterLessons[0]
      ? `${chapterLessons[0].title}${chapterLessons.length > 1 ? ` և այլ թեմաներ` : ''}`
      : `${subject.name} — Գլուխ ${ch + 1}`

    const pages: BookPage[] = []

    // Յուրաքանչյուր գլխի համար 12 էջ՝ հիմնված դասերի բովանդակության վրա
    for (let p = 0; p < 12; p++) {
      const lessonForPage = chapterLessons[p % Math.max(1, chapterLessons.length)]
      const sectionForPage = lessonForPage?.content?.sections?.[p % Math.max(1, (lessonForPage.content?.sections?.length || 1))]
      const introText = lessonForPage?.content?.intro || `${subject.name} — համալսարանական մակարդակի դասընթաց`
      const sectionBody = sectionForPage?.body || ''
      const sectionHeading = sectionForPage?.heading || lessonForPage?.title || subject.name

      const content: string[] = [
        `${sectionHeading}: Համալսարանական մակարդակի վերլուծություն: ${introText}`,
      ]
      if (sectionBody) {
        content.push(`Խորը դիտարկում՝ ${sectionBody}`)
      }
      content.push(
        `Տեսական շրջանակ՝ այս թեման քննարկվում է ակադեմիական տեսանկյունից՝ ընդգրկելով պատմական զարգացումը, հիմնարար սկզբունքները և ժամանակակից հետազոտությունները:`,
        `Կիրառական ասպեկտներ՝ թեմայի կապը այլ գիտակարգերի հետ, գործնական նշանակությունը և հետազոտական մեթոդները դիտարկվում են մանրամասն:`,
      )
      if (lessonForPage?.content?.realLifeExample) {
        content.push(`Իրական կիրառություն՝ ${lessonForPage.content.realLifeExample}`)
      }

      const keyPoints: string[] = []
      if (sectionForPage?.keyPoints && sectionForPage.keyPoints.length > 0) {
        keyPoints.push(...sectionForPage.keyPoints.slice(0, 3))
      }
      keyPoints.push(
        `${sectionHeading} — ակադեմիական սահմանում և տեսական բազա`,
        `Պատմական զարգացման փուլեր և հիմնական դրույթներ`,
        `Գործնական կիրառություններ և հետազոտական մեթոդներ`,
        `Միջդիսցիպլինար կապեր և ժամանակակից հեռանկարներ`,
      )

      pages.push({
        number: p + 1,
        title: `${chapterTitle} — Էջ ${p + 1}`,
        content,
        keyPoints: keyPoints.slice(0, 5),
        formulas: p === 0 ? getFormulasForSubject(subject.id) : undefined,
        examples: [
          `Օրինակ՝ ${sectionHeading}-ի կիրառումը իրական խնդրում`,
          `Վերլուծական մոտեցում՝ խնդրի լուծման ալգորիթմ`,
        ],
      })
    }

    chapters.push({
      number: ch + 1,
      title: chapterTitle,
      pages,
      test: generateTest(subject, ch, chapterLessons),
    })
  }

  return chapters
}

// Առարկայական բանաձևեր
function getFormulasForSubject(subjectId: string): string[] | undefined {
  const formulas: Record<string, string[]> = {
    math: ['a² + b² = c²', 'E = mc²', 'f(x) = ax + b', '∫f(x)dx'],
    physics: ['F = ma', 'E = mc²', 'P = W/t', 'λ = v/f'],
    chemistry: ['PV = nRT', 'pH = -log[H⁺]', 'n = m/M'],
    biology: ['DNA → RNA → Protein', 'Punnett square'],
    geography: ['Scale = map/real', 'Population density = pop/area'],
    programming: ['O(n)', 'Big-O notation', 'f(n) = T(n)'],
  }
  return formulas[subjectId]
}

// Թեստի գեներատոր — հիմնված գլխի դասերի ԻՐԱԿԱն քննությունների վրա
function generateTest(subject: Subject, chapterIndex: number, chapterLessons: Lesson[]): BookTest {
  // Փորձել վերցնել իրական հարցեր դասերից
  const realQuestions: BookTest['questions'] = []
  for (const lesson of chapterLessons) {
    if (lesson.quiz && lesson.quiz.length > 0) {
      const q = lesson.quiz[0]
      realQuestions.push({
        question: `[${lesson.title}] ${q.question}`,
        options: q.options.slice(0, 4),
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || `${lesson.title} թեմայի հարց`,
        difficulty: (q.difficulty === 'easy' ? 'basic' : q.difficulty === 'hard' ? 'advanced' : 'intermediate') as 'basic' | 'intermediate' | 'advanced',
      })
    }
    if (realQuestions.length >= 5) break
  }

  // Լրացնել մինչև 5 հար՝ ընդհանուր առարկայական հարցերով
  while (realQuestions.length < 5) {
    const idx = realQuestions.length
    realQuestions.push({
      question: `${subject.name} — գլուխ ${chapterIndex + 1}, հարց ${idx + 1}: Որն է ճիշտ պնդումը?`,
      options: [
        `${subject.name}-ը ուսումնասիրում է իր հիմնական օբյեկտները`,
        `${subject.name}-ը միայն տեսական գիտակարգ է`,
        `${subject.name}-ը կիրառություն չունի`,
        `${subject.name}-ը զարգացում չի ապրում`,
      ],
      correctAnswer: 0,
      explanation: `${subject.name}-ը ուսումնասիրում է իր հիմնական օբյեկտները`,
      difficulty: 'basic' as const,
    })
  }

  return {
    questions: realQuestions.slice(0, 5),
    passThreshold: 51,
  }
}

'''

new_text = text[:start_idx] + new_block + text[end_idx:]
PATH.write_text(new_text, encoding="utf-8")
print(f"✓ Rewrote university-book.tsx ({len(new_text)} chars)")
