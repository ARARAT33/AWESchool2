import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ProgressState {
  completedLessons: Record<string, number> // lessonId -> best score (%)
  currentLesson: Record<string, string> // subjectId -> next lesson id
  totalPoints: number
  achievements: string[]
  streak: number
  lastActiveDate: string
  userName: string
  avatar?: string
  favoriteLessons: string[]
  bookmarks: string[]
  hintsUsed: Record<string, number>
  timeSpent: Record<string, number>
  lastVisitedSubject?: string
  totalStudyTime: number
  fontSize: 'small' | 'medium' | 'large'
  theme: 'light' | 'dark' | 'auto'
  userId: string // մշտական օգտատիրոջ ID
  shareCode: string // կարճ կոդ կիսման համար
  createdAt: string // առաջին անգամ գրանցման ամսաթիվ
  dailyGoal: number // օրական նպատակ (դասերի քանակ)
  dailyProgress: number // այսօրվա առաջընթաց
  lastGoalDate: string // վերջին անգամ նպատակը թարմացվել է
  recentlyViewed: string[] // վերջերս դիտված դասեր
  language: string // ընթացիկ լեզու
  learningMode: 'school' | 'university' // ուսումնական ռեժիմ
  setUserName: (name: string) => void
  setAvatar: (avatar: string) => void
  setUserId: (id: string) => void
  setShareCode: (code: string) => void
  setDailyGoal: (goal: number) => void
  addRecentlyViewed: (lessonId: string) => void
  resetDailyProgress: () => void
  setLanguage: (lang: string) => void
  setLearningMode: (mode: 'school' | 'university') => void
  completeLesson: (subjectId: string, lessonId: string, score: number, nextLessonId?: string) => void
  isLessonUnlocked: (subjectId: string, lessonId: string, order: number) => boolean
  getLessonScore: (lessonId: string) => number | null
  getSubjectProgress: (subjectId: string, totalLessons: number) => number
  addAchievement: (achievement: string) => void
  resetProgress: () => void
  toggleFavorite: (lessonId: string) => void
  isFavorite: (lessonId: string) => boolean
  toggleBookmark: (lessonId: string) => void
  isBookmarked: (lessonId: string) => boolean
  useHint: (lessonId: string) => void
  getHintsUsed: (lessonId: string) => number
  addStudyTime: (lessonId: string, minutes: number) => void
  setLastVisitedSubject: (subjectId: string) => void
  setFontSize: (size: 'small' | 'medium' | 'large') => void
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  exportData: () => string
  importData: (data: string) => boolean
}

export const ACHIEVEMENTS = {
  FIRST_LESSON: 'Առաջին դասը ավարտված 🌟',
  FIVE_LESSONS: '5 դաս ավարտված ⭐',
  TEN_LESSONS: '10 դաս ավարտված 🏆',
  PERFECT_SCORE: 'Կատարյալ արդյունք (100%) 💯',
  FIFTY_LESSONS: '50 դաս ավարտված 🎓',
  HUNDRED_LESSONS: '100 դաս ավարտված 👑',
  STREAK_7: '7 օր անընդմեջ 🔥',
  STREAK_30: '30 օր անընդմեջ 💎',
  EXPLORER: 'Բոլոր ոլորտներն ուսումնասիրված 🗺️',
  NO_HINTS: '10 դաս առանց հուշումի 🧠',
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      currentLesson: {},
      totalPoints: 0,
      achievements: [],
      streak: 0,
      lastActiveDate: '',
      userName: '',
      avatar: '',
      favoriteLessons: [],
      bookmarks: [],
      hintsUsed: {},
      timeSpent: {},
      lastVisitedSubject: undefined,
      totalStudyTime: 0,
      fontSize: 'medium',
      theme: 'auto',
      userId: '',
      shareCode: '',
      createdAt: '',
      dailyGoal: 3,
      dailyProgress: 0,
      lastGoalDate: '',
      recentlyViewed: [],
      language: 'en', // Default language is English
      learningMode: 'school',

      setUserName: (name) => set({ userName: name }),
      setAvatar: (avatar) => set({ avatar }),
      setUserId: (id) => set({ userId: id }),
      setShareCode: (code) => set({ shareCode: code }),
      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      addRecentlyViewed: (lessonId) => set((state) => ({
        recentlyViewed: [lessonId, ...state.recentlyViewed.filter(id => id !== lessonId)].slice(0, 10),
      })),
      resetDailyProgress: () => {
        const today = new Date().toDateString()
        const state = useProgressStore.getState()
        if (state.lastGoalDate !== today) {
          set({ dailyProgress: 0, lastGoalDate: today })
        }
      },
      setLanguage: (lang) => set({ language: lang }),
      setLearningMode: (mode) => set({ learningMode: mode }),

      completeLesson: (subjectId, lessonId, score, nextLessonId) => {
        const state = get()
        const previousScore = state.completedLessons[lessonId] || 0
        const newScore = Math.max(previousScore, score)
        const pointsEarned = Math.max(0, score - previousScore)

        const newAchievements = [...state.achievements]
        const completedCount = Object.keys({
          ...state.completedLessons,
          [lessonId]: newScore,
        }).length

        if (completedCount >= 1 && !newAchievements.includes(ACHIEVEMENTS.FIRST_LESSON)) {
          newAchievements.push(ACHIEVEMENTS.FIRST_LESSON)
        }
        if (completedCount >= 5 && !newAchievements.includes(ACHIEVEMENTS.FIVE_LESSONS)) {
          newAchievements.push(ACHIEVEMENTS.FIVE_LESSONS)
        }
        if (completedCount >= 10 && !newAchievements.includes(ACHIEVEMENTS.TEN_LESSONS)) {
          newAchievements.push(ACHIEVEMENTS.TEN_LESSONS)
        }
        if (completedCount >= 50 && !newAchievements.includes(ACHIEVEMENTS.FIFTY_LESSONS)) {
          newAchievements.push(ACHIEVEMENTS.FIFTY_LESSONS)
        }
        if (completedCount >= 100 && !newAchievements.includes(ACHIEVEMENTS.HUNDRED_LESSONS)) {
          newAchievements.push(ACHIEVEMENTS.HUNDRED_LESSONS)
        }
        if (score === 100 && !newAchievements.includes(ACHIEVEMENTS.PERFECT_SCORE)) {
          newAchievements.push(ACHIEVEMENTS.PERFECT_SCORE)
        }

        const today = new Date().toDateString()
        const yesterday = new Date(Date.now() - 86400000).toDateString()
        let newStreak = state.streak
        if (state.lastActiveDate === today) {
          // Արդեն այսօր ակտիվ է եղել
        } else if (state.lastActiveDate === yesterday) {
          newStreak = state.streak + 1
        } else {
          newStreak = 1
        }

        if (newStreak >= 7 && !newAchievements.includes(ACHIEVEMENTS.STREAK_7)) {
          newAchievements.push(ACHIEVEMENTS.STREAK_7)
        }
        if (newStreak >= 30 && !newAchievements.includes(ACHIEVEMENTS.STREAK_30)) {
          newAchievements.push(ACHIEVEMENTS.STREAK_30)
        }

        // Ստուգել առանց հուշումի անցած դասերը
        const noHintLessons = Object.keys(state.completedLessons).filter(
          id => (state.hintsUsed[id] || 0) === 0
        ).length
        if (noHintLessons >= 10 && !newAchievements.includes(ACHIEVEMENTS.NO_HINTS)) {
          newAchievements.push(ACHIEVEMENTS.NO_HINTS)
        }

        // Թարմացնել օրական առաջընթացը
        const today2 = new Date().toDateString()
        const newDailyProgress = state.lastGoalDate === today2
          ? state.dailyProgress + 1
          : 1

        set({
          completedLessons: { ...state.completedLessons, [lessonId]: newScore },
          currentLesson: nextLessonId
            ? { ...state.currentLesson, [subjectId]: nextLessonId }
            : state.currentLesson,
          totalPoints: state.totalPoints + pointsEarned,
          achievements: newAchievements,
          streak: newStreak,
          lastActiveDate: today,
          dailyProgress: newDailyProgress,
          lastGoalDate: today2,
          recentlyViewed: [lessonId, ...state.recentlyViewed.filter(id => id !== lessonId)].slice(0, 10),
        })
      },

      isLessonUnlocked: (subjectId, lessonId, order) => {
        const state = get()
        if (order === 1) return true
        const previousLessonId = `${subjectId}-${order - 1}`
        return state.completedLessons[previousLessonId] !== undefined &&
               state.completedLessons[previousLessonId] >= 60
      },

      getLessonScore: (lessonId) => {
        const state = get()
        return state.completedLessons[lessonId] ?? null
      },

      getSubjectProgress: (subjectId, totalLessons) => {
        const state = get()
        const completed = Object.keys(state.completedLessons).filter(
          (id) => id.startsWith(`${subjectId}-`) && state.completedLessons[id] >= 60
        ).length
        return Math.round((completed / totalLessons) * 100)
      },

      addAchievement: (achievement) => {
        const state = get()
        if (!state.achievements.includes(achievement)) {
          set({ achievements: [...state.achievements, achievement] })
        }
      },

      toggleFavorite: (lessonId) => {
        const state = get()
        const favorites = state.favoriteLessons.includes(lessonId)
          ? state.favoriteLessons.filter(id => id !== lessonId)
          : [...state.favoriteLessons, lessonId]
        set({ favoriteLessons: favorites })
      },

      isFavorite: (lessonId) => {
        const state = get()
        return state.favoriteLessons.includes(lessonId)
      },

      toggleBookmark: (lessonId) => {
        const state = get()
        const bookmarks = state.bookmarks.includes(lessonId)
          ? state.bookmarks.filter(id => id !== lessonId)
          : [...state.bookmarks, lessonId]
        set({ bookmarks })
      },

      isBookmarked: (lessonId) => {
        const state = get()
        return state.bookmarks.includes(lessonId)
      },

      useHint: (lessonId) => {
        const state = get()
        set({
          hintsUsed: {
            ...state.hintsUsed,
            [lessonId]: (state.hintsUsed[lessonId] || 0) + 1,
          },
        })
      },

      getHintsUsed: (lessonId) => {
        const state = get()
        return state.hintsUsed[lessonId] || 0
      },

      addStudyTime: (lessonId, minutes) => {
        const state = get()
        set({
          timeSpent: {
            ...state.timeSpent,
            [lessonId]: (state.timeSpent[lessonId] || 0) + minutes,
          },
          totalStudyTime: state.totalStudyTime + minutes,
        })
      },

      setLastVisitedSubject: (subjectId) => set({ lastVisitedSubject: subjectId }),

      setFontSize: (size) => set({ fontSize: size }),

      setTheme: (theme) => set({ theme }),

      exportData: () => {
        const state = get()
        const data = {
          userId: state.userId,
          shareCode: state.shareCode,
          createdAt: state.createdAt,
          completedLessons: state.completedLessons,
          currentLesson: state.currentLesson,
          totalPoints: state.totalPoints,
          achievements: state.achievements,
          streak: state.streak,
          lastActiveDate: state.lastActiveDate,
          userName: state.userName,
          avatar: state.avatar,
          favoriteLessons: state.favoriteLessons,
          bookmarks: state.bookmarks,
          hintsUsed: state.hintsUsed,
          timeSpent: state.timeSpent,
          totalStudyTime: state.totalStudyTime,
          fontSize: state.fontSize,
          theme: state.theme,
          dailyGoal: state.dailyGoal,
          dailyProgress: state.dailyProgress,
          lastGoalDate: state.lastGoalDate,
          recentlyViewed: state.recentlyViewed,
          language: state.language,
          learningMode: state.learningMode,
          exportedAt: new Date().toISOString(),
          version: '4.0',
        }
        return JSON.stringify(data, null, 2)
      },

      importData: (dataString) => {
        try {
          const data = JSON.parse(dataString)
          set({
            userId: data.userId || '',
            shareCode: data.shareCode || '',
            createdAt: data.createdAt || new Date().toISOString(),
            completedLessons: data.completedLessons || {},
            currentLesson: data.currentLesson || {},
            totalPoints: data.totalPoints || 0,
            achievements: data.achievements || [],
            streak: data.streak || 0,
            lastActiveDate: data.lastActiveDate || '',
            userName: data.userName || '',
            avatar: data.avatar || '',
            favoriteLessons: data.favoriteLessons || [],
            bookmarks: data.bookmarks || [],
            hintsUsed: data.hintsUsed || {},
            timeSpent: data.timeSpent || {},
            totalStudyTime: data.totalStudyTime || 0,
            fontSize: data.fontSize || 'medium',
            theme: data.theme || 'auto',
            dailyGoal: data.dailyGoal || 3,
            dailyProgress: data.dailyProgress || 0,
            lastGoalDate: data.lastGoalDate || '',
            recentlyViewed: data.recentlyViewed || [],
            language: data.language || 'en', // Default to English if not specified
            learningMode: data.learningMode || 'school',
          })
          return true
        } catch (e) {
          console.error('Տվյալների ներմուծման սխալ:', e)
          return false
        }
      },

      resetProgress: () => set({
        completedLessons: {},
        currentLesson: {},
        totalPoints: 0,
        achievements: [],
        streak: 0,
        lastActiveDate: '',
        favoriteLessons: [],
        bookmarks: [],
        hintsUsed: {},
        timeSpent: {},
        totalStudyTime: 0,
        lastVisitedSubject: undefined,
        fontSize: 'medium',
        theme: 'auto',
        userId: '',
        shareCode: '',
        createdAt: '',
        dailyGoal: 3,
        dailyProgress: 0,
        lastGoalDate: '',
        recentlyViewed: [],
        language: 'en', // Default to English
        learningMode: 'school',
      }),
    }),
    {
      name: 'edu-game-progress-v3',
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...(persistedState as object),
        // Ensure new fields have defaults
        language: (persistedState as any)?.language || 'en', // Default to English if not specified
        learningMode: (persistedState as any)?.learningMode || 'school',
      }),
      storage: createJSONStorage(() => {
        // Ստանդարտ localStorage բոլոր բրաուզերների համար
        if (typeof window !== 'undefined') {
          return window.localStorage
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      }),
      // Միայն անհրաժեշտ դաշտերը պահպանել
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        currentLesson: state.currentLesson,
        totalPoints: state.totalPoints,
        achievements: state.achievements,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate,
        userName: state.userName,
        avatar: state.avatar,
        favoriteLessons: state.favoriteLessons,
        bookmarks: state.bookmarks,
        hintsUsed: state.hintsUsed,
        timeSpent: state.timeSpent,
        lastVisitedSubject: state.lastVisitedSubject,
        totalStudyTime: state.totalStudyTime,
        fontSize: state.fontSize,
        theme: state.theme,
        userId: state.userId,
        shareCode: state.shareCode,
        createdAt: state.createdAt,
        dailyGoal: state.dailyGoal,
        dailyProgress: state.dailyProgress,
        lastGoalDate: state.lastGoalDate,
        recentlyViewed: state.recentlyViewed,
        language: state.language,
        learningMode: state.learningMode,
      }),
    }
  )
)
