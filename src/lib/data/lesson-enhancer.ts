import { Lesson, QuizQuestion } from '../types'

// Ավտոմատ կերպով ավելացնում է հուշումներ հարցերին, եթե դրանք չկան
export function enhanceQuizQuestions(quiz: QuizQuestion[]): QuizQuestion[] {
  return quiz.map((q) => {
    if (q.hint) return q

    // Ավտոմատ հուշումների գեներացում՝ հիմնված հարցի վրա
    let hint = ''

    // Եթե հարցը պարունակում է թվեր՝ տալիս ենք մաթեմատիկական հուշում
    if (/\d/.test(q.question)) {
      hint = 'Կենտրոնացրու թվերի վրա և հիշիր կանոնը:'
    }
    // Եթե հարցը պարունակում է «Ո՞ր» կամ «ի՞նչ»
    else if (q.question.includes('Ո՞ր') || q.question.includes('ո՞ր')) {
      hint = 'Մտածիր, թե որն է ամենատրամաբանական պատասխանը:'
    }
    else if (q.question.includes('ի՞նչ') || q.question.includes('Ի՞նչ')) {
      hint = 'Հիշիր դասի հիմնական սահմանումը:'
    }
    // Եթե հարցը պարունակում է «ի՞նչու»
    else if (q.question.includes('ի՞նչու') || q.question.includes('Ի՞նչու')) {
      hint = 'Մտածիր պատճառահետևանքային կապը:'
    }
    else {
      hint = 'Կարդա հարցը ուշադրությամբ և բացառիր սխալ տարբերակները:'
    }

    // Բացառել սխալ տարբերակներից մեկը (հուշում, թե որը չէ)
    const wrongOptions = q.options
      .map((_, i) => i)
      .filter((i) => i !== q.correctAnswer)

    let extraHint = ''
    if (wrongOptions.length > 0) {
      const randomWrong = wrongOptions[0]
      extraHint = ` Հուշում՝ «${q.options[randomWrong].substring(0, 20)}${q.options[randomWrong].length > 20 ? '...' : ''}» տարբերակը սխալ է:`
    }

    return {
      ...q,
      hint: hint + extraHint,
      difficulty: q.difficulty || (Math.random() > 0.6 ? 'medium' : 'easy'),
    }
  })
}

// Ավտոմատ կերպով ավելացնում է օգտակար հղումներ
export function enhanceUsefulLinks(lesson: Lesson, subjectCategory: string): Lesson {
  const categoryLinks: Record<string, { title: string; url: string; description: string }[]> = {
    core: [
      { title: 'Khan Academy Հայերեն', url: 'https://hy.khanacademy.org', description: 'Անվճար դասեր մաթեմատիկայից և գիտությունից' },
      { title: 'Wikipedia Հայերեն', url: 'https://hy.wikipedia.org', description: 'Հանրագիտարանային տեղեկատվություն' },
    ],
    computer: [
      { title: 'W3Schools', url: 'https://www.w3schools.com', description: 'Վեբ ծրագրավորման ձեռնարկներ' },
      { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org', description: 'Անվճար ծրագրավորման դասընթացներ' },
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', description: 'Վեբ տեխնոլոգիաների փաստաթղթեր' },
      { title: 'Codecademy', url: 'https://www.codecademy.com', description: 'Ինտերակտիվ ծրագրավորման դասեր' },
    ],
    science: [
      { title: 'National Geographic Kids', url: 'https://kids.nationalgeographic.com', description: 'Գիտություն երեխաների համար' },
      { title: 'NASA Space Place', url: 'https://spaceplace.nasa.gov', description: 'Տիեզերքի մասին երեխաների համար' },
    ],
    language: [
      { title: 'Duolingo', url: 'https://www.duolingo.com', description: 'Լեզուների ուսուցում խաղի միջոցով' },
      { title: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish', description: 'Անգլերենի դասեր' },
    ],
  }

  const existingLinks = lesson.usefulLinks || []
  const additionalLinks = categoryLinks[subjectCategory] || []

  // Միացնել, ապա հեռացնել կրկնօրինակները
  const allLinks = [...existingLinks, ...additionalLinks]
  const uniqueLinks = allLinks.filter(
    (link, index, self) => index === self.findIndex((l) => l.url === link.url)
  )

  return {
    ...lesson,
    usefulLinks: uniqueLinks,
    quiz: enhanceQuizQuestions(lesson.quiz),
  }
}

// Ավտոմատ կերպով ավելացնում է տեսանյութերի հղումներ
export function enhanceVideos(lesson: Lesson): Lesson {
  if (lesson.videos && lesson.videos.length > 0) return lesson

  // Ստեղծել YouTube որոնման հղում ըստ դասի վերնագրի
  const searchQuery = encodeURIComponent(`${lesson.title} tutorial հայերեն`)
  const searchQueryEn = encodeURIComponent(`${lesson.title} tutorial explained`)

  return {
    ...lesson,
    videos: [
      {
        title: `${lesson.title} - տեսանյութ (հայերեն)`,
        url: `https://www.youtube.com/results?search_query=${searchQuery}`,
        platform: 'youtube' as const,
        duration: '5-10 րոպե',
      },
      {
        title: `${lesson.title} - բացատրություն (անգլերեն)`,
        url: `https://www.youtube.com/results?search_query=${searchQueryEn}`,
        platform: 'youtube' as const,
        duration: '5-15 րոպե',
      },
    ],
  }
}

// Ամբողջական բարելավում՝ հուշումներ + հղումներ + տեսանյութեր
export function enhanceLesson(lesson: Lesson, subjectCategory: string): Lesson {
  let enhanced = enhanceUsefulLinks(lesson, subjectCategory)
  enhanced = enhanceVideos(enhanced)
  return enhanced
}
