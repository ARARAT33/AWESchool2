// Կրթական խաղի տիպեր

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number // ինդեքս options զանգվածում
  explanation?: string
  hint?: string // թեթև հուշում աշակերտի համար
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface Lesson {
  id: string
  order: number
  title: string
  subtitle?: string
  duration: number // րոպեներով
  icon: string // emoji
  content: LessonContent
  quiz: QuizQuestion[]
  usefulLinks?: { title: string; url: string; description?: string }[]
  videos?: { title: string; url: string; platform: 'youtube' | 'vimeo' | 'other'; duration?: string }[]
  tags?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
}

export interface LessonContent {
  intro: string // ներածություն
  sections: LessonSection[]
  funFact?: string // հետաքրքիր փաստ
  didYouKnow?: string // գիտեի՞ր որ
  realLifeExample?: string // իրական կյանքի օրինակ
  exercises?: string[] // գործնական վարժություններ
  summary: string // ամփոփում
  keyTerms?: { term: string; definition: string }[] // հիմնական տերմիններ
}

export interface LessonSection {
  heading: string
  body: string
  visual?: VisualContent
  example?: string
  codeBlock?: string // կոդի հատված ծրագրավորման դասերի համար
  keyPoints?: string[] // հիմնական կետեր
}

export interface VisualContent {
  type: 'diagram' | 'illustration' | 'formula' | 'table' | 'animation' | 'infographic'
  emoji?: string
  description: string
  data?: string // SVG կամ հավելյալ տվյալներ
  color?: string
}

export interface Subject {
  id: string
  name: string
  description: string
  icon: string
  color: string // tailwind gradient class
  category: 'core' | 'computer' | 'science' | 'language' | 'art' | 'advanced' | 'business'
  lessons: Lesson[]
  tags?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'mixed'
}

export interface ProgressState {
  completedLessons: Record<string, number> // lessonId -> best score (%)
  currentLesson: Record<string, string> // subjectId -> next lesson id
  totalPoints: number
  achievements: string[]
  streak: number
  lastActiveDate: string
  userName: string
  avatar?: string
  favoriteLessons: string[] // նախընտրած դասեր
  bookmarks: string[] // էջանիշեր
  hintsUsed: Record<string, number> // lessonId -> քանի հուշում է օգտագործել
  timeSpent: Record<string, number> // lessonId -> րոպեներ
}
